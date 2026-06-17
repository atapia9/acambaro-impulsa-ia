'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip
} from 'recharts'
import type { RadarData } from '@/types'

interface Props {
  data: RadarData
}

const LABELS: Record<keyof RadarData, string> = {
  presencia_digital: 'Presencia Digital',
  ventas_marketing: 'Marketing',
  uso_ia: 'Uso de IA',
  tecnologia: 'Tecnología',
  operaciones: 'Operaciones',
}

export function RadarChartComponent({ data }: Props) {
  const chartData = (Object.keys(data) as (keyof RadarData)[]).map((key) => ({
    subject: LABELS[key],
    value: data[key],
    fullMark: 100,
  }))

  return (
    <Card className="border-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-[#0f2557]">Mapa de Madurez Digital</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#6b7280', fontSize: 11 }}
            />
            <Radar
              name="Tu empresa"
              dataKey="value"
              stroke="#1e3a8a"
              fill="#1e3a8a"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              formatter={(value) => [`${value}/100`, 'Puntuación']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
