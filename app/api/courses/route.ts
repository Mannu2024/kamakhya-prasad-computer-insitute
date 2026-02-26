import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ courses })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, category, duration, fees, description, eligibility, syllabus } = body

    if (!name || !slug || !category || !duration) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const course = await prisma.course.create({
      data: { name, slug, category, duration, fees: fees || 0, description, eligibility, syllabus },
    })
    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
