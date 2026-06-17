import { DashboardClient } from '@/components/dashboard/DashboardClient'

export default function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  return <DashboardClient paramsPromise={params} />
}
