// Simple in-memory rate limiter for API routes.
// On serverless (Vercel), each instance has its own memory.
// For stricter enforcement across instances, use @upstash/ratelimit with Redis.

const requests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  ip: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): boolean {
  const now = Date.now();
  const record = requests.get(ip);

  // Periodic cleanup to prevent memory leak
  if (requests.size > 10_000) {
    for (const [key, val] of requests) {
      if (val.resetTime < now) requests.delete(key);
    }
  }

  if (!record || record.resetTime < now) {
    requests.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
