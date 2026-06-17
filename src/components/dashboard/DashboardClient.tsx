'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { useDiagnosticStore } from '@/store/diagnostic'
import { calculateScores, MATURITY_CONFIG } from '@/lib/scoring'
import { ScoreCard } from './ScoreCard'
import { RadarChartComponent } from './RadarChartComponent'
import { RecommendationsPanel } from './RecommendationsPanel'
import { ActionPlanPanel } from './ActionPlanPanel'
import { ExecutiveSummary } from './ExecutiveSummary'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, ArrowLeft, RefreshCw, FileText } from 'lucide-react'
import type { Report, ScoreBreakdown } from '@/types'

interface Props {
  paramsPromise: Promise<{ id: string }>
}

export function DashboardClient({ paramsPromise }: Props) {
  const { id } = use(paramsPromise)
  const router = useRouter()
  const { responses, reset } = useDiagnosticStore()
  const [report, setReport] = useState<Report | null>(null)
  const [scores, setScores] = useState<ScoreBreakdown | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (Object.keys(responses).length === 0) {
      router.push('/diagnostic')
      return
    }

    const fetchReport = async () => {
      try {
        const calculatedScores = calculateScores(responses)
        setScores(calculatedScores)

        const res = await fetch('/api/diagnostic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responses, scores: calculatedScores }),
        })

        if (!res.ok) throw new Error('Error generating report')
        const data = await res.json()
        setReport(data.report as Report)
        setScores(data.scores)
      } catch (err) {
        console.error(err)
        toast.error('Error al generar el reporte con IA. Mostrando resultados básicos.')
        const calculatedScores = calculateScores(responses)
        setScores(calculatedScores)
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full gradient-navy flex items-center justify-center mx-auto animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0f2557] mb-2">Analizando tu negocio</h2>
            <p className="text-gray-500">La IA está generando tu diagnóstico y plan de transformación digital personalizado...</p>
          </div>
          <div className="space-y-2">
            {['Calculando madurez digital...', 'Analizando oportunidades...', 'Generando plan de 90 días...', 'Priorizando recomendaciones...'].map((msg, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-400 bg-white rounded-lg px-4 py-2 border">
                <div className="w-4 h-4 rounded-full border-2 border-[#1e3a8a] border-t-transparent animate-spin" />
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!scores) return null

  const config = MATURITY_CONFIG[scores.level]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-navy text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Acámbaro Impulsa IA</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Diagnóstico Digital: {responses.business_name || 'Tu empresa'}
              </h1>
              <div className="flex items-center gap-3">
                <Badge className={`${config.bg} ${config.text} border ${config.border} font-semibold`}>
                  Nivel {config.label}
                </Badge>
                <span className="text-blue-200 text-sm">{responses.business_sector}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2"
                onClick={() => { reset(); router.push('/diagnostic') }}
              >
                <RefreshCw className="w-4 h-4" />
                Nuevo diagnóstico
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ScoreCard
            label="Score General"
            score={scores.total}
            level={scores.level}
            isMain
          />
          <ScoreCard label="Presencia Digital" score={scores.presencia_digital} />
          <ScoreCard label="Ventas & Marketing" score={scores.ventas_marketing} />
          <ScoreCard label="Uso de IA" score={scores.uso_ia} />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {report && <ExecutiveSummary summary={report.executive_summary} strengths={report.strengths} opportunities={report.opportunities} />}
            {report && <ActionPlanPanel plan={report.action_plan_90_days} />}
          </div>
          <div className="space-y-6">
            <RadarChartComponent data={report?.radar_data || { presencia_digital: scores.presencia_digital, ventas_marketing: scores.ventas_marketing, uso_ia: scores.uso_ia, tecnologia: 30, operaciones: 40 }} />
            {report && <RecommendationsPanel recommendations={report.recommendations} />}
          </div>
        </div>

        {/* CTA */}
        <div className="gradient-navy rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">¿Listo para implementar tu plan?</h3>
          <p className="text-blue-100 mb-6">Comparte tu diagnóstico con tu equipo y comienza la transformación.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-white text-[#0f2557] hover:bg-blue-50 gap-2" onClick={() => window.print()}>
              <FileText className="w-4 h-4" />
              Imprimir reporte
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" onClick={() => { reset(); router.push('/diagnostic') }}>
              <RefreshCw className="w-4 h-4" />
              Nuevo diagnóstico
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
