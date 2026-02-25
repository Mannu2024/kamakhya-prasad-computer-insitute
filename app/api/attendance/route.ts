import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    
    const attendances = await prisma.attendance.findMany({
      where: studentId ? { studentId } : {},
      include: { student: { select: { name: true, rollNumber: true } } },
      orderBy: { date: 'desc' },
    })
    return NextResponse.json({ attendances })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { records } = body // [{ studentId, date, status }]

    if (!records || !Array.isArray(records)) {
      return NextResponse.json({ error: 'records array required' }, { status: 400 })
    }

    const attendances = await prisma.$transaction(
      records.map((r: { studentId: string; date: string; status: string }) =>
        prisma.attendance.create({
          data: {
            studentId: r.studentId,
            date: new Date(r.date),
            status: r.status || 'PRESENT',
          },
        })
      )
    )

    return NextResponse.json({ attendances }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
