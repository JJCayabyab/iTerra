import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

//for testing purposes, rate limit is set to 1 request per 40 seconds
export const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(20, "30 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});