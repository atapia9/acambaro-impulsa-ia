import { NextRequest, NextResponse } from 'next/server'
import { calculateScores } from '@/lib/scoring'
import { generateDiagnosticReport } from '@/lib/openai'
import type { DiagnosticResponses } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { responses } = body as { responses: Partial<DiagnosticResponses> }

    const scores = calculateScores(responses)

    // Generate AI report
    const startTime = Date.now()
    const aiReport = await generateDiagnosticReport(responses, scores)
    const generationTime = Date.now() - startTime

    // Try to save to Supabase (optional - works without DB config)
    let diagnosticId = `demo_${Date.now()}`
    
    try {
      const { createServiceClient } = await import('@/lib/supabase/server')
      const supabase = await createServiceClient()

      const { data: diagnostic } = await supabase
        .from('diagnostics')
        .insert({
          user_id: '00000000-0000-0000-0000-000000000000', // anonymous
          company_id: '00000000-0000-0000-0000-000000000000',
          status: 'completed',
          responses,
          total_score: scores.total,
          maturity_level: scores.level,
          digital_presence_score: scores.presencia_digital,
          sales_marketing_score: scores.ventas_marketing,
          ai_score: scores.uso_ia,
          completed_at: new Date().toISOString(),
          ...responses,
        })
        .select('id')
        .single()

      if (diagnostic) {
        await supabase.from('reports').insert({
          diagnostic_id: diagnostic.id,
          user_id: '00000000-0000-0000-0000-000000000000',
          executive_summary: aiReport.executive_summary,
          action_plan_90_days: aiReport.action_plan_90_days,
          recommendations: aiReport.recommendations,
          strengths: aiReport.strengths,
          opportunities: aiReport.opportunities,
          radar_data: aiReport.radar_data,
          tokens_used: aiReport.tokens_used,
          generation_time_ms: generationTime,
        })

        diagnosticId = diagnostic.id
      }
    } catch (_dbErr) {
      // Continue without DB - store in response for demo
    }

    return NextResponse.json({
      diagnosticId,
      scores,
      report: aiReport,
    })
  } catch (error) {
    console.error('Diagnostic API error:', error)
    return NextResponse.json(
      { error: 'Error generating diagnostic' },
      { status: 500 }
    )
  }
}
