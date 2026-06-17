'use client'

import { useDiagnosticStore } from '@/store/diagnostic'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const SECTORS = [
  'Comercio minorista', 'Restaurantes y alimentos', 'Servicios profesionales',
  'Manufactura', 'Construcción', 'Salud y bienestar', 'Educación',
  'Transporte', 'Turismo y hospitalidad', 'Tecnología', 'Agricultura', 'Otro'
]

const SIZES = [
  { value: 'micro', label: 'Micro (1-10 empleados)' },
  { value: 'pequeña', label: 'Pequeña (11-50 empleados)' },
  { value: 'mediana', label: 'Mediana (51-250 empleados)' },
]

const REVENUES = [
  'Menos de $500,000', '$500,000 - $2,000,000', '$2,000,000 - $10,000,000',
  '$10,000,000 - $50,000,000', 'Más de $50,000,000'
]

export function Step1Business() {
  const { responses, updateResponses } = useDiagnosticStore()
  const u = (key: string, val: unknown) => updateResponses({ [key]: val } as Parameters<typeof updateResponses>[0])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="business_name">Nombre del negocio *</Label>
          <Input
            id="business_name"
            placeholder="Ej. Panadería El Trigal"
            value={responses.business_name || ''}
            onChange={(e) => u('business_name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Sector o giro *</Label>
          <div className="grid grid-cols-2 gap-2">
            {SECTORS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => u('business_sector', s)}
                className={`text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                  responses.business_sector === s
                    ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a] font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tamaño de la empresa *</Label>
            <div className="space-y-2">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => u('business_size', s.value)}
                  className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${
                    responses.business_size === s.value
                      ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a] font-medium'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Años operando</Label>
            <Input
              id="years"
              type="number"
              min={0}
              max={100}
              placeholder="Ej. 5"
              value={responses.years_operating || ''}
              onChange={(e) => u('years_operating', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employees">Número de empleados</Label>
            <Input
              id="employees"
              type="number"
              min={1}
              placeholder="Ej. 8"
              value={responses.employees_count || ''}
              onChange={(e) => u('employees_count', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Ingresos anuales aproximados</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {REVENUES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => u('annual_revenue', r)}
              className={`text-left text-xs px-3 py-2.5 rounded-lg border transition-all ${
                responses.annual_revenue === r
                  ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a] font-medium'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
