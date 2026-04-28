import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ua = request.headers.get('user-agent') || '';
    const device = ua.includes('Mobile') ? 'mobile' : ua.includes('Tablet') ? 'tablet' : 'desktop';

    const supabase = createClient();
    await supabase.from('page_views').insert([{
      page_slug: body.page_slug,
      locale: body.locale || 'fr',
      referrer: body.referrer || request.headers.get('referer') || null,
      user_agent: ua,
      device,
      country: 'MA',
      session_id: body.session_id || null,
    }]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
