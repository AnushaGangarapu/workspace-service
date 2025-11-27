import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

// Load env variables
dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Connect DB
connectDatabase();

// CORS FIX — DYNAMIC ORIGIN
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://workspacebooking.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly handle OPTIONS
app.options('*', cors());

app.use(express.json());

// Health route
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TypeScript API running on port: ${PORT}`);
});
