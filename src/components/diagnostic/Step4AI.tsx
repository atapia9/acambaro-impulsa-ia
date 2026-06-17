'use client'

import { useDiagnosticStore } from '@/store/diagnostic'
import { Label } from '@/components/ui/label'

const AI_TOOLS = [
  'ChatGPT / Claude', 'Canva IA', 'Midjourney / DALL-E', 'Copilot de Microsoft',
  'Gemini de Google', 'Chatbots para atención', 'Automatización con IA', 'Herramientas de análisis'
]

const INTEREST_LEVELS = [
  { value: 'none', label: '😐 No me interesa por ahora' },
  { value: 'low', label: '🤔 Me interesa pero no sé por dónde empezar' },
  { value: 'medium', label: '👍 Estoy dispuesto a implementarla' },
  { value: 'high', label: '🚀 Quiero adoptarla cuanto antes' },
]

function YesNo({ label, value, onChange, description }: {
  label: string
  value: boolean | undefined
  onChange: (v: boolean) => void
  description?: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && <p className="text-xs text-gray-400">{description}</p>}
      <div className="flex gap-3">
        {[{ val: true, label: '✅ Sí' }, { val: false, label: '❌ No' }].map((opt) => (
          <button
            key={String(opt.val)}
            type="button"
            onClick={() => onChange(opt.val)}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              value === opt.val
                ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Step4AI() {
  const { responses, updateResponses } = useDiagnosticStore()
  const u = (key: string, val: unknown) => updateResponses({ [key]: val } as Parameters<typeof updateResponses>[0])

  const toggleTool = (tool: string) => {
    const current = responses.ai_tools_used || []
    const updated = current.includes(tool)
      ? current.filter((t) => t !== tool)
      : [...current, tool]
    u('ai_tools_used', updated)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 text-sm text-[#1e3a8a]">
        💡 La inteligencia artificial ya está disponible para negocios de todos los tamaños. Sé honesto con tus respuestas para obtener las mejores recomendaciones.
      </div>

      <YesNo
        label="¿Conoces sobre herramientas de Inteligencia Artificial?"
        description="ChatGPT, Copilot, Gemini, IA generativa, etc."
        value={responses.knows_about_ai}
        onChange={(v) => u('knows_about_ai', v)}
      />

      <div className="space-y-3">
        <YesNo
          label="¿Usas alguna herramienta de IA en tu negocio actualmente?"
          value={responses.uses_ai_tools}
          onChange={(v) => u('uses_ai_tools', v)}
        />

        {responses.uses_ai_tools && (
          <div className="pl-4 border-l-2 border-blue-200 space-y-2">
            <Label>¿Cuáles herramientas usas? (selecciona todas)</Label>
            <div className="grid grid-cols-2 gap-2">
              {AI_TOOLS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTool(t)}
                  className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                    (responses.ai_tools_used || []).includes(t)
                      ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>¿Cuál es tu interés en adoptar IA en tu negocio?</Label>
        <div className="space-y-2">
          {INTEREST_LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              type="button"
              onClick={() => u('ai_interest_level', lvl.value)}
              className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${
                responses.ai_interest_level === lvl.value
                  ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a] font-medium'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
