'use client'

import { Card, CardContent } from '@/components/ui/card'
import { MATURITY_CONFIG } from '@/lib/scoring'
import type { MaturityLevel } from '@/types'

interface Props {
  label: string
  score: number
  level?: MaturityLevel
  isMain?: boolean
}

export function ScoreCard({ label, score, level, isMain }: Props) {
  const getColor = (s: number) => {
    if (s >= 71) return 'text-emerald-600'
    if (s >= 41) return 'text-amber-600'
    return 'text-red-500'
  }

  const getBg = (s: number) => {
    if (s >= 71) return 'from-emerald-50 to-emerald-100/50'
    if (s >= 41) return 'from-amber-50 to-amber-100/50'
    return 'from-red-50 to-red-100/50'
  }

  const getBar = (s: number) => {
    if (s >= 71) return 'bg-emerald-500'
    if (s >= 41) return 'bg-amber-500'
    return 'bg-red-500'
  }

  if (isMain && level) {
    const config = MATURITY_CONFIG[level]
    return (
      <Card className={`border-2 ${config.border} bg-gradient-to-br ${getBg(score)}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className={`text-5xl font-bold ${getColor(score)} mb-1`}>{score}</div>
            <div className="text-xs text-gray-400 mb-2">/100</div>
            <div className={`text-sm font-bold ${config.text} mb-1`}>Nivel {config.label}</div>
            <div className="text-xs text-gray-500">{label}</div>
            <div className="mt-3 bg-gray-200 rounded-full h-1.5">
              <div
                className={`${getBar(score)} h-1.5 rounded-full transition-all`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2">
      <CardContent className="p-5">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getColor(score)} mb-1`}>{score}</div>
          <div className="text-xs text-gray-400 mb-2">/100</div>
          <div className="text-xs font-medium text-gray-600">{label}</div>
          <div className="mt-3 bg-gray-200 rounded-full h-1.5">
            <div
              className={`${getBar(score)} h-1.5 rounded-full transition-all`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
