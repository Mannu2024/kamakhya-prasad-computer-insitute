import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const content = await prisma.siteContent.findMany()
    const map: Record<string, string> = {}
    content.forEach((c) => { map[c.key] = c.value })
    return NextResponse.json({ content: map })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updates = Object.entries(body) as [string, string][]

    await Promise.all(
      updates.map(([key, value]) =>
        prisma.siteContent.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
