import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid email.' }, { status: 400 });
    }

    const mcUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
    if (!mcUrl) {
      return NextResponse.json({ success: false, message: 'Not configured.' }, { status: 500 });
    }

    const url = new URL(mcUrl.replace('/post?', '/post-json?'));
    url.searchParams.delete('f_id');
    url.searchParams.set('EMAIL', email);
    url.searchParams.set('c', '_');

    const res = await fetch(url.toString());
    const text = await res.text();

    // Mailchimp returns JSONP: _( {...} )
    const json = JSON.parse(text.replace(/^[^(]+\(/, '').replace(/\);?\s*$/, ''));

    if (json.result === 'success') {
      return NextResponse.json({ success: true });
    }

    const msg = typeof json.msg === 'string' && json.msg.includes('already')
      ? 'That email is already subscribed.'
      : 'Something went wrong. Please try again.';

    return NextResponse.json({ success: false, message: msg });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to subscribe. Please try again.' }, { status: 500 });
  }
}
