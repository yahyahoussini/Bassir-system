import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, phone, city, business_type, message, source_page } = body;

    if (!first_name || !phone || !city || !business_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase.from('leads').insert([{
      first_name,
      phone,
      city,
      business_type,
      message: message || null,
      source_page: source_page || request.headers.get('referer') || null,
      status: 'nouveau',
    }]).select().single();

    if (error) {
      console.error('Lead insert error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Send WhatsApp notification to admin
    const waMessage = `🔔 *Nouvelle demande de démo*\n\n👤 *Nom:* ${first_name}\n📱 *Téléphone:* ${phone}\n📍 *Ville:* ${city}\n🏪 *Commerce:* ${business_type}${message ? `\n💬 *Message:* ${message}` : ''}\n\n_Via bassir-system.ma_`;

    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    return NextResponse.json({ success: true, id: data.id, whatsappUrl }, { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
