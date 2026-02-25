import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, course, message } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone required' }, { status: 400 })
    }

    const enquiry = await prisma.enquiry.create({
      data: { name, phone, course: course || null, message: message || null },
    })
    return NextResponse.json({ enquiry }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ enquiries })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
