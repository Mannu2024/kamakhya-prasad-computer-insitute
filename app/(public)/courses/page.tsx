import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { Clock, ArrowRight } from 'lucide-react'

async function getCourses() {
  try {
    return await prisma.course.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function CoursesPage() {
  const courses = await getCourses()
  const categories = [...new Set(courses.map((c) => c.category))]

  return (
    <div>
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Explore our wide range of professional computer courses designed for all skill levels
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses available at the moment. Please check back later.</p>
            </div>
          ) : (
            <>
              {categories.map((category) => (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-amber-400 inline-block">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                      .filter((c) => c.category === category)
                      .map((course) => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <Badge variant="outline" className="mb-3 text-xs">
                              {course.category}
                            </Badge>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">{course.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {course.description || 'Professional computer course with industry-recognized certification.'}
                            </p>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="h-4 w-4 mr-1" />
                                {course.duration}
                              </div>
                              <div className="text-amber-600 font-semibold text-lg">{formatCurrency(course.fees)}</div>
                            </div>
                            <Link href={`/courses/${course.slug}`}>
                              <Button className="w-full">
                                View Details <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
