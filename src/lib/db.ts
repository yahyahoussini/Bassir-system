import { createClient } from '@/lib/supabase/server';
import type { Product, Post, FAQ, Review, SeoMeta, Locale } from '@/types';

// ============================================
// PRODUCTS
// ============================================
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    if (error) { console.error('getProducts error:', error); return []; }
    return data ?? [];
  } catch (e) {
    console.error('getProducts crash:', e);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (error) return null;
    return data;
  } catch (e) {
    console.error('getProductBySlug crash:', e);
    return null;
  }
}

// ============================================
// POSTS (BLOG)
// ============================================
export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) { console.error('getPosts error:', error); return []; }
    return data ?? [];
  } catch (e) {
    console.error('getPosts crash:', e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (error) return null;
    return data;
  } catch (e) {
    console.error('getPostBySlug crash:', e);
    return null;
  }
}

// ============================================
// FAQs
// ============================================
export async function getFAQs(pageSlug: string, locale: Locale): Promise<FAQ[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('locale', locale)
      .order('sort_order', { ascending: true });
    if (error) { console.error('getFAQs error:', error); return []; }
    return data ?? [];
  } catch (e) {
    console.error('getFAQs crash:', e);
    return [];
  }
}

// ============================================
// REVIEWS
// ============================================
export async function getReviews(limit?: number): Promise<Review[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('reviews')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) { console.error('getReviews error:', error); return []; }
    return data ?? [];
  } catch (e) {
    console.error('getReviews crash:', e);
    return [];
  }
}

// ============================================
// SEO META OVERRIDES
// ============================================
export async function getSeoMeta(pageSlug: string, locale: Locale): Promise<SeoMeta | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('seo_meta')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('locale', locale)
      .single();
    if (error) return null;
    return data;
  } catch (e) {
    console.error('getSeoMeta crash:', e);
    return null;
  }
}

// ============================================
// LEAD SUBMISSION (client-side)
// ============================================
export async function submitLead(lead: {
  first_name: string;
  phone: string;
  city: string;
  business_type: string;
  message?: string;
  source_page?: string;
}) {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error('Failed to submit lead');
  return res.json();
}

// ============================================
// PAGE VIEW TRACKING (client-side)
// ============================================
export async function trackPageView(data: {
  page_slug: string;
  locale: string;
  referrer?: string;
  device?: string;
}) {
  await fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {});
}
