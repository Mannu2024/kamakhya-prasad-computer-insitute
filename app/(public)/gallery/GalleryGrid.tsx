'use client'

import { useState } from 'react'

interface GalleryImage {
  id: string
  url: string
  caption: string | null
  category: string | null
}

interface Props {
  images: GalleryImage[]
  categories: string[]
}

export default function GalleryGrid({ images, categories }: Props) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? images : images.filter((img) => img.category === active)

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <img
              src={image.url}
              alt={image.caption || 'Gallery image'}
              className="w-full h-full object-cover"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-xs">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
