import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [totalStudents, activeStudents, completedStudents, totalCourses, monthPayments, certificates, enquiries] =
      await Promise.all([
        prisma.student.count(),
        prisma.student.count({ where: { status: 'ACTIVE' } }),
        prisma.student.count({ where: { status: 'COMPLETED' } }),
        prisma.course.count({ where: { isActive: true } }),
        prisma.payment.findMany({ where: { date: { gte: startOfMonth } } }),
        prisma.certificate.count({ where: { isIssued: true } }),
        prisma.enquiry.count({ where: { isRead: false } }),
      ])

    const feesThisMonth = monthPayments.reduce((sum, p) => sum + p.amount, 0)

    return NextResponse.json({
      totalStudents,
      activeStudents,
      completedStudents,
      totalCourses,
      feesThisMonth,
      certificates,
      unreadEnquiries: enquiries,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
