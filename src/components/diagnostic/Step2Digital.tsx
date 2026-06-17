'use client'

import { useDiagnosticStore } from '@/store/diagnostic'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'TikTok', 'WhatsApp Business', 'Twitter/X', 'LinkedIn', 'YouTube']

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

export function Step2Digital() {
  const { responses, updateResponses } = useDiagnosticStore()
  const u = (key: string, val: unknown) => updateResponses({ [key]: val } as Parameters<typeof updateResponses>[0])

  const togglePlatform = (platform: string) => {
    const current = responses.social_media_platforms || []
    const updated = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform]
    u('social_media_platforms', updated)
  }

  return (
    <div className="space-y-6">
      <YesNo
        label="¿Tienes un sitio web?"
        description="Página web propia donde los clientes puedan encontrar tu negocio"
        value={responses.has_website}
        onChange={(v) => u('has_website', v)}
      />

      {responses.has_website && (
        <div className="space-y-2 pl-4 border-l-2 border-blue-200">
          <Label htmlFor="website_url">URL de tu sitio web</Label>
          <Input
            id="website_url"
            placeholder="www.tunegocio.com"
            value={responses.website_url || ''}
            onChange={(e) => u('website_url', e.target.value)}
          />
        </div>
      )}

      <div className="space-y-3">
        <YesNo
          label="¿Tienes presencia en redes sociales?"
          value={responses.has_social_media}
          onChange={(v) => u('has_social_media', v)}
        />

        {responses.has_social_media && (
          <div className="pl-4 border-l-2 border-blue-200 space-y-2">
            <Label>¿En cuáles redes sociales? (selecciona todas)</Label>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    (responses.social_media_platforms || []).includes(p)
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

      <YesNo
        label="¿Tienes ficha en Google My Business?"
        description="Perfil de empresa en Google Maps para que los clientes te encuentren"
        value={responses.has_google_my_business}
        onChange={(v) => u('has_google_my_business', v)}
      />

      <YesNo
        label="¿Tienes tienda en línea o vendes por internet?"
        description="E-commerce, Mercado Libre, Amazon, WhatsApp, etc."
        value={responses.has_online_store}
        onChange={(v) => u('has_online_store', v)}
      />
    </div>
  )
}
