import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.RESEND_TO_EMAIL;

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Emails will not be sent in production.");
}
if (!toEmail) {
  console.warn("RESEND_TO_EMAIL is not set. Emails will not be sent in production.");
}

export const sendContactEmail = async (name: string, email: string, message: string) => {
  if (!process.env.RESEND_API_KEY || !toEmail) {
    console.error("Resend is not configured. Skipping email.");
    // This allows the app to function for dev without email sending.
    // In production, this should ideally be configured.
    return;
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Must be a verified domain on Resend for production
      to: toEmail,
      subject: `New Message from ${name} via Portfolio`,
      reply_to: email,
      html: `<div style="font-family: sans-serif; line-height: 1.6;">
              <h2>New Message via Portfolio</h2>
              <p>You have a new message from your portfolio contact form:</p>
              <hr>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 1em; border-radius: 4px;">${message}</p>
             </div>`,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    // Re-throw the error to be caught by the API route handler
    throw new Error('Failed to send email.');
  }
};

export const sendFeedbackEmail = async (name: string, email: string, feedback: string) => {
  if (!process.env.RESEND_API_KEY || !toEmail) {
    console.error("Resend is not configured. Skipping feedback email.");
    return;
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Feedback <onboarding@resend.dev>', // Must be a verified domain on Resend for production
      to: toEmail,
      subject: `New Feedback from ${name} via Portfolio`,
      reply_to: email,
      html: `<div style="font-family: sans-serif; line-height: 1.6;">
              <h2>New Feedback via Portfolio</h2>
              <p>You have new feedback from your portfolio feedback form:</p>
              <hr>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Feedback:</strong></p>
              <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 1em; border-radius: 4px;">${feedback}</p>
             </div>`,
    });
  } catch (error) {
    console.error('Failed to send feedback email:', error);
    throw new Error('Failed to send feedback email.');
  }
};
