import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message'; // Reusing Message model for feedback
import { feedbackSchema } from '@/lib/validation';
import { sendFeedbackEmail } from '@/lib/mail';

export async function POST(request: Request) {
  console.log('Received feedback form submission request.');
  try {
    const body = await request.json();
    
    // 1. Validate input
    const validation = feedbackSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input.', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { name, email, feedback } = validation.data;

    // 2. Save to database
    console.log('Attempting to connect to DB...');
    try {
        await dbConnect();
        console.log('DB connected. Attempting to save feedback message...');
        await Message.create({ name, email, message: feedback }); // Storing feedback in 'message' field
        console.log('Feedback message saved to DB.');
    } catch (dbError) {
        console.error('Database operation failed for feedback:', dbError);
        return NextResponse.json({ message: 'Failed to save feedback to database.', error: (dbError as Error).message }, { status: 500 });
    }
    
    // 3. Send email notification
    console.log('Attempting to send feedback email...');
    try {
        await sendFeedbackEmail(name, email, feedback);
        console.log('Feedback email sent successfully.');
    } catch (emailError) {
        // Log the email error but don't fail the request if DB write was successful
        console.error("Feedback email failed to send but message was saved to DB:", emailError);
    }

    return NextResponse.json({ message: 'Feedback submitted successfully!' }, { status: 201 });

  } catch (error) {
    console.error('API Error for feedback submission:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown internal server error occurred.' }, { status: 500 });
  }
}
