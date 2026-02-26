import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // --- Cloudinary (used in production on Vercel / Netlify) ---
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET

    if (cloudName && uploadPreset) {
      const cloudForm = new FormData()
      cloudForm.append('file', file)
      cloudForm.append('upload_preset', uploadPreset)
      cloudForm.append('folder', 'kpci')

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: cloudForm }
      )

      if (!res.ok) {
        const err = await res.json()
        console.error('Cloudinary upload error:', err)
        return NextResponse.json({ error: 'Cloud upload failed' }, { status: 500 })
      }

      const result = await res.json()
      return NextResponse.json({ url: result.secure_url }, { status: 201 })
    }

    // --- Local filesystem fallback (development only) ---
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          error:
            'File uploads require Cloudinary to be configured in production. ' +
            'Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET environment variables.',
        },
        { status: 501 }
      )
    }

    const { writeFile, mkdir } = await import('fs/promises')
    const path = await import('path')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filepath = path.join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
