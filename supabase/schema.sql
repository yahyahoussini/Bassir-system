-- ============================================
-- BASSIR SYSTEM — Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- LEADS TABLE — all contact/demo form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  business_type TEXT NOT NULL,
  message TEXT,
  source_page TEXT,
  status TEXT DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'contacte', 'converti', 'archive')),
  notes TEXT,
  contacted_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ
);

-- ============================================
-- CLIENTS TABLE — registered Bassir clients
-- ============================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  licence_key TEXT UNIQUE,
  licence_status TEXT DEFAULT 'active' CHECK (licence_status IN ('active', 'inactive', 'suspended')),
  activated_at TIMESTAMPTZ,
  software_version TEXT DEFAULT '1.0.0',
  notes TEXT
);

-- ============================================
-- SUPPORT TICKETS
-- ============================================
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'ouvert' CHECK (status IN ('ouvert', 'en_cours', 'resolu', 'ferme')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('faible', 'normal', 'urgent')),
  resolved_at TIMESTAMPTZ,
  admin_response TEXT
);

-- ============================================
-- PRODUCTS TABLE — dynamic product pages
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  published BOOLEAN DEFAULT false,
  category TEXT NOT NULL CHECK (category IN ('logiciel', 'materiel', 'rfid', 'accessoire')),
  -- French content
  title_fr TEXT NOT NULL,
  description_fr TEXT,
  content_fr TEXT,
  meta_title_fr TEXT,
  meta_description_fr TEXT,
  -- Arabic content
  title_ar TEXT,
  description_ar TEXT,
  content_ar TEXT,
  meta_title_ar TEXT,
  meta_description_ar TEXT,
  -- Media
  hero_image TEXT,
  gallery JSONB DEFAULT '[]',
  -- Schema data
  brand TEXT DEFAULT 'Bassir System',
  sku TEXT,
  features JSONB DEFAULT '[]',
  specs JSONB DEFAULT '{}',
  sort_order INTEGER DEFAULT 0
);

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  slug TEXT UNIQUE NOT NULL,
  published BOOLEAN DEFAULT false,
  category TEXT,
  reading_time INTEGER DEFAULT 5,
  -- French
  title_fr TEXT NOT NULL,
  excerpt_fr TEXT,
  content_fr TEXT,
  meta_title_fr TEXT,
  meta_description_fr TEXT,
  -- Arabic
  title_ar TEXT,
  excerpt_ar TEXT,
  content_ar TEXT,
  meta_title_ar TEXT,
  meta_description_ar TEXT,
  -- Media
  cover_image TEXT,
  og_image TEXT,
  -- SEO
  focus_keyword TEXT,
  related_posts JSONB DEFAULT '[]'
);

-- ============================================
-- FAQ TABLE — per page, feeds AEO / AI engines
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  page_slug TEXT NOT NULL,
  locale TEXT DEFAULT 'fr' CHECK (locale IN ('fr', 'ar')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_priority BOOLEAN DEFAULT false
);

-- ============================================
-- SEO META OVERRIDES — per page control
-- ============================================
CREATE TABLE IF NOT EXISTS seo_meta (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  page_slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'fr',
  meta_title TEXT,
  meta_description TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  robots TEXT DEFAULT 'index,follow',
  schema_type TEXT,
  UNIQUE(page_slug, locale)
);

-- ============================================
-- PAGE ANALYTICS — custom lightweight tracking
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  page_slug TEXT NOT NULL,
  locale TEXT DEFAULT 'fr',
  referrer TEXT,
  user_agent TEXT,
  country TEXT DEFAULT 'MA',
  city TEXT,
  device TEXT CHECK (device IN ('desktop', 'mobile', 'tablet')),
  session_id TEXT
);

-- ============================================
-- TESTIMONIALS / REVIEWS
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  client_name TEXT NOT NULL,
  business_name TEXT,
  city TEXT,
  business_type TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_fr TEXT NOT NULL,
  review_ar TEXT,
  whatsapp_screenshot TEXT,
  published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- ============================================
-- KEYWORD TRACKER
-- ============================================
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  keyword TEXT NOT NULL,
  locale TEXT DEFAULT 'fr',
  position INTEGER,
  url TEXT,
  impressions INTEGER,
  clicks INTEGER,
  ctr DECIMAL(5,2),
  recorded_at DATE DEFAULT CURRENT_DATE
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Leads: only authenticated admin can read/write
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin only" ON leads FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);
-- Allow anonymous insert (form submissions)
CREATE POLICY "Anyone can submit lead" ON leads FOR INSERT WITH CHECK (true);

-- Products: published ones readable by all
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published products" ON products FOR SELECT USING (published = true);
CREATE POLICY "Admin manages products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Posts: same as products
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Admin manages posts" ON posts FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- FAQs: public read
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Admin manages faqs" ON faqs FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- SEO meta: public read
ALTER TABLE seo_meta ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read seo_meta" ON seo_meta FOR SELECT USING (true);
CREATE POLICY "Admin manages seo_meta" ON seo_meta FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Page views: allow anonymous insert, admin reads
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log pageview" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reads analytics" ON page_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Reviews: public reads published
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published reviews" ON reviews FOR SELECT USING (published = true);
CREATE POLICY "Admin manages reviews" ON reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_published ON products(published, category);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX idx_faqs_page ON faqs(page_slug, locale);
CREATE INDEX idx_seo_page ON seo_meta(page_slug, locale);
CREATE INDEX idx_pageviews_slug ON page_views(page_slug, created_at DESC);
CREATE INDEX idx_keywords_date ON keyword_rankings(recorded_at DESC, keyword);

-- ============================================
-- SEED: Initial FAQ data for homepage
-- ============================================
INSERT INTO faqs (page_slug, locale, question, answer, sort_order, is_priority) VALUES
('home', 'fr', 'Est-ce que Bassir System est disponible partout au Maroc ?', 'Oui. Nous installons et assurons le support partout au Maroc — Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir et toutes les autres villes. Un seul appel suffit : 06 61 41 55 78.', 1, true),
('home', 'fr', 'Y a-t-il un abonnement mensuel ?', 'Non. Bassir System fonctionne avec une licence perpétuelle. Vous payez une seule fois et utilisez le logiciel à vie, sans aucun frais récurrent.', 2, true),
('home', 'fr', 'Le logiciel est-il en arabe ?', 'Oui. L interface est 100% en arabe, avec login sécurisé par code PIN. Ce n est pas un logiciel traduit — c est un logiciel conçu pour le commerce marocain.', 3, true),
('home', 'fr', 'Quels types de commerces utilisent Bassir System ?', 'Épiceries, supérettes, boucheries, hammams, piscines, salles de sport, pharmacies, et tout type de commerce de détail au Maroc.', 4, false),
('home', 'fr', 'Fonctionnez-vous pour les hammams et piscines ?', 'Oui. Nous proposons une solution RFID complète — bracelets, contrôle d accès, paiement cashless — intégrée au logiciel Bassir System.', 5, true),
('home', 'fr', 'Quel matériel fournissez-vous ?', 'Terminal double écran, imprimante thermique, tiroir-caisse, balance codes-barres Rongta, scanner de codes-barres, bracelets RFID et lecteur RFID USB. Installation et formation incluses.', 6, false),
('home', 'fr', 'Combien de temps prend l installation ?', 'L installation complète prend généralement une journée. Notre technicien se déplace chez vous, installe le matériel, configure le logiciel et vous forme sur place.', 7, false),
('home', 'fr', 'Que se passe-t-il si j ai un problème technique ?', 'Notre équipe de support est disponible par téléphone et WhatsApp. Réponse rapide, support humain — pas de bot. Nous sommes là même après l installation.', 8, false),
('home', 'ar', 'هل بصير سيستم متوفر في جميع أنحاء المغرب؟', 'نعم. نقوم بالتركيب والدعم في جميع أنحاء المغرب — الدار البيضاء، الرباط، مراكش، فاس، طنجة، أكادير وجميع المدن. اتصل بنا: 06 61 41 55 78', 1, true),
('home', 'ar', 'هل هناك اشتراك شهري؟', 'لا. بصير سيستم يعمل بترخيص مدى الحياة. تدفع مرة واحدة وتستخدم البرنامج للأبد بدون أي رسوم شهرية.', 2, true),
('home', 'ar', 'هل البرنامج باللغة العربية؟', 'نعم. الواجهة كاملة باللغة العربية مع تسجيل دخول بالرمز السري. ليس برنامجاً مترجماً — بل برنامج مصمم للتجارة المغربية.', 3, true);

-- ============================================
-- SEED: Initial products
-- ============================================
INSERT INTO products (slug, published, category, title_fr, description_fr, meta_title_fr, meta_description_fr, title_ar, description_ar, sort_order) VALUES
('terminal-double-ecran', true, 'materiel', 'Terminal Double Écran', 'Terminal POS double écran — écran caissier tactile + écran face client. Votre client voit son ticket en temps réel.', 'Terminal Double Écran POS | Bassir System Maroc', 'Terminal POS double écran installé partout au Maroc. Interface arabe, compatible Bassir System. Contactez-nous : 06 61 41 55 78', 'شاشة مزدوجة POS', 'طرفية نقطة البيع بشاشة مزدوجة', 1),
('imprimante-thermique', true, 'materiel', 'Imprimante Thermique', 'Imprimante thermique silencieuse, rapide, intégrée au logiciel Bassir System. Papier 80mm, fiable pour usage intensif.', 'Imprimante Thermique POS | Bassir System Maroc', 'Imprimante thermique POS intégrée au logiciel Bassir System. Ticket rapide, sans bruit. Installation partout au Maroc.', 'طابعة حرارية', 'طابعة حرارية صامتة وسريعة', 2),
('balance-codes-barres', true, 'materiel', 'Balance Codes-Barres', 'Balance Rongta RLS1000 connectée directement à Bassir System. Pesez, scannez, encaissez — zéro saisie manuelle.', 'Balance Codes-Barres Rongta | Bassir System Maroc', 'Balance codes-barres Rongta RLS1000 connectée au logiciel Bassir. Zéro erreur, prix automatique. Maroc.', 'ميزان باركود', 'ميزان باركود متصل ببرنامج بصير', 3),
('bracelet-rfid', true, 'rfid', 'Bracelets RFID', 'Bracelets RFID silicone NFC pour hammam, piscine et salle de sport. Accès contrôlé et paiement cashless intégré.', 'Bracelets RFID Hammam Piscine | Bassir System Maroc', 'Bracelets RFID pour hammam, piscine, salle de sport au Maroc. Accès contrôlé + paiement sans cash. Bassir System.', 'أسورة RFID', 'أسورة RFID للحمام والمسبح', 4),
('logiciel-pos', true, 'logiciel', 'Logiciel POS Bassir', 'Logiciel de caisse 100% arabe, licence à vie, sans abonnement. Conçu au Maroc pour les commerçants marocains.', 'Logiciel POS Arabe Maroc | Bassir System — Licence à Vie', 'Logiciel POS marocain avec interface 100% arabe et licence perpétuelle. Pas d abonnement. Installation partout au Maroc.', 'برنامج كاشير', 'برنامج كاشير مغربي 100% عربي', 0);
