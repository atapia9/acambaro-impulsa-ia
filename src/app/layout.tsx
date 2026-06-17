import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({ variable: '--font-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Acámbaro Impulsa IA | Diagnóstico Digital para tu Negocio',
  description:
    'Transforma tu negocio con inteligencia artificial. Realiza un diagnóstico de madurez digital y recibe un plan de acción personalizado para tu empresa en Acámbaro, Guanajuato.',
  keywords: ['transformación digital', 'IA', 'Acámbaro', 'diagnóstico digital', 'PyMEs'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
