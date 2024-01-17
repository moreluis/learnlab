import http from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes';
import dotenv from 'dotenv';
import validator from 'validator';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimitMiddleware from './security/rateLimit';
import connectToMongoDB from './db/connect';

dotenv.config();

connectToMongoDB();

const router: Express = express();

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

router.use(cors({
  origin: process.env.FRONTEND_DOMAIN ?? "http://localhost:3000"
}));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_DOMAIN ?? '*');
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, POST');
    return res.status(200).json({});
  }

  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string' && key !== 'url') {
        req.body[key] = validator.escape((req.body[key]));
      }
    });
  }

  next();
});

router.use(helmet());

router.use(cookieParser());

router.use(rateLimitMiddleware);

router.use('/', routes);

router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  next();
});

router.use((_req, res, _next) => {
  const error = new Error('Not Found');
  return res.status(404).json({
    message: error.message,
  });
});

// Generic error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  return res.status(500).json({
    message: 'An internal server error occurred.',
  });
});

const httpServer = http.createServer(router);
const PORT: number = Number(process.env.PORT || '80');
httpServer.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}`));
