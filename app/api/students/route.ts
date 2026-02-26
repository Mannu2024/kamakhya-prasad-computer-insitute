import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateRollNumber } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { rollNumber: { contains: search } },
            { phone: { contains: search } },
          ],
        }
      : {}

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        include: { course: true, batch: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.student.count({ where }),
    ])

    return NextResponse.json({ students, total, page, limit })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, courseId, batchId, fatherName, motherName, address, totalFees, dob } = body

    if (!name || !courseId) {
      return NextResponse.json({ error: 'Name and courseId are required' }, { status: 400 })
    }

    let rollNumber = generateRollNumber()
    // Ensure unique
    let exists = await prisma.student.findUnique({ where: { rollNumber } })
    while (exists) {
      rollNumber = generateRollNumber()
      exists = await prisma.student.findUnique({ where: { rollNumber } })
    }

    const student = await prisma.student.create({
      data: {
        rollNumber,
        name,
        phone: phone || null,
        email: email || null,
        courseId,
        batchId: batchId || null,
        fatherName: fatherName || null,
        motherName: motherName || null,
        address: address || null,
        totalFees: totalFees || 0,
        dob: dob ? new Date(dob) : null,
      },
      include: { course: true },
    })

    return NextResponse.json({ student }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 })
  }
}
