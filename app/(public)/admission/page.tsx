'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Phone, MessageSquare } from 'lucide-react'

const steps = [
  { step: '01', title: 'Visit Institute', desc: 'Come to our institute or contact us to know about available courses' },
  { step: '02', title: 'Choose Course', desc: 'Select the course that best suits your interests and career goals' },
  { step: '03', title: 'Fill Form', desc: 'Complete the admission form with your personal and academic details' },
  { step: '04', title: 'Pay Fees', desc: 'Pay the course fee (full or installments as per scheme)' },
  { step: '05', title: 'Start Learning', desc: 'Attend orientation and begin your journey to success' },
]

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', phone: '', course: '', message: '' })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Admission</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Take the first step towards your digital career. Apply for admission today.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Admission Process</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-blue-200"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {steps.map((step) => (
                <div key={step.step} className="text-center relative">
                  <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Send Enquiry</h2>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Enquiry Submitted!</h3>
                  <p className="text-gray-600">We&apos;ll contact you shortly. Thank you for your interest.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="course">Course Interested In</Label>
                    <Input
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      placeholder="e.g., DCA, ADCA, Tally"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific questions or requirements..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Or contact us directly</p>
            <div className="flex gap-4 justify-center">
              <a href="tel:+919876543210">
                <Button variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" /> Call Us
                </Button>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="gap-2">
                  <MessageSquare className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
