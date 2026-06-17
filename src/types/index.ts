export type MaturityLevel = 'inicial' | 'intermedio' | 'avanzado'

export interface Profile {
  id: string
  full_name: string | null
  email: string
  phone: string | null
  role: 'user' | 'admin'
  created_at: string
}

export interface Company {
  id: string
  user_id: string
  name: string
  sector: string
  size: 'micro' | 'pequeña' | 'mediana'
  city: string
  state: string
  years_operating: number | null
  website: string | null
  phone: string | null
  created_at: string
}

export interface DiagnosticResponses {
  // Step 1: Business
  business_name: string
  business_sector: string
  business_size: string
  years_operating: number
  employees_count: number
  annual_revenue: string
  // Step 2: Digital Presence
  has_website: boolean
  website_url: string
  has_social_media: boolean
  social_media_platforms: string[]
  has_google_my_business: boolean
  has_online_store: boolean
  // Step 3: Sales & Marketing
  uses_digital_advertising: boolean
  advertising_platforms: string[]
  monthly_marketing_budget: string
  uses_crm: boolean
  uses_email_marketing: boolean
  tracks_metrics: boolean
  // Step 4: AI
  knows_about_ai: boolean
  uses_ai_tools: boolean
  ai_tools_used: string[]
  ai_interest_level: 'none' | 'low' | 'medium' | 'high'
}

export interface Diagnostic {
  id: string
  company_id: string
  user_id: string
  status: 'in_progress' | 'completed' | 'failed'
  responses: Partial<DiagnosticResponses>
  total_score: number
  maturity_level: MaturityLevel | null
  digital_presence_score: number
  sales_marketing_score: number
  ai_score: number
  completed_at: string | null
  created_at: string
}

export interface ActionPlanItem {
  week: string
  title: string
  description: string
  impact: 'alto' | 'medio' | 'bajo'
  cost: 'gratuito' | 'bajo' | 'medio' | 'alto'
  category: string
}

export interface Recommendation {
  title: string
  description: string
  impact: 'alto' | 'medio' | 'bajo'
  effort: 'bajo' | 'medio' | 'alto'
  priority: number
  category: string
  tools?: string[]
}

export interface Report {
  id: string
  diagnostic_id: string
  user_id: string
  executive_summary: string
  action_plan_90_days: ActionPlanItem[]
  recommendations: Recommendation[]
  strengths: string[]
  opportunities: string[]
  radar_data: RadarData
  created_at: string
}

export interface RadarData {
  presencia_digital: number
  ventas_marketing: number
  uso_ia: number
  tecnologia: number
  operaciones: number
}

export interface ScoreBreakdown {
  presencia_digital: number
  ventas_marketing: number
  uso_ia: number
  total: number
  level: MaturityLevel
}
