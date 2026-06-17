'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DiagnosticResponses } from '@/types'

interface DiagnosticStore {
  currentStep: number
  responses: Partial<DiagnosticResponses>
  diagnosticId: string | null
  companyId: string | null
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateResponses: (data: Partial<DiagnosticResponses>) => void
  setDiagnosticId: (id: string) => void
  setCompanyId: (id: string) => void
  reset: () => void
}

export const useDiagnosticStore = create<DiagnosticStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      responses: {},
      diagnosticId: null,
      companyId: null,
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
      prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),
      updateResponses: (data) =>
        set((s) => ({ responses: { ...s.responses, ...data } })),
      setDiagnosticId: (id) => set({ diagnosticId: id }),
      setCompanyId: (id) => set({ companyId: id }),
      reset: () => set({ currentStep: 0, responses: {}, diagnosticId: null, companyId: null }),
    }),
    { name: 'diagnostic-store' }
  )
)
