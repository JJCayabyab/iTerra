// app/api/list-models/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/app/redis';

export async function GET(req: NextRequest) {
  // Get identifier for rate limiting (IP address)
  const ip = req.headers.get("x-forwarded-for") ?? 
            req.headers.get("x-real-ip") ?? 
            "127.0.0.1";
  
  // Check rate limit
  const { success, limit, reset, remaining } = await rateLimit.limit(ip);

  // If rate limit exceeded, return 429
  if (!success) {
    return NextResponse.json(
      { 
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": new Date(reset).toISOString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Failed to list models' },
        { status: response.status }
      );
    }

    // Filter for models that support generateContent
    const compatibleModels = data.models?.filter((model: any) =>
      model.supportedGenerationMethods?.includes('generateContent')
    );

    // Include rate limit info in successful response headers
    return NextResponse.json(
      {
        allModels: data.models,
        compatibleModels
      },
      {
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": new Date(reset).toISOString(),
        },
      }
    );
  } catch (error) {
    console.error('List Models Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}