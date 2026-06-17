import { DiagnosticWizard } from '@/components/diagnostic/DiagnosticWizard'
import { Brain } from 'lucide-react'
import Link from 'next/link'

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-lg gradient-navy flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#0f2557]">Acámbaro Impulsa IA</span>
          </Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <DiagnosticWizard />
      </main>
    </div>
  )
}
