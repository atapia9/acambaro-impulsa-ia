import OpenAI from 'openai'
import type { DiagnosticResponses, ScoreBreakdown, ActionPlanItem, Recommendation } from '@/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateDiagnosticReport(
  responses: Partial<DiagnosticResponses>,
  scores: ScoreBreakdown
) {
  const prompt = buildPrompt(responses, scores)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `Eres un consultor experto en transformación digital para pequeñas y medianas empresas en México,
        específicamente en Acámbaro, Guanajuato. Tu objetivo es proporcionar diagnósticos precisos y planes de acción
        prácticos, considerando el contexto económico local y las herramientas disponibles para empresas con recursos limitados.
        Responde siempre en español y en formato JSON válido.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 4000,
  })

  const content = completion.choices[0].message.content
  if (!content) throw new Error('No response from OpenAI')

  const result = JSON.parse(content)
  return {
    ...result,
    tokens_used: completion.usage?.total_tokens ?? 0,
  }
}

function buildPrompt(responses: Partial<DiagnosticResponses>, scores: ScoreBreakdown): string {
  const levelMap = { inicial: 'INICIAL (0-40)', intermedio: 'INTERMEDIO (41-70)', avanzado: 'AVANZADO (71-100)' }

  return `
Genera un reporte completo de diagnóstico digital para la siguiente empresa:

DATOS DE LA EMPRESA:
- Nombre: ${responses.business_name || 'No especificado'}
- Sector: ${responses.business_sector || 'No especificado'}
- Tamaño: ${responses.business_size || 'No especificado'}
- Años operando: ${responses.years_operating || 'No especificado'}
- Empleados: ${responses.employees_count || 'No especificado'}
- Ingresos anuales: ${responses.annual_revenue || 'No especificado'}

PRESENCIA DIGITAL (${scores.presencia_digital}/100):
- Tiene sitio web: ${responses.has_website ? 'Sí' : 'No'}
- Redes sociales: ${responses.has_social_media ? responses.social_media_platforms?.join(', ') : 'No'}
- Google My Business: ${responses.has_google_my_business ? 'Sí' : 'No'}
- Tienda en línea: ${responses.has_online_store ? 'Sí' : 'No'}

VENTAS Y MARKETING (${scores.ventas_marketing}/100):
- Publicidad digital: ${responses.uses_digital_advertising ? responses.advertising_platforms?.join(', ') : 'No'}
- Presupuesto marketing: ${responses.monthly_marketing_budget || 'No especificado'}
- Usa CRM: ${responses.uses_crm ? 'Sí' : 'No'}
- Email marketing: ${responses.uses_email_marketing ? 'Sí' : 'No'}
- Mide métricas: ${responses.tracks_metrics ? 'Sí' : 'No'}

USO DE IA (${scores.uso_ia}/100):
- Conoce sobre IA: ${responses.knows_about_ai ? 'Sí' : 'No'}
- Usa herramientas IA: ${responses.uses_ai_tools ? responses.ai_tools_used?.join(', ') : 'No'}
- Interés en IA: ${responses.ai_interest_level || 'No especificado'}

PUNTUACIÓN GENERAL: ${scores.total}/100 - NIVEL ${levelMap[scores.level]}

Genera el reporte en este formato JSON exacto:
{
  "executive_summary": "Párrafo ejecutivo de 3-4 oraciones sobre el estado digital de la empresa y su potencial",
  "strengths": ["fortaleza 1", "fortaleza 2", "fortaleza 3"],
  "opportunities": ["oportunidad 1", "oportunidad 2", "oportunidad 3"],
  "recommendations": [
    {
      "title": "título corto",
      "description": "descripción detallada de 2 oraciones",
      "impact": "alto|medio|bajo",
      "effort": "bajo|medio|alto",
      "priority": 1,
      "category": "presencia_digital|marketing|ia|ventas|operaciones",
      "tools": ["herramienta1", "herramienta2"]
    }
  ],
  "action_plan_90_days": [
    {
      "week": "Semanas 1-2",
      "title": "título de la acción",
      "description": "qué hacer exactamente en 2 oraciones",
      "impact": "alto|medio|bajo",
      "cost": "gratuito|bajo|medio|alto",
      "category": "categoría"
    }
  ],
  "radar_data": {
    "presencia_digital": ${scores.presencia_digital},
    "ventas_marketing": ${scores.ventas_marketing},
    "uso_ia": ${scores.uso_ia},
    "tecnologia": <calcula entre 0-100>,
    "operaciones": <calcula entre 0-100>
  }
}

Incluye exactamente 5 recomendaciones priorizadas por impacto y 6 elementos en el plan de 90 días (cubriendo semanas 1-2, 3-4, 5-6, 7-8, 9-10, 11-12).
Sé específico, práctico y considera el contexto de una empresa en Acámbaro, Guanajuato.
`
}
