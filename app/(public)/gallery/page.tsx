import { prisma } from '@/lib/prisma'
import { Image as ImageIcon } from 'lucide-react'
import GalleryGrid from './GalleryGrid'

async function getGalleryImages() {
  try {
    return await prisma.galleryImage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages()
  const categories = ['All', ...new Set(images.map((img) => img.category).filter(Boolean) as string[])]

  return (
    <div>
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-blue-200 text-lg">A glimpse into life at Kamakhya Prasad Computer Institute</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {images.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Gallery Coming Soon</h3>
              <p className="text-gray-400">Photos of our institute, students, and events will be added here.</p>
            </div>
          ) : (
            <GalleryGrid images={images} categories={categories} />
          )}
        </div>
      </section>
    </div>
  )
}
