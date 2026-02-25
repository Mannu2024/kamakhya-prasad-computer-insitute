'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Plus, Eye, Users } from 'lucide-react'

interface Student {
  id: string
  rollNumber: string
  name: string
  phone?: string
  status: string
  course: { name: string }
  enrollmentDate: string
}

interface Course {
  id: string
  name: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    email: '',
    courseId: '',
    fatherName: '',
    address: '',
    totalFees: '',
  })
  const [saving, setSaving] = useState(false)

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch(`/api/students?search=${encodeURIComponent(search)}`)
      const data = await res.json()
      setStudents(data.students || [])
    } catch {
      console.error('Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  useEffect(() => {
    fetch('/api/courses').then((r) => r.json()).then((data) => setCourses(data.courses || []))
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newStudent, totalFees: parseFloat(newStudent.totalFees) || 0 }),
      })
      if (res.ok) {
        setShowAdd(false)
        setNewStudent({ name: '', phone: '', email: '', courseId: '', fatherName: '', address: '', totalFees: '' })
        fetchStudents()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 mt-1">Manage student records</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Student
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No students found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Roll No</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Course</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Phone</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{student.rollNumber}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-gray-600">{student.course.name}</td>
                      <td className="px-4 py-3 text-gray-600">{student.phone || '-'}</td>
                      <td className="px-4 py-3">
                        <Badge variant={student.status === 'ACTIVE' ? 'default' : student.status === 'COMPLETED' ? 'success' : 'destructive'}>
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/students/${student.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} required />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={newStudent.phone} onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} />
              </div>
              <div>
                <Label>Father&apos;s Name</Label>
                <Input value={newStudent.fatherName} onChange={(e) => setNewStudent({...newStudent, fatherName: e.target.value})} />
              </div>
              <div className="col-span-2">
                <Label>Course *</Label>
                <Select value={newStudent.courseId} onValueChange={(v) => setNewStudent({...newStudent, courseId: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input value={newStudent.address} onChange={(e) => setNewStudent({...newStudent, address: e.target.value})} />
              </div>
              <div>
                <Label>Total Fees (₹)</Label>
                <Input type="number" value={newStudent.totalFees} onChange={(e) => setNewStudent({...newStudent, totalFees: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add Student'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
