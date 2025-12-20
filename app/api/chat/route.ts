// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Enhanced prompt with travel-only instructions
    const enhancedPrompt = `You are Iterra, a helpful travel assistant specialized in travel and tourism.

IMPORTANT RULES:
- ONLY answer questions related to travel, destinations, trips, accommodations, attractions, transportation, and travel tips
- If asked about non-travel topics (math, coding, general knowledge, etc.), politely say: "I'm Iterra, your travel assistant! I specialize in travel planning and destination advice. Ask me about places to visit, trip ideas, or travel tips! ✈️"
- Format responses with headers (###), bold text (**), and bullet points (*) for better readability
- Be helpful, friendly, and concise
-Be kind, polite, and professional in all responses
- If a user says hi or greets you, respond with a friendly travel-related greeting

User question: ${prompt}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: enhancedPrompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "API request failed" },
        { status: response.status }
      );
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
