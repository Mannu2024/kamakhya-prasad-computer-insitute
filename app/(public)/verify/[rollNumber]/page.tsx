import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, Shield } from 'lucide-react'

interface Props {
  params: Promise<{ rollNumber: string }>
}

async function getStudent(rollNumber: string) {
  try {
    return await prisma.student.findUnique({
      where: { rollNumber: decodeURIComponent(rollNumber) },
      include: {
        course: true,
        batch: true,
        certificate: true,
        payments: { orderBy: { date: 'desc' } },
        attendances: true,
      },
    })
  } catch {
    return null
  }
}

export default async function VerifyStudentPage({ params }: Props) {
  const { rollNumber } = await params
  const student = await getStudent(rollNumber)

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Found</h2>
            <p className="text-gray-600 mb-6">
              No student found with roll number <strong>{decodeURIComponent(rollNumber)}</strong>
            </p>
            <Link href="/verify">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Try Another
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (student.isBlocked || !student.verificationEnabled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Restricted</h2>
            <p className="text-gray-600 mb-6">This student&apos;s verification is currently restricted. Please contact the institute.</p>
            <Link href="/verify">
              <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalPaid = student.payments.reduce((sum, p) => sum + p.amount, 0)
  const totalDue = student.totalFees - totalPaid
  const totalDays = student.attendances.length
  const presentDays = student.attendances.filter((a) => a.status === 'PRESENT').length
  const attendancePercent = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/verify" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
        </Link>

        {/* Header Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-blue-900 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-amber-400" />
                <span className="text-amber-400 font-semibold">KPCI Official Verification</span>
              </div>
              {student.status === 'COMPLETED' ? (
                <Badge className="bg-green-500 text-white border-0">
                  <CheckCircle className="h-3 w-3 mr-1" /> Verified
                </Badge>
              ) : (
                <Badge className="bg-blue-500 text-white border-0">Active Student</Badge>
              )}
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-900 text-2xl font-bold">
                {student.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-blue-200">Roll No: {student.rollNumber}</p>
                {student.fatherName && <p className="text-blue-200 text-sm">S/D/O: {student.fatherName}</p>}
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Course</div>
                <div className="font-semibold text-sm">{student.course.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Batch</div>
                <div className="font-semibold text-sm">{student.batch?.name || 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Enrollment Date</div>
                <div className="font-semibold text-sm">{formatDate(student.enrollmentDate)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <Badge variant={student.status === 'COMPLETED' ? 'success' : student.status === 'ACTIVE' ? 'default' : 'destructive'}>
                  {student.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Status */}
        {student.certificate && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Certificate Status</h3>
              {student.certificate.isIssued ? (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-semibold text-green-700">Certificate Issued</div>
                    <div className="text-sm text-gray-600">
                      Certificate No: {student.certificate.certificateNumber || 'N/A'}
                      {student.certificate.issueDate && ` | Issued: ${formatDate(student.certificate.issueDate)}`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="font-semibold text-yellow-700">Certificate Pending</div>
                    <div className="text-sm text-gray-600">Certificate has not been issued yet</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Fee Summary */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Fee Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(student.totalFees)}</div>
                <div className="text-sm text-gray-600">Total Fees</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{formatCurrency(totalPaid)}</div>
                <div className="text-sm text-gray-600">Amount Paid</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{formatCurrency(Math.max(0, totalDue))}</div>
                <div className="text-sm text-gray-600">Balance Due</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance */}
        {totalDays > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Attendance Summary</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{totalDays}</div>
                  <div className="text-sm text-gray-600">Total Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">{presentDays}</div>
                  <div className="text-sm text-gray-600">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{attendancePercent}%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-sm text-gray-500">
          This verification is provided by Kamakhya Prasad Computer Institute.
          For any discrepancies, please contact us at info@kpci.edu.in
        </p>
      </div>
    </div>
  )
}
