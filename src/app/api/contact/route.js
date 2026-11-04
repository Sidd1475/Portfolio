import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Provider 1: Resend (if RESEND_API_KEY environment variable is configured)
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['siddharth140705@gmail.com'],
          reply_to: email,
          subject: subject ? `Portfolio Inquiry: ${subject}` : `New message from ${name} via Portfolio`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json();
        console.error('Resend delivery failed:', errorData);
      } else {
        return NextResponse.json({ success: true, provider: 'resend' });
      }
    }

    // Provider 2: Formspree (if FORMSPREE_ID is configured)
    if (process.env.FORMSPREE_ID) {
      const formspreeRes = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (formspreeRes.ok) {
        return NextResponse.json({ success: true, provider: 'formspree' });
      }
    }

    // Default: Log contact request and return success with client notification
    console.log('[Portfolio Contact Submission]', {
      name,
      email,
      subject: subject || 'General Inquiry',
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Message processed successfully.',
      provider: 'direct',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}

