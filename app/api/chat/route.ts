import { GoogleGenAI, Chat } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Ensure the API key is set in your environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction to guide the model's behavior
const systemInstruction = `You are a helpful and friendly AI assistant for a developer's portfolio website. Your name is "DevBot". Be concise and professional, but approachable. Your primary goal is to answer questions about the developer's skills, projects, and experience based on a typical senior full-stack developer profile. Do not invent project details if you don't have them. You can ask for clarification. Keep answers relatively short and to the point.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history || [],
    });

    const streamingResponse = await chat.sendMessageStream({ message });
    
    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of streamingResponse) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "An error occurred while communicating with the AI." },
      { status: 500 }
    );
  }
}
