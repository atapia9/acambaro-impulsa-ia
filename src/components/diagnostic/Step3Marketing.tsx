'use client'

import { useDiagnosticStore } from '@/store/diagnostic'
import { Label } from '@/components/ui/label'

const AD_PLATFORMS = ['Facebook/Instagram Ads', 'Google Ads', 'TikTok Ads', 'WhatsApp', 'Email', 'SMS']
const BUDGETS = ['Nada (no invierto)', 'Menos de $1,000/mes', '$1,000 - $5,000/mes', '$5,000 - $20,000/mes', 'Más de $20,000/mes']

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

export function Step3Marketing() {
  const { responses, updateResponses } = useDiagnosticStore()
  const u = (key: string, val: unknown) => updateResponses({ [key]: val } as Parameters<typeof updateResponses>[0])

  const togglePlatform = (platform: string) => {
    const current = responses.advertising_platforms || []
    const updated = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform]
    u('advertising_platforms', updated)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <YesNo
          label="¿Haces publicidad digital pagada?"
          description="Anuncios en Facebook, Google, TikTok u otras plataformas"
          value={responses.uses_digital_advertising}
          onChange={(v) => u('uses_digital_advertising', v)}
        />

        {responses.uses_digital_advertising && (
          <div className="pl-4 border-l-2 border-blue-200 space-y-2">
            <Label>¿En qué plataformas? (selecciona todas)</Label>
            <div className="flex flex-wrap gap-2">
              {AD_PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    (responses.advertising_platforms || []).includes(p)
                      ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Presupuesto mensual en marketing digital</Label>
        <div className="space-y-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => u('monthly_marketing_budget', b === 'Nada (no invierto)' ? 'nada' : b)}
              className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-all ${
                responses.monthly_marketing_budget === (b === 'Nada (no invierto)' ? 'nada' : b)
                  ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a] font-medium'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <YesNo
        label="¿Usas algún CRM o sistema para gestionar clientes?"
        description="HubSpot, Salesforce, Excel, WhatsApp listas, etc."
        value={responses.uses_crm}
        onChange={(v) => u('uses_crm', v)}
      />

      <YesNo
        label="¿Haces campañas de email marketing?"
        description="Newsletters o correos masivos a tus clientes"
        value={responses.uses_email_marketing}
        onChange={(v) => u('uses_email_marketing', v)}
      />

      <YesNo
        label="¿Mides el rendimiento de tus acciones de marketing?"
        description="Revisas métricas, estadísticas o resultados de tus campañas"
        value={responses.tracks_metrics}
        onChange={(v) => u('tracks_metrics', v)}
      />
    </div>
  )
}
