import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import {
  Award,
  BookOpen,
  Briefcase,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
} from 'lucide-react'

const highlights = [
  { icon: Award, title: 'Recognized Certification', desc: 'Government recognized certifications accepted everywhere' },
  { icon: BookOpen, title: 'Quality Training', desc: 'Expert faculty with industry experience' },
  { icon: Briefcase, title: 'Job Support', desc: 'Placement assistance for all students' },
  { icon: Users, title: 'Modern Labs', desc: 'Latest computers and software' },
  { icon: Star, title: 'Experienced Faculty', desc: '10+ years of teaching excellence' },
]

const stats = [
  { value: '1000+', label: 'Students Trained' },
  { value: '20+', label: 'Courses Offered' },
  { value: '10+', label: 'Years Experience' },
  { value: '95%', label: 'Placement Rate' },
]

async function getCourses() {
  try {
    return await prisma.course.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { createdAt: 'asc' },
    })
  } catch {
    return []
  }
}

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { isActive: true },
      take: 3,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [courses, testimonials] = await Promise.all([getCourses(), getTestimonials()])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
            Recognized Computer Education Center
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Kamakhya Prasad
            <span className="text-amber-400 block">Computer Institute</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Empowering students with quality computer education and professional skills for a
            bright digital future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admission">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Apply for Admission <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-blue-900"
              >
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best computer education with modern facilities and experienced faculty
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {highlights.map((item) => (
              <Card key={item.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-0">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-blue-900" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Popular Courses</h2>
            <p className="text-gray-600">Choose from our wide range of professional courses</p>
          </div>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-xs">
                      {course.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{course.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description || 'Professional computer course with certification'}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="text-amber-600 font-semibold">{formatCurrency(course.fees)}</div>
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      <Button variant="outline" className="w-full">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['DCA', 'ADCA', 'Tally with GST'].map((name) => (
                <Card key={name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">Computer</Badge>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{name}</h3>
                    <p className="text-gray-600 text-sm mb-4">Professional computer course with government recognized certification</p>
                    <Link href="/courses">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/courses">
              <Button size="lg" className="px-8">
                View All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Student Success Stories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card key={t.id} className="p-6">
                  <CardContent className="pt-0">
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">&ldquo;{t.message}&rdquo;</p>
                    <div className="font-semibold text-blue-900">{t.studentName}</div>
                    {t.course && <div className="text-sm text-gray-500">{t.course}</div>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-amber-100 mb-8 text-lg">
            Contact us today to learn more about admissions and courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admission">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 px-8">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-amber-600 px-8"
              >
                <Phone className="mr-2 h-5 w-5" /> Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Government Recognized Certifications',
              'Experienced and Qualified Faculty',
              'Modern Computer Labs',
              'Affordable Fee Structure',
              'Flexible Timing Options',
              'Placement Assistance',
              'Online & Offline Classes',
              'Regular Mock Tests',
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
