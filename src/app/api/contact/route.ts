import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact API endpoint — receives form submissions and sends:
 * 1. A notification email to contact@Alarab-Defi.com
 * 2. An auto-reply email to the submitter
 *
 * Uses Resend (or similar) if API key is available,
 * otherwise falls back to a simple log + success response.
 */

interface ContactBody {
  name: string
  company?: string
  email: string
  interest: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const TO_EMAIL = 'contact@Alarab-Defi.com'
    const FROM_EMAIL = 'noreply@alarab-defi.com'

    // Try to send via Resend if API key is available
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      // Send notification email to contact@Alarab-Defi.com
      const notificationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: `[AlArab Contact] ${body.interest} — ${body.name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #d4af37;">Nuevo mensaje de contacto — AlArab</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Nombre:</td><td style="padding: 8px 0;">${body.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Empresa:</td><td style="padding: 8px 0;">${body.company || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td><td style="padding: 8px 0;">${body.email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Interés:</td><td style="padding: 8px 0;">${body.interest}</td></tr>
              </table>
              <h3 style="color: #333; margin-top: 20px;">Mensaje:</h3>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${body.message}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px;">Este mensaje fue enviado desde el formulario de contacto de alarab-defi.com</p>
            </div>
          `,
        }),
      })

      if (!notificationResponse.ok) {
        console.error('Failed to send notification email:', await notificationResponse.text())
      }

      // Send auto-reply to the submitter
      const autoReplyResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: body.email,
          subject: 'Thank you for contacting AlArab — We received your message',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f0f1a;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #d4af37; font-size: 28px; letter-spacing: 3px;">AL ARAB</h1>
                <p style="color: #94a3b8; font-size: 14px;">The Digital Future of the Arab World</p>
              </div>
              <div style="background: #1a1a2e; padding: 30px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2);">
                <h2 style="color: #f4e9c9; margin-top: 0;">Dear ${body.name},</h2>
                <p style="color: #94a3b8; line-height: 1.6;">
                  Thank you for reaching out to AlArab. We have received your message regarding
                  <strong style="color: #d4af37;">${body.interest}</strong> and our team will get back to you
                  within 24-48 hours.
                </p>
                <p style="color: #94a3b8; line-height: 1.6;">
                  Your inquiry is important to us. In the meantime, feel free to explore our ecosystem
                  at <a href="https://alarab-defi.com" style="color: #d4af37;">alarab-defi.com</a>.
                </p>
                <div style="margin-top: 25px; padding: 15px; background: rgba(212,175,55,0.08); border-radius: 8px; border: 1px solid rgba(212,175,55,0.15);">
                  <p style="color: #8b5cf6; margin: 0; font-size: 13px; font-weight: bold;">📋 Your message summary:</p>
                  <p style="color: #94a3b8; margin-top: 8px; font-size: 13px;">${body.message.substring(0, 200)}${body.message.length > 200 ? '...' : ''}</p>
                </div>
                <hr style="border: none; border-top: 1px solid rgba(212,175,55,0.1); margin: 20px 0;" />
                <p style="color: #94a3b8; font-size: 12px;">
                  Best regards,<br/>
                  <strong style="color: #d4af37;">AlArab Team</strong><br/>
                  contact@Alarab-Defi.com
                </p>
              </div>
            </div>
          `,
        }),
      })

      if (!autoReplyResponse.ok) {
        console.error('Failed to send auto-reply:', await autoReplyResponse.text())
      }
    } else {
      // No API key — log the message for development
      console.log('📧 Contact form submission (no email service configured):')
      console.log('  To:', TO_EMAIL)
      console.log('  From:', body.email)
      console.log('  Name:', body.name)
      console.log('  Company:', body.company || 'N/A')
      console.log('  Interest:', body.interest)
      console.log('  Message:', body.message)
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will contact you soon.',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
