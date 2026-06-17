import type { DiagnosticResponses, MaturityLevel, ScoreBreakdown } from '@/types'

export function calculateDigitalPresenceScore(r: Partial<DiagnosticResponses>): number {
  let score = 0
  if (r.has_website) score += 25
  if (r.website_url) score += 5
  if (r.has_social_media) score += 20
  if ((r.social_media_platforms?.length ?? 0) >= 2) score += 10
  if (r.has_google_my_business) score += 25
  if (r.has_online_store) score += 15
  return Math.min(score, 100)
}

export function calculateSalesMarketingScore(r: Partial<DiagnosticResponses>): number {
  let score = 0
  if (r.uses_digital_advertising) score += 25
  if ((r.advertising_platforms?.length ?? 0) >= 2) score += 10
  if (r.monthly_marketing_budget && r.monthly_marketing_budget !== 'nada') score += 15
  if (r.uses_crm) score += 25
  if (r.uses_email_marketing) score += 15
  if (r.tracks_metrics) score += 10
  return Math.min(score, 100)
}

export function calculateAIScore(r: Partial<DiagnosticResponses>): number {
  let score = 0
  if (r.knows_about_ai) score += 20
  if (r.uses_ai_tools) score += 40
  if ((r.ai_tools_used?.length ?? 0) >= 2) score += 20
  const interestMap = { none: 0, low: 5, medium: 10, high: 20 }
  score += interestMap[r.ai_interest_level ?? 'none']
  return Math.min(score, 100)
}

export function calculateTotalScore(
  presencia: number,
  marketing: number,
  ia: number
): number {
  return Math.round(presencia * 0.35 + marketing * 0.35 + ia * 0.3)
}

export function getMaturityLevel(score: number): MaturityLevel {
  if (score <= 40) return 'inicial'
  if (score <= 70) return 'intermedio'
  return 'avanzado'
}

export function calculateScores(responses: Partial<DiagnosticResponses>): ScoreBreakdown {
  const presencia_digital = calculateDigitalPresenceScore(responses)
  const ventas_marketing = calculateSalesMarketingScore(responses)
  const uso_ia = calculateAIScore(responses)
  const total = calculateTotalScore(presencia_digital, ventas_marketing, uso_ia)
  return {
    presencia_digital,
    ventas_marketing,
    uso_ia,
    total,
    level: getMaturityLevel(total),
  }
}

export const MATURITY_CONFIG = {
  inicial: {
    label: 'Inicial',
    color: '#ef4444',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    description: 'Tu negocio está comenzando su transformación digital. Hay grandes oportunidades de crecimiento.',
    range: '0 - 40',
  },
  intermedio: {
    label: 'Intermedio',
    color: '#f59e0b',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    description: 'Tu negocio tiene bases digitales sólidas. Es momento de acelerar y optimizar.',
    range: '41 - 70',
  },
  avanzado: {
    label: 'Avanzado',
    color: '#10b981',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    description: 'Tu negocio está a la vanguardia digital. Mantén el ritmo e innova continuamente.',
    range: '71 - 100',
  },
}
