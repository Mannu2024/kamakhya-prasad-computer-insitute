import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ rollNumber: string }> }
) {
  try {
    const { rollNumber } = await params
    const decodedRoll = decodeURIComponent(rollNumber)

    const student = await prisma.student.findUnique({
      where: { rollNumber: decodedRoll },
      include: {
        course: true,
        batch: true,
        certificate: true,
        payments: { orderBy: { date: 'desc' } },
        attendances: true,
      },
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    if (student.isBlocked || !student.verificationEnabled) {
      return NextResponse.json({ error: 'Verification not available' }, { status: 403 })
    }

    return NextResponse.json({ student })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
