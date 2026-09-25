import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight, BarChart3, Brain, CheckCircle, Globe,
  LineChart, Rocket, Shield, Users
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-navy flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[#0f2557] text-lg">Acámbaro Impulsa IA</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="text-gray-600 hover:text-[#0f2557] text-sm font-medium transition-colors">Cómo funciona</a>
              <a href="#beneficios" className="text-gray-600 hover:text-[#0f2557] text-sm font-medium transition-colors">Beneficios</a>
            </div>
            <Link href="/diagnostic">
              <Button className="gradient-navy text-white border-0 hover:opacity-90">Comenzar diagnóstico</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="gradient-hero pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 px-4 py-1.5 text-sm">
              🚀 Impulsado por Inteligencia Artificial
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transforma tu negocio con{' '}
              <span className="text-blue-300">Inteligencia Artificial</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Descubre el nivel de madurez digital de tu empresa y recibe un plan de transformación personalizado generado con IA en minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic">
                <Button size="lg" className="bg-white text-[#0f2557] hover:bg-blue-50 font-semibold px-8 py-6 text-base shadow-xl">
                  Realizar diagnóstico gratuito
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#como-funciona">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-base">
                  Ver cómo funciona
                </Button>
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-blue-100 text-sm">
              {['100% Gratuito', 'Resultados en 5 minutos', 'Plan personalizado con IA'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-300" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-[#1e3a8a] border-blue-200">Proceso simple</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f2557] mb-4">Cómo funciona Acámbaro Impulsa IA</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">En 4 pasos sencillos obtendrás un diagnóstico completo y un plan de transformación digital adaptado a tu empresa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Completa el formulario', description: 'Responde preguntas sobre tu negocio, presencia digital y uso de tecnología en menos de 5 minutos.', icon: Users },
              { step: '02', title: 'Calculamos tu score', description: 'Nuestro algoritmo evalúa tu madurez digital en 3 dimensiones clave y te asigna un nivel de madurez.', icon: BarChart3 },
              { step: '03', title: 'IA genera tu plan', description: 'La IA analiza tus resultados y crea un diagnóstico ejecutivo y plan de 90 días personalizado.', icon: Brain },
              { step: '04', title: 'Implementa y crece', description: 'Recibe recomendaciones priorizadas y comienza a transformar tu negocio inmediatamente.', icon: Rocket },
            ].map((item, i) => (
              <Card key={i} className="border-2 hover:border-[#1e3a8a] transition-colors group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-100 mb-2">{item.step}</div>
                  <h3 className="font-semibold text-[#0f2557] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-[#1e3a8a] border-blue-200">Análisis completo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f2557] mb-4">Áreas que evaluamos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Presencia Digital', desc: 'Sitio web, redes sociales, Google My Business, tienda en línea y visibilidad en internet.', items: ['Sitio web profesional', 'Redes sociales activas', 'Google My Business', 'E-commerce'], color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: LineChart, title: 'Ventas y Marketing', desc: 'Estrategias de marketing digital, publicidad, CRM y medición de resultados.', items: ['Publicidad digital', 'Email marketing', 'CRM y automatización', 'Métricas y KPIs'], color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { icon: Brain, title: 'Uso de IA', desc: 'Adopción de herramientas de inteligencia artificial y automatización en el negocio.', items: ['Chatbots e IA', 'Automatización', 'Análisis predictivo', 'Herramientas IA'], color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((area) => (
              <Card key={area.title} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-xl ${area.bg} flex items-center justify-center mb-6`}>
                    <area.icon className={`w-6 h-6 ${area.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f2557] mb-3">{area.title}</h3>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">{area.desc}</p>
                  <ul className="space-y-2">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className={`w-4 h-4 ${area.color} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-hero py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-12 h-12 text-blue-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Comienza tu transformación digital hoy</h2>
          <p className="text-blue-100 text-lg mb-10">El diagnóstico es completamente gratuito.</p>
          <Link href="/diagnostic">
            <Button size="lg" className="bg-white text-[#0f2557] hover:bg-blue-50 font-semibold px-10 py-6 text-base shadow-xl">
              Realizar diagnóstico gratuito
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-6 text-blue-200 text-sm">Sin registro. Sin costo. Resultados inmediatos.</p>
        </div>
      </section>

      <footer className="bg-[#0f2557] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Acámbaro Impulsa IA</span>
            </div>
            <p className="text-blue-200 text-sm text-center">Acámbaro, Guanajuato, México · Transformación digital para PyMEs</p>
            <p className="text-blue-300 text-xs">© {new Date().getFullYear()} Acámbaro Impulsa IA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
