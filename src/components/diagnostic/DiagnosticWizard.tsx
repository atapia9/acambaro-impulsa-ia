'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, CheckCircle, Brain } from 'lucide-react'
import { useDiagnosticStore } from '@/store/diagnostic'
import { Step1Business } from './Step1Business'
import { Step2Digital } from './Step2Digital'
import { Step3Marketing } from './Step3Marketing'
import { Step4AI } from './Step4AI'
import { calculateScores } from '@/lib/scoring'

const STEPS = [
  { id: 0, title: 'Datos del negocio', description: 'Cuéntanos sobre tu empresa', icon: '🏢' },
  { id: 1, title: 'Presencia digital', description: '¿Cómo te encuentran tus clientes?', icon: '🌐' },
  { id: 2, title: 'Ventas y marketing', description: '¿Cómo llegas a más clientes?', icon: '📈' },
  { id: 3, title: 'Uso de IA', description: '¿Qué tan digital eres?', icon: '🤖' },
]

export function DiagnosticWizard() {
  const router = useRouter()
  const { currentStep, responses, nextStep, prevStep, updateResponses } = useDiagnosticStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = ((currentStep + 1) / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      nextStep()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const scores = calculateScores(responses)
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses, scores }),
      })

      if (!res.ok) throw new Error('Error al guardar el diagnóstico')
      const data = await res.json()
      toast.success('¡Diagnóstico completado! Generando tu plan personalizado...')
      router.push(`/dashboard/${data.diagnosticId}`)
    } catch (err) {
      toast.error('Error al procesar el diagnóstico. Intenta de nuevo.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepComponents = [
    <Step1Business key={0} />,
    <Step2Digital key={1} />,
    <Step3Marketing key={2} />,
    <Step4AI key={3} />,
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-6 h-6 text-[#1e3a8a]" />
          <h1 className="text-2xl font-bold text-[#0f2557]">Diagnóstico de Madurez Digital</h1>
        </div>
        <p className="text-gray-500">Completa los 4 pasos para recibir tu plan personalizado con IA</p>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-[#1e3a8a]">Paso {currentStep + 1} de {STEPS.length}</span>
          <span className="text-gray-400">{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step indicators */}
      <div className="grid grid-cols-4 gap-2">
        {STEPS.map((step, i) => (
          <div
            key={step.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              i === currentStep
                ? 'bg-[#0f2557] text-white'
                : i < currentStep
                ? 'bg-blue-50 text-[#1e3a8a]'
                : 'bg-gray-50 text-gray-400'
            }`}
          >
            <span className="text-lg">{i < currentStep ? '✓' : step.icon}</span>
            <span className="text-xs font-medium text-center leading-tight hidden sm:block">
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-[#0f2557] text-white text-sm px-3 py-1">
              {STEPS[currentStep].icon} Paso {currentStep + 1}
            </Badge>
          </div>
          <CardTitle className="text-xl text-[#0f2557]">{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {stepComponents[currentStep]}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        {currentStep < STEPS.length - 1 ? (
          <Button onClick={handleNext} className="gradient-navy text-white gap-2 hover:opacity-90">
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gradient-navy text-white gap-2 hover:opacity-90 px-6"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⟳</span>
                Generando diagnóstico...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Obtener mi diagnóstico
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
