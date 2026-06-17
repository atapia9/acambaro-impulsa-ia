-- =============================================
-- Acámbaro Impulsa IA - Supabase Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS (extends Supabase auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COMPANIES
-- =============================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  size TEXT NOT NULL CHECK (size IN ('micro', 'pequeña', 'mediana')),
  city TEXT NOT NULL DEFAULT 'Acámbaro',
  state TEXT NOT NULL DEFAULT 'Guanajuato',
  years_operating INTEGER,
  website TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- DIAGNOSTICS
-- =============================================
CREATE TABLE IF NOT EXISTS public.diagnostics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'failed')),

  -- Step 1: Business Data
  business_name TEXT,
  business_sector TEXT,
  business_size TEXT,
  years_operating INTEGER,
  employees_count INTEGER,
  annual_revenue TEXT,

  -- Step 2: Digital Presence
  has_website BOOLEAN DEFAULT FALSE,
  website_url TEXT,
  has_social_media BOOLEAN DEFAULT FALSE,
  social_media_platforms TEXT[],
  has_google_my_business BOOLEAN DEFAULT FALSE,
  has_online_store BOOLEAN DEFAULT FALSE,
  digital_presence_score INTEGER DEFAULT 0,

  -- Step 3: Sales & Marketing
  uses_digital_advertising BOOLEAN DEFAULT FALSE,
  advertising_platforms TEXT[],
  monthly_marketing_budget TEXT,
  uses_crm BOOLEAN DEFAULT FALSE,
  uses_email_marketing BOOLEAN DEFAULT FALSE,
  tracks_metrics BOOLEAN DEFAULT FALSE,
  sales_marketing_score INTEGER DEFAULT 0,

  -- Step 4: AI Usage
  knows_about_ai BOOLEAN DEFAULT FALSE,
  uses_ai_tools BOOLEAN DEFAULT FALSE,
  ai_tools_used TEXT[],
  ai_interest_level TEXT CHECK (ai_interest_level IN ('none', 'low', 'medium', 'high')),
  ai_score INTEGER DEFAULT 0,

  -- Scores
  total_score INTEGER DEFAULT 0,
  maturity_level TEXT CHECK (maturity_level IN ('inicial', 'intermedio', 'avanzado')),

  -- Responses (raw JSON)
  responses JSONB DEFAULT '{}',

  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- REPORTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  diagnostic_id UUID REFERENCES public.diagnostics(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,

  -- AI Generated Content
  executive_summary TEXT,
  action_plan_90_days JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  strengths JSONB DEFAULT '[]',
  opportunities JSONB DEFAULT '[]',

  -- Radar chart data
  radar_data JSONB DEFAULT '{}',

  -- Metadata
  model_used TEXT DEFAULT 'gpt-4o-mini',
  tokens_used INTEGER,
  generation_time_ms INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Companies policies
CREATE POLICY "Users can CRUD own companies" ON public.companies
  FOR ALL USING (auth.uid() = user_id);

-- Diagnostics policies
CREATE POLICY "Users can CRUD own diagnostics" ON public.diagnostics
  FOR ALL USING (auth.uid() = user_id);

-- Reports policies
CREATE POLICY "Users can view own reports" ON public.reports
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can manage reports" ON public.reports
  FOR ALL USING (true);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_companies_updated_at BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_diagnostics_updated_at BEFORE UPDATE ON public.diagnostics
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_reports_updated_at BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON public.companies(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostics_company_id ON public.diagnostics(company_id);
CREATE INDEX IF NOT EXISTS idx_diagnostics_user_id ON public.diagnostics(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_diagnostic_id ON public.reports(diagnostic_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
