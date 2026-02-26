'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus, Edit, BookOpen } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Course {
  id: string
  name: string
  slug: string
  category: string
  duration: string
  fees: number
  description?: string
  isActive: boolean
  _count?: { students: number }
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', duration: '', fees: '', description: '', eligibility: '', syllabus: '' })
  const [saving, setSaving] = useState(false)

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses')
      const data = await res.json()
      setCourses(data.courses || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCourses() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug, fees: parseFloat(form.fees) || 0 }),
      })
      if (res.ok) {
        setShowAdd(false)
        setForm({ name: '', category: '', duration: '', fees: '', description: '', eligibility: '', syllabus: '' })
        fetchCourses()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 mt-1">Manage course catalog</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Course
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>No courses added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline">{course.category}</Badge>
                  <Badge variant={course.isActive ? 'success' : 'destructive'} className="text-xs">
                    {course.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{course.name}</h3>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Duration: {course.duration}</p>
                  <p className="text-amber-600 font-semibold">{formatCurrency(course.fees)}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add New Course</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Course Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
              </div>
              <div>
                <Label>Category *</Label>
                <Input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} placeholder="e.g., Computer, Accounting" required />
              </div>
              <div>
                <Label>Duration *</Label>
                <Input value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})} placeholder="e.g., 6 Months" required />
              </div>
              <div>
                <Label>Fees (₹) *</Label>
                <Input type="number" value={form.fees} onChange={(e) => setForm({...form, fees: e.target.value})} required />
              </div>
              <div>
                <Label>Eligibility</Label>
                <Input value={form.eligibility} onChange={(e) => setForm({...form, eligibility: e.target.value})} placeholder="e.g., 10th Pass" />
              </div>
              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} />
              </div>
              <div className="col-span-2">
                <Label>Syllabus (one item per line)</Label>
                <Textarea value={form.syllabus} onChange={(e) => setForm({...form, syllabus: e.target.value})} rows={4} placeholder="Module 1: Introduction&#10;Module 2: Core Concepts" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add Course'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
