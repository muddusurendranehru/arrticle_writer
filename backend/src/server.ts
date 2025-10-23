import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import config from './config/env';
import { testConnection } from './config/database';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware';

// Import routes
import authRoutes from './routes/auth.routes';
import articleDraftRoutes from './routes/articleDraft.routes';
import apiRoutes from './routes/api.routes';
import topicRoutes from './routes/topic.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Support both ports
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev')); // Request logging

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/drafts', articleDraftRoutes);
app.use('/api/tools', apiRoutes);
app.use('/api/topics', topicRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.server.port;

const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Exiting...');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log('🚀 Heart Backend Server Started Successfully!');
      console.log('='.repeat(50));
      console.log(`📍 Server running on: http://localhost:${PORT}`);
      console.log(`🗄️  Database: Neon PostgreSQL (heart)`);
      console.log(`🌍 Environment: ${config.server.env}`);
      console.log(`🔗 CORS Origin: ${config.cors.origin}`);
      console.log('='.repeat(50));
      console.log('\n📋 Available Endpoints:');
      console.log('   GET  /health                    - Health check');
      console.log('   POST /api/auth/signup           - User signup');
      console.log('   POST /api/auth/login            - User login');
      console.log('   POST /api/auth/logout           - User logout');
      console.log('   GET  /api/auth/me               - Get current user');
      console.log('   POST /api/drafts                - Create draft');
      console.log('   GET  /api/drafts                - Get all drafts');
      console.log('   GET  /api/drafts/:id            - Get draft by ID');
      console.log('   PUT  /api/drafts/:id            - Update draft');
      console.log('   DELETE /api/drafts/:id          - Delete draft');
      console.log('   POST /api/tools/rewrite         - AI text rewriting');
      console.log('   POST /api/tools/citations       - Generate citations');
      console.log('   POST /api/tools/grammar         - Grammar check');
      console.log('   POST /api/tools/ai-detect       - AI detection');
      console.log('   POST /api/tools/research        - Research suggestions');
      console.log('='.repeat(50) + '\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n👋 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();

export default app;

