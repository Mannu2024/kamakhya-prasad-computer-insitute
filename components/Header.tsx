'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/navLinks'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileOpen(false)}>
            <div className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              K
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">Kamakhya Prasad</div>
              <div className="text-xs text-blue-200 leading-tight">Computer Institute</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800 px-4 pb-4">
          <nav className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
