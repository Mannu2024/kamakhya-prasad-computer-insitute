'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Shield } from 'lucide-react'

export default function VerifyPage() {
  const router = useRouter()
  const [rollNumber, setRollNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rollNumber.trim()) {
      router.push(`/verify/${encodeURIComponent(rollNumber.trim())}`)
    }
  }

  return (
    <div>
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-amber-400" />
          <h1 className="text-4xl font-bold mb-4">Certificate Verification</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Verify the authenticity of Kamakhya Prasad Computer Institute certificates
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Search className="h-12 w-12 text-blue-900 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-blue-900">Verify Student Certificate</h2>
                <p className="text-gray-600 text-sm mt-2">
                  Enter the student&apos;s roll number to verify their certificate
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g., KPCI-2024-1234"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: KPCI-YYYY-XXXX</p>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Search className="mr-2 h-4 w-4" /> Verify Certificate
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">How to Verify?</h3>
            <ol className="text-sm text-gray-600 space-y-2">
              <li>1. Enter the roll number printed on the certificate</li>
              <li>2. Click the &quot;Verify Certificate&quot; button</li>
              <li>3. View the student&apos;s details and certificate status</li>
              <li>4. A green badge indicates a valid, authentic certificate</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}
