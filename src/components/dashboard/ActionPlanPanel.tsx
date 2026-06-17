'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, DollarSign, Zap } from 'lucide-react'
import type { ActionPlanItem } from '@/types'

interface Props {
  plan: ActionPlanItem[]
}

const IMPACT_CONFIG = {
  alto: { label: 'Alto impacto', color: 'bg-emerald-100 text-emerald-700' },
  medio: { label: 'Impacto medio', color: 'bg-amber-100 text-amber-700' },
  bajo: { label: 'Bajo impacto', color: 'bg-gray-100 text-gray-600' },
}

const COST_CONFIG = {
  gratuito: { label: 'Gratis', color: 'text-emerald-600' },
  bajo: { label: 'Costo bajo', color: 'text-amber-600' },
  medio: { label: 'Costo medio', color: 'text-orange-600' },
  alto: { label: 'Inversión alta', color: 'text-red-600' },
}

export function ActionPlanPanel({ plan }: Props) {
  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-navy flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-[#0f2557]">Plan de Acción 90 Días</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">Pasos concretos para transformar tu negocio</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {plan.map((item, i) => {
            const impact = IMPACT_CONFIG[item.impact] || IMPACT_CONFIG.medio
            const cost = COST_CONFIG[item.cost] || COST_CONFIG.bajo
            return (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-xs font-medium text-[#1e3a8a] bg-blue-100 px-2 py-0.5 rounded-full">
                        {item.week}
                      </span>
                      <h4 className="font-semibold text-[#0f2557] text-sm mt-1">{item.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge className={`text-xs ${impact.color}`}>{impact.label}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <DollarSign className={`w-3 h-3 ${cost.color}`} />
                    <span className={`text-xs font-medium ${cost.color}`}>{cost.label}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
