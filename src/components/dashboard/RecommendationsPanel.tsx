'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb } from 'lucide-react'
import type { Recommendation } from '@/types'

interface Props {
  recommendations: Recommendation[]
}

const IMPACT_COLOR = {
  alto: 'bg-emerald-100 text-emerald-700',
  medio: 'bg-amber-100 text-amber-700',
  bajo: 'bg-gray-100 text-gray-600',
}

const EFFORT_COLOR = {
  bajo: 'text-emerald-600',
  medio: 'text-amber-600',
  alto: 'text-red-600',
}

export function RecommendationsPanel({ recommendations }: Props) {
  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-navy flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-[#0f2557] text-sm">Top Recomendaciones</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.slice(0, 5).map((rec, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full gradient-navy flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <Badge className={`text-xs px-2 py-0 ${IMPACT_COLOR[rec.impact] || IMPACT_COLOR.medio}`}>
                      {rec.impact}
                    </Badge>
                    <span className={`text-xs font-medium ${EFFORT_COLOR[rec.effort] || EFFORT_COLOR.medio}`}>
                      Esfuerzo {rec.effort}
                    </span>
                  </div>
                  <h5 className="font-semibold text-[#0f2557] text-xs mb-1">{rec.title}</h5>
                  <p className="text-xs text-gray-500 leading-relaxed">{rec.description}</p>
                  {rec.tools && rec.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rec.tools.map((tool) => (
                        <span key={tool} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
