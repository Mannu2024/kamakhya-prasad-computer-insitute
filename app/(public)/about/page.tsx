import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Target, Eye, Heart } from 'lucide-react'

const whyChooseUs = [
  'Government recognized and affiliated certifications',
  'Highly qualified and experienced faculty',
  'State-of-the-art computer labs with latest hardware',
  'Small batch sizes for personalized attention',
  'Practical training with real-world projects',
  'Career counseling and placement assistance',
  'Affordable fee structure with installment options',
  'Flexible morning and evening batches',
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Learn about Kamakhya Prasad Computer Institute — our history, mission, and commitment to quality education
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Institute</h2>
              <p className="text-gray-600 mb-4">
                Kamakhya Prasad Computer Institute was established in 2010 with a vision to provide
                quality computer education to students from all backgrounds. Over the years, we have
                trained more than 1000 students who are now successfully working in various industries.
              </p>
              <p className="text-gray-600 mb-4">
                We offer a wide range of computer courses from basic to advanced levels, all designed
                to meet the current industry requirements. Our courses are recognized by government
                bodies and are accepted by employers across the country.
              </p>
              <p className="text-gray-600">
                Our state-of-the-art computer labs, experienced faculty, and personalized teaching
                approach make us the preferred choice for computer education in the region.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-amber-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900">2010</div>
                  <div className="text-gray-600 text-sm">Established</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-600">1000+</div>
                  <div className="text-gray-600 text-sm">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900">20+</div>
                  <div className="text-gray-600 text-sm">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-600">95%</div>
                  <div className="text-gray-600 text-sm">Placement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-t-4 border-t-blue-900">
              <CardContent className="pt-0">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To provide accessible, quality computer education that empowers students with
                  practical skills and knowledge needed to succeed in the digital economy.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 border-t-4 border-t-amber-500">
              <CardContent className="pt-0">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading computer education institution in the region, recognized for
                  excellence in teaching, innovation, and student success.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 border-t-4 border-t-green-500">
              <CardContent className="pt-0">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Our Values</h3>
                <p className="text-gray-600">
                  Quality, integrity, accessibility, and student-centered learning. We believe
                  every student deserves the best education regardless of background.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Director Message */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Director&apos;s Message</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center text-3xl font-bold text-blue-900 flex-shrink-0 mx-auto md:mx-0">
                KP
              </div>
              <div>
                <p className="text-gray-600 mb-4 italic text-lg">
                  &ldquo;Education is the most powerful weapon which you can use to change the world.
                  At KPCI, we are committed to providing quality computer education that opens doors
                  to unlimited opportunities for our students.&rdquo;
                </p>
                <p className="text-gray-600 mb-4">
                  Since founding this institute in 2010, I have seen hundreds of students transform
                  their lives through computer education. We take pride in our students&apos; achievements
                  and continue to innovate our teaching methods to stay current with industry needs.
                </p>
                <div>
                  <div className="font-bold text-blue-900">Kamakhya Prasad</div>
                  <div className="text-gray-500 text-sm">Founder & Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Why Choose KPCI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyChooseUs.map((item) => (
              <div key={item} className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
