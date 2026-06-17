'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, TrendingUp, Zap } from 'lucide-react'

interface Props {
  summary: string
  strengths: string[]
  opportunities: string[]
}

export function ExecutiveSummary({ summary, strengths, opportunities }: Props) {
  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-navy flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-[#0f2557]">Diagnóstico Ejecutivo</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h4 className="font-semibold text-[#0f2557] text-sm">Fortalezas</h4>
            </div>
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-[#0f2557] text-sm">Oportunidades</h4>
            </div>
            <ul className="space-y-2">
              {opportunities.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
