import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 201 });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
