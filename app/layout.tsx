import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Kamakhya Prasad Computer Institute',
  description: 'Professional computer education and training center',
  keywords: 'computer institute, computer courses, IT training, Kamakhya Prasad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
