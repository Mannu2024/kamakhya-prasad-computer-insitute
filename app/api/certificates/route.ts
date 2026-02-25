import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      include: { student: { include: { course: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ certificates })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, certificateNumber, issueDate, isIssued } = body

    const certificate = await prisma.certificate.upsert({
      where: { studentId },
      update: { certificateNumber, issueDate: issueDate ? new Date(issueDate) : null, isIssued: isIssued ?? false },
      create: { studentId, certificateNumber, issueDate: issueDate ? new Date(issueDate) : null, isIssued: isIssued ?? false },
    })
    return NextResponse.json({ certificate }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
