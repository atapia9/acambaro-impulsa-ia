# Acámbaro Impulsa IA — Guía de Despliegue

## Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

## 1. Configurar Supabase

1. Ve a https://supabase.com y crea un proyecto
2. En el SQL Editor, ejecuta el archivo `supabase/schema.sql`
3. En Settings > API, copia:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Configurar OpenAI

1. Ve a https://platform.openai.com
2. Crea una API key → `OPENAI_API_KEY`
3. Asegúrate de tener créditos disponibles (usa gpt-4o-mini por eficiencia)

## 3. Despliegue en Vercel

```bash
# Instala Vercel CLI
npm i -g vercel

# En la carpeta del proyecto
vercel

# Agrega las variables de entorno en el dashboard de Vercel
# o con CLI:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_APP_URL

# Deploy a producción
vercel --prod
```

## 4. Desarrollo local

```bash
npm install
npm run dev
# Abre http://localhost:3000
```

## Nota: Modo Demo sin Supabase

La aplicación funciona en modo demo sin Supabase configurado.
Los diagnósticos y reportes de IA funcionan completamente.
Solo el guardado en base de datos es opcional.
