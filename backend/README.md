# Heart Backend - Scientific Article Writing Agent API

Backend API server for the Scientific Article Writing Agent application.

## Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Neon PostgreSQL (database: "heart")
- **Authentication**: JWT with bcrypt password hashing
- **External APIs**: OpenAI, LanguageTool, GPTZero, MyBib, ResearchPal

## Project Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # Neon PostgreSQL connection
│   │   └── env.ts             # Environment configuration
│   ├── controllers/
│   │   ├── auth.controller.ts         # Authentication logic
│   │   ├── articleDraft.controller.ts # Article draft CRUD
│   │   └── externalApi.controller.ts  # External API integrations
│   ├── middleware/
│   │   ├── auth.middleware.ts         # JWT verification
│   │   ├── validation.middleware.ts   # Input validation
│   │   └── errorHandler.middleware.ts # Error handling
│   ├── routes/
│   │   ├── auth.routes.ts        # Auth endpoints
│   │   ├── articleDraft.routes.ts # Draft endpoints
│   │   └── api.routes.ts         # External API endpoints
│   ├── utils/
│   │   ├── password.util.ts # Password hashing
│   │   └── jwt.util.ts      # JWT token generation
│   └── server.ts            # Main server file
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```bash
cp ../env.template .env
```

Edit `.env` with your actual values:
```env
DATABASE_URL="your-neon-postgresql-connection-string"
JWT_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-key"
# ... other API keys
```

### 3. Set Up Database
Run the schema in your Neon PostgreSQL database:
```bash
# Connect to your Neon database and run:
psql YOUR_NEON_CONNECTION_STRING -f ../database/schema.sql
```

### 4. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 5. Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info (protected)

### Article Drafts
- `POST /api/drafts` - Create new draft (protected)
- `GET /api/drafts` - Get all user drafts (protected)
- `GET /api/drafts/:id` - Get single draft (protected)
- `PUT /api/drafts/:id` - Update draft (protected)
- `DELETE /api/drafts/:id` - Delete draft (protected)

### External API Tools
- `POST /api/tools/rewrite` - AI text rewriting (protected)
- `POST /api/tools/citations` - Generate Vancouver citations (protected)
- `POST /api/tools/grammar` - Grammar checking (protected)
- `POST /api/tools/ai-detect` - AI content detection (protected)
- `POST /api/tools/research` - Research suggestions (protected)

## Database Tables

### users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | Unique email |
| password_hash | VARCHAR(255) | Bcrypt hashed password |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Update timestamp |

### article_drafts
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| title | VARCHAR(500) | Draft title |
| original_content | TEXT | User input text |
| rewritten_content | TEXT | AI rewritten text |
| citations | JSONB | Vancouver citations |
| metadata | JSONB | Additional data |
| status | VARCHAR(50) | Draft status |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Update timestamp |

## Testing

To test the backend endpoints:

```bash
npm test
```

Or manually test using curl:

```bash
# Health check
curl http://localhost:5000/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","confirmPassword":"Test1234"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

## Security Features
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ JWT authentication
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Input validation
- ✅ SQL injection protection (parameterized queries)
- ✅ Rate limiting recommended for production

## License
MIT

