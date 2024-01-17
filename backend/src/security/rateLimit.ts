import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

export default async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const clientIdentifier = req.ip;

    const rateLimitResponse = await rateLimiter.consume(clientIdentifier);

    res.set({
      'Retry-After': rateLimitResponse.msBeforeNext / 1000, 
      'X-RateLimit-Limit': 100, 
      'X-RateLimit-Remaining': rateLimitResponse.remainingPoints, 
    });

    return next();
  } catch (error) {
    return res.status(429).json({
      message: 'Too Many Requests',
    });
  }
}
