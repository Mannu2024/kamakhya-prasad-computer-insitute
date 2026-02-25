'use client'

import * as React from 'react'
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast'

type ToastData = {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

const ToastContext = React.createContext<{
  toast: (data: Omit<ToastData, 'id'>) => void
}>({ toast: () => {} })

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const toast = React.useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...data, id }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {toasts.map((t) => (
          <Toast key={t.id} variant={t.variant}>
            {t.title && <ToastTitle>{t.title}</ToastTitle>}
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return React.useContext(ToastContext)
}
