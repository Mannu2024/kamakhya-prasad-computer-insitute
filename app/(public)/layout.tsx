import Link from 'next/link'
import { Menu } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/admission', label: 'Admission' },
  { href: '/verify', label: 'Verify Certificate' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
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
              <button className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                  K
                </div>
                <div>
                  <div className="font-bold text-white">Kamakhya Prasad Computer Institute</div>
                  <div className="text-xs text-gray-400">Quality Education Since 2010</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Providing quality computer education and professional training to empower students
                with the skills needed for today&apos;s digital world.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-amber-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm">
                <p>📍 Near Main Market, City Center</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ info@kpci.edu.in</p>
                <p>🕐 Mon-Sat: 8AM - 8PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Kamakhya Prasad Computer Institute. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
