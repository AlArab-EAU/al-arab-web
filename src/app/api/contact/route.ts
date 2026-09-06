import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact API endpoint — receives form submissions and sends:
 * 1. A notification email to the AlArab team
 * 2. An auto-reply email to the submitter
 *
 * Uses Resend API. The from email must use a verified domain.
 * Until alarab-defi.com is verified in Resend, uses onboarding@resend.dev
 * as the from address, and sends notifications to alarab.gcr@gmail.com
 * (the account owner email).
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

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.log('📧 Contact form (no RESEND_API_KEY):', body)
      return NextResponse.json({
        success: true,
        message: 'Your message has been received. We will contact you soon.',
      })
    }

    // Until alarab-defi.com domain is verified in Resend,
    // we use onboarding@resend.dev as from address
    // and send to the account owner email (alarab.gcr@gmail.com)
    const FROM_EMAIL = 'onboarding@resend.dev'
    const TEAM_EMAIL = 'alarab.gcr@gmail.com' // Resend account owner

    // 1. Send notification email to the team
    const notificationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TEAM_EMAIL,
        replyTo: body.email, // Reply to the submitter
        subject: `[AlArab Contact] ${body.interest} — ${body.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f0f1a;">
            <h2 style="color: #d4af37; text-align: center; letter-spacing: 3px;">AL ARAB</h2>
            <p style="color: #94a3b8; text-align: center; margin-top: 0;">New contact form submission</p>
            <div style="background: #1a1a2e; padding: 25px; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2); margin-top: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #d4af37; width: 100px;">Name:</td><td style="padding: 8px 0; color: #f4e9c9;">${body.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #d4af37;">Company:</td><td style="padding: 8px 0; color: #f4e9c9;">${body.company || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #d4af37;">Email:</td><td style="padding: 8px 0; color: #f4e9c9;">${body.email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #d4af37;">Interest:</td><td style="padding: 8px 0; color: #f4e9c9;">${body.interest}</td></tr>
              </table>
              <h3 style="color: #d4af37; margin-top: 20px;">Message:</h3>
              <p style="background: rgba(212,175,55,0.08); padding: 15px; border-radius: 8px; color: #f4e9c9; white-space: pre-wrap; border: 1px solid rgba(212,175,55,0.1);">${body.message}</p>
            </div>
            <p style="color: #5d7ba8; font-size: 12px; text-align: center; margin-top: 20px;">
              Reply directly to this email to respond to ${body.name} at ${body.email}
            </p>
          </div>
        `,
      }),
    })

    const notifData = await notificationResponse.json()

    if (!notificationResponse.ok) {
      console.error('Notification email failed:', notifData)
      // Still return success to the user — we don't want to expose email errors
    }

    // 2. Try to send auto-reply to the submitter
    // Note: This will work once alarab-defi.com is verified in Resend
    // For now, it may fail for non-owner emails, which is OK
    try {
      await fetch('https://api.resend.com/emails', {
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
                <div style="margin-top: 25px; padding: 15px; background: rgba(139,92,246,0.08); border-radius: 8px; border: 1px solid rgba(139,92,246,0.15);">
                  <p style="color: #8b5cf6; margin: 0; font-size: 13px;">Your message summary:</p>
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
    } catch (autoReplyError) {
      // Auto-reply may fail if domain not verified yet — that's OK
      console.log('Auto-reply skipped (domain not verified yet)')
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
