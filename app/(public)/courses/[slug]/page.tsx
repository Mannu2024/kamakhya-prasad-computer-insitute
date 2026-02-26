import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Clock, BookOpen, CheckCircle, ArrowLeft, Phone } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params

  let course = null
  try {
    course = await prisma.course.findUnique({ where: { slug } })
  } catch {
    // db not available
  }

  if (!course) {
    notFound()
  }

  const syllabusItems = course.syllabus
    ? course.syllabus.split('\n').filter(Boolean)
    : ['Module 1: Introduction', 'Module 2: Core Concepts', 'Module 3: Advanced Topics', 'Module 4: Practical Training']

  return (
    <div>
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/courses" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
          </Link>
          <Badge variant="secondary" className="mb-3">{course.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
          <div className="flex items-center gap-6 text-blue-200">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Duration: {course.duration}
            </div>
            <div className="text-amber-400 font-bold text-2xl">{formatCurrency(course.fees)}</div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Overview */}
            {course.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Course Overview</h2>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>
            )}

            {/* Syllabus */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                <BookOpen className="h-6 w-6 inline mr-2" />
                Course Syllabus
              </h2>
              <div className="space-y-3">
                {syllabusItems.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            {course.eligibility && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Eligibility</h2>
                <p className="text-gray-600">{course.eligibility}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Course Details</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold">{course.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Course Fee</span>
                    <span className="font-bold text-amber-600">{formatCurrency(course.fees)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Certification</span>
                    <span className="font-semibold text-green-600">Included</span>
                  </div>
                </div>
                <Link href="/admission">
                  <Button className="w-full mb-3" size="lg">Enroll Now</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="mr-2 h-4 w-4" /> Enquire Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
