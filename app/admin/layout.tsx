'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  UserCheck,
  Award,
  Shield,
  BarChart2,
  Settings,
  LogOut,
  GraduationCap,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/batches', label: 'Batches', icon: Calendar },
  { href: '/admin/fees', label: 'Fees', icon: CreditCard },
  { href: '/admin/attendance', label: 'Attendance', icon: UserCheck },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/verification', label: 'Verification', icon: Shield },
  { href: '/admin/reports', label: 'Reports', icon: BarChart2 },
  { href: '/admin/content', label: 'Content', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, pathname, router])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col min-h-screen">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center font-bold">
              K
            </div>
            <div>
              <div className="font-bold text-sm">KPCI Admin</div>
              <div className="text-xs text-blue-300">{session.user?.name}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-200 hover:text-white hover:bg-blue-800'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-blue-200 hover:text-white hover:bg-blue-800 mb-2">
            <GraduationCap className="h-5 w-5" />
            <span>View Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-blue-200 hover:text-white hover:bg-red-700 w-full transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
