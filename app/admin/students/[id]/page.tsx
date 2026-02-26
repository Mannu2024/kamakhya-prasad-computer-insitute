import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ArrowLeft, User, CreditCard, UserCheck, Award } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

export default async function StudentDetailPage({ params }: Props) {
  const { id } = await params

  let student = null
  try {
    student = await prisma.student.findUnique({
      where: { id },
      include: {
        course: true,
        batch: true,
        payments: { orderBy: { date: 'desc' } },
        attendances: { orderBy: { date: 'desc' }, take: 30 },
        certificate: true,
      },
    })
  } catch {
    // db not available
  }

  if (!student) notFound()

  const totalPaid = student.payments.reduce((sum, p) => sum + p.amount, 0)
  const presentDays = student.attendances.filter((a) => a.status === 'PRESENT').length

  return (
    <div className="p-8">
      <Link href="/admin/students" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Students
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 text-2xl font-bold">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-500 font-mono text-sm">{student.rollNumber}</p>
          </div>
        </div>
        <Badge variant={student.status === 'ACTIVE' ? 'default' : student.status === 'COMPLETED' ? 'success' : 'destructive'} className="text-base px-4 py-1">
          {student.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-900" /> Personal Details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium ml-2">{student.name}</span></div>
                <div><span className="text-gray-500">Father:</span> <span className="font-medium ml-2">{student.fatherName || '-'}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="font-medium ml-2">{student.phone || '-'}</span></div>
                <div><span className="text-gray-500">Email:</span> <span className="font-medium ml-2">{student.email || '-'}</span></div>
                <div><span className="text-gray-500">DOB:</span> <span className="font-medium ml-2">{student.dob ? formatDate(student.dob) : '-'}</span></div>
                <div><span className="text-gray-500">Enrolled:</span> <span className="font-medium ml-2">{formatDate(student.enrollmentDate)}</span></div>
                <div><span className="text-gray-500">Course:</span> <span className="font-medium ml-2">{student.course.name}</span></div>
                <div><span className="text-gray-500">Batch:</span> <span className="font-medium ml-2">{student.batch?.name || '-'}</span></div>
                {student.address && <div className="col-span-2"><span className="text-gray-500">Address:</span> <span className="font-medium ml-2">{student.address}</span></div>}
              </div>
            </CardContent>
          </Card>

          {/* Fees */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-900" /> Fee Payments
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-900">{formatCurrency(student.totalFees)}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-700">{formatCurrency(totalPaid)}</div>
                  <div className="text-xs text-gray-500">Paid</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="font-bold text-red-600">{formatCurrency(Math.max(0, student.totalFees - totalPaid))}</div>
                  <div className="text-xs text-gray-500">Due</div>
                </div>
              </div>
              {student.payments.length > 0 && (
                <table className="w-full text-sm">
                  <thead><tr className="border-b"><th className="text-left py-2 text-gray-500">Date</th><th className="text-left py-2 text-gray-500">Amount</th><th className="text-left py-2 text-gray-500">Mode</th></tr></thead>
                  <tbody>
                    {student.payments.map((p) => (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-2">{formatDate(p.date)}</td>
                        <td className="py-2 font-medium">{formatCurrency(p.amount)}</td>
                        <td className="py-2 text-gray-500">{p.mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>

          {/* Attendance */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-blue-900" /> Attendance (Last 30 days)
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-900">{student.attendances.length}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-700">{presentDays}</div>
                  <div className="text-xs text-gray-500">Present</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="font-bold text-amber-600">
                    {student.attendances.length > 0 ? Math.round((presentDays / student.attendances.length) * 100) : 0}%
                  </div>
                  <div className="text-xs text-gray-500">Attendance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-900" /> Certificate
              </h2>
              {student.certificate ? (
                <div>
                  <Badge variant={student.certificate.isIssued ? 'success' : 'warning'} className="mb-3">
                    {student.certificate.isIssued ? 'Issued' : 'Pending'}
                  </Badge>
                  {student.certificate.certificateNumber && (
                    <p className="text-sm text-gray-600">No: {student.certificate.certificateNumber}</p>
                  )}
                  {student.certificate.issueDate && (
                    <p className="text-sm text-gray-600">Date: {formatDate(student.certificate.issueDate)}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No certificate record</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link href={`/admin/fees?student=${student.id}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" /> Add Payment
                  </Button>
                </Link>
                <Link href={`/admin/certificates?student=${student.id}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" /> Manage Certificate
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
