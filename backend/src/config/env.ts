import dotenv from 'dotenv';

dotenv.config();

interface Config {
  database: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  server: {
    port: number;
    env: string;
  };
  cors: {
    origin: string;
  };
  apis: {
    researchpal: string;
    mybib: string;
    languagetool: string;
    quillbot: string;
    gptzero: string;
    openai: string;
  };
}

const config: Config = {
  database: {
    url: process.env.DATABASE_URL || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  server: {
    port: parseInt(process.env.PORT || '5000'),
    env: process.env.NODE_ENV || 'development'
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
  },
  apis: {
    researchpal: process.env.RESEARCHPAL_API_KEY || '',
    mybib: process.env.MYBIB_API_KEY || '',
    languagetool: process.env.LANGUAGETOOL_API_KEY || '',
    quillbot: process.env.QUILLBOT_API_KEY || '',
    gptzero: process.env.GPTZERO_API_KEY || '',
    openai: process.env.OPENAI_API_KEY || ''
  }
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.warn(
    `⚠️  Warning: Missing environment variables: ${missingEnvVars.join(', ')}`
  );
  console.warn('Please create a .env file based on env.template');
}

export default config;

