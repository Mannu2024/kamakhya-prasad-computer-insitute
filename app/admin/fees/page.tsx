'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, CreditCard } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Payment {
  id: string
  amount: number
  date: string
  mode: string
  transactionRef?: string
  student: { name: string; rollNumber: string }
}

interface Student {
  id: string
  name: string
  rollNumber: string
}

export default function FeesPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ studentId: '', amount: '', mode: 'CASH', transactionRef: '' })
  const [saving, setSaving] = useState(false)

  const fetchPayments = useCallback(async () => {
    try {
      const res = await fetch('/api/fees')
      const data = await res.json()
      setPayments(data.payments || [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPayments() }, [fetchPayments])
  useEffect(() => {
    fetch('/api/students').then(r => r.json()).then(d => setStudents(d.students || []))
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      })
      if (res.ok) {
        setShowAdd(false)
        setForm({ studentId: '', amount: '', mode: 'CASH', transactionRef: '' })
        fetchPayments()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Payments</h1>
          <p className="text-gray-500 mt-1">Track and manage fee collections</p>
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-2" /> Record Payment</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : payments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No payments recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-500">Date</th>
                    <th className="text-left px-4 py-3 text-gray-500">Student</th>
                    <th className="text-left px-4 py-3 text-gray-500">Roll No</th>
                    <th className="text-left px-4 py-3 text-gray-500">Amount</th>
                    <th className="text-left px-4 py-3 text-gray-500">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3">{formatDate(p.date)}</td>
                      <td className="px-4 py-3 font-medium">{p.student.name}</td>
                      <td className="px-4 py-3 font-mono text-xs">{p.student.rollNumber}</td>
                      <td className="px-4 py-3 font-bold text-green-700">{formatCurrency(p.amount)}</td>
                      <td className="px-4 py-3 text-gray-500">{p.mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Record Payment</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label>Student *</Label>
              <Select value={form.studentId} onValueChange={(v) => setForm({...form, studentId: v})}>
                <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.rollNumber})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount (₹) *</Label>
              <Input type="number" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} required />
            </div>
            <div>
              <Label>Payment Mode</Label>
              <Select value={form.mode} onValueChange={(v) => setForm({...form, mode: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="ONLINE">Online</SelectItem>
                  <SelectItem value="CHEQUE">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Transaction Reference</Label>
              <Input value={form.transactionRef} onChange={(e) => setForm({...form, transactionRef: e.target.value})} placeholder="Optional" />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Record Payment'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
