import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Users, BookOpen, Award, CreditCard, TrendingUp, AlertCircle } from 'lucide-react'

async function getDashboardStats() {
  try {
    const [totalStudents, activeStudents, completedStudents, courses, payments, certificates] =
      await Promise.all([
        prisma.student.count(),
        prisma.student.count({ where: { status: 'ACTIVE' } }),
        prisma.student.count({ where: { status: 'COMPLETED' } }),
        prisma.course.count({ where: { isActive: true } }),
        prisma.payment.findMany({
          where: {
            date: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
        prisma.certificate.count({ where: { isIssued: true } }),
      ])

    const feesThisMonth = payments.reduce((sum, p) => sum + p.amount, 0)

    return { totalStudents, activeStudents, completedStudents, courses, feesThisMonth, certificates }
  } catch {
    return { totalStudents: 0, activeStudents: 0, completedStudents: 0, courses: 0, feesThisMonth: 0, certificates: 0 }
  }
}

async function getRecentStudents() {
  try {
    return await prisma.student.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { course: true },
    })
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const recentStudents = await getRecentStudents()

  const statCards = [
    { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-100 text-blue-900' },
    { title: 'Active Students', value: stats.activeStudents, icon: TrendingUp, color: 'bg-green-100 text-green-700' },
    { title: 'Completed', value: stats.completedStudents, icon: Award, color: 'bg-purple-100 text-purple-700' },
    { title: 'Active Courses', value: stats.courses, icon: BookOpen, color: 'bg-amber-100 text-amber-700' },
    { title: 'Fees This Month', value: formatCurrency(stats.feesThisMonth), icon: CreditCard, color: 'bg-emerald-100 text-emerald-700' },
    { title: 'Certificates Issued', value: stats.certificates, icon: Award, color: 'bg-rose-100 text-rose-700' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to KPCI Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Students */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Enrollments</h2>
          {recentStudents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No students enrolled yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-gray-500">Roll No</th>
                    <th className="text-left py-2 font-medium text-gray-500">Name</th>
                    <th className="text-left py-2 font-medium text-gray-500">Course</th>
                    <th className="text-left py-2 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((student) => (
                    <tr key={student.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-mono text-xs">{student.rollNumber}</td>
                      <td className="py-3 font-medium">{student.name}</td>
                      <td className="py-3 text-gray-600">{student.course.name}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                          student.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
