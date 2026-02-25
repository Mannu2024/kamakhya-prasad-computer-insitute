import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    
    const payments = await prisma.payment.findMany({
      where: studentId ? { studentId } : {},
      include: { student: { select: { name: true, rollNumber: true } } },
      orderBy: { date: 'desc' },
    })
    return NextResponse.json({ payments })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, amount, mode, transactionRef } = body

    if (!studentId || !amount) {
      return NextResponse.json({ error: 'studentId and amount required' }, { status: 400 })
    }

    const payment = await prisma.payment.create({
      data: { studentId, amount, mode: mode || 'CASH', transactionRef: transactionRef || null },
      include: { student: { select: { name: true, rollNumber: true } } },
    })
    return NextResponse.json({ payment }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
