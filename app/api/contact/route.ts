import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/mail';

export async function POST(request: Request) {
  console.log('Received contact form submission request.');
  try {
    const body = await request.json();
    
    // 1. Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input.', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { name, email, message } = validation.data;

    // 2. Save to database
    await dbConnect();
    await Message.create({ name, email, message });
    
    // 3. Send email notification
    try {
        await sendContactEmail(name, email, message);
    } catch (emailError) {
        // Log the email error but don't fail the request if DB write was successful
        console.error("Email failed to send but message was saved to DB:", emailError);
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown internal server error occurred.' }, { status: 500 });
  }
}
