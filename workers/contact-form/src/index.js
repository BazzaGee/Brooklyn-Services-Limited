/**
 * Contact Form Worker
 * Handles form submissions and forwards to email via Resend
 */

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders 
      });
    }

    try {
      const formData = await request.json();
      
      // Validate required fields
      const required = ['name', 'phone', 'address', 'service'];
      for (const field of required) {
        if (!formData[field] || formData[field].trim() === '') {
          return new Response(JSON.stringify({ 
            success: false, 
            error: `Missing required field: ${field}` 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
      }

      // Prepare email content
      const emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(formData.phone)}</p>
        <p><strong>Email:</strong> ${formData.email ? escapeHtml(formData.email) : 'Not provided'}</p>
        <p><strong>Address:</strong> ${escapeHtml(formData.address)}</p>
        <p><strong>Service:</strong> ${escapeHtml(formData.service)}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message ? escapeHtml(formData.message).replace(/\n/g, '<br>') : 'No message provided'}</p>
        <hr>
        <p><em>Submitted on ${new Date().toLocaleString('en-NZ')}</em></p>
      `;

      const emailText = `
New Contact Form Submission

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}
Address: ${formData.address}
Service: ${formData.service}
Message:
${formData.message || 'No message provided'}

Submitted on ${new Date().toLocaleString('en-NZ')}
      `;

      // Send email via Resend
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || 'noreply@brooklynservices.co.nz',
          to: env.TO_EMAIL || 'sam@brooklynservices.co.nz',
          subject: `New Contact Form: ${formData.name} - ${formData.service}`,
          text: emailText,
          html: emailHtml,
          reply_to: formData.email || undefined,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.text();
        console.error('Resend API error:', errorData);
        throw new Error('Failed to send email');
      }

      // Send auto-reply to customer if email provided
      if (formData.email) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: env.FROM_EMAIL || 'noreply@brooklynservices.co.nz',
              to: formData.email,
              subject: 'Thank you for contacting Brooklyn Services',
              html: `
                <h2>Thank you for contacting Brooklyn Services Limited</h2>
                <p>Hi ${escapeHtml(formData.name)},</p>
                <p>We have received your inquiry and will get back to you within 24 hours.</p>
                <p><strong>Your request:</strong></p>
                <ul>
                  <li>Service: ${escapeHtml(formData.service)}</li>
                  <li>Address: ${escapeHtml(formData.address)}</li>
                </ul>
                <p>If this is an emergency, please call us directly at <strong>0800 1 BROOK (0800 127 665)</strong>.</p>
                <hr>
                <p><strong>Brooklyn Services Limited</strong><br>
                Licensed Plumbers & Drainlayers<br>
                96b Carmen Rd, Hei Hei, Christchurch<br>
                Phone: 0800 1 BROOK | 03 349 7322</p>
              `,
            }),
          });
        } catch (e) {
          // Don't fail if auto-reply fails
          console.error('Auto-reply error:', e);
        }
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

    } catch (error) {
      console.error('Form submission error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to process form submission' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
