# System Architecture

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│                    (Next.js 14 Frontend)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │    Landing   │  │   Sign Up    │  │        Login             │  │
│  │     Page     │  │     Page     │  │         Page             │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     DASHBOARD                                │   │
│  │  ┌────────────────────┐  ┌─────────────────────────────┐   │   │
│  │  │   Left Panel       │  │     Right Panel             │   │   │
│  │  │   (Input)          │  │     (AI Output)             │   │   │
│  │  │                    │  │                             │   │   │
│  │  │  Research snippets │  │  Rewritten content          │   │   │
│  │  │  from Zotero,      │  │  + Citations                │   │   │
│  │  │  PubMed, browser   │  │  + Grammar errors           │   │   │
│  │  └────────────────────┘  └─────────────────────────────┘   │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │          Tool Panel (Actions)                        │  │   │
│  │  │  [Rewrite] [Grammar] [AI Detect] [Save] [Export]    │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                                │ HTTP/HTTPS (Axios)
                                │ JWT Authentication
                                │
┌───────────────────────────────▼───────────────────────────────────┐
│                       API GATEWAY                                  │
│                  (Express.js Backend)                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    MIDDLEWARE LAYER                         │    │
│  │  ┌──────────┐ ┌──────────────┐ ┌────────────────────┐      │    │
│  │  │   CORS   │ │ Helmet.js    │ │   Request Logger   │      │    │
│  │  └──────────┘ └──────────────┘ └────────────────────┘      │    │
│  │  ┌──────────┐ ┌──────────────┐ ┌────────────────────┐      │    │
│  │  │   Auth   │ │  Validation  │ │   Error Handler    │      │    │
│  │  │   JWT    │ │  Express-    │ │                    │      │    │
│  │  │  Verify  │ │  Validator   │ │                    │      │    │
│  │  └──────────┘ └──────────────┘ └────────────────────┘      │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    ROUTE HANDLERS                           │    │
│  │                                                             │    │
│  │  /api/auth/*          /api/drafts/*       /api/tools/*     │    │
│  │  ├─ POST /signup      ├─ POST /           ├─ POST /rewrite │    │
│  │  ├─ POST /login       ├─ GET /            ├─ POST /grammar │    │
│  │  ├─ POST /logout      ├─ GET /:id         ├─ POST /ai-detect │  │
│  │  └─ GET  /me          ├─ PUT /:id         ├─ POST /citations │  │
│  │                        └─ DELETE /:id      └─ POST /research  │  │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    CONTROLLERS                              │    │
│  │  ┌──────────────┐ ┌────────────────┐ ┌─────────────────┐  │    │
│  │  │     Auth     │ │ Article Drafts │ │  External APIs  │  │    │
│  │  │  Controller  │ │   Controller   │ │    Controller   │  │    │
│  │  └──────────────┘ └────────────────┘ └─────────────────┘  │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                       │
└───────────────┬───────────────────────────────────┬─────────────────┘
                │                                   │
                │ SQL Queries                       │ HTTP Requests
                │ (pg library)                      │ (axios)
                │                                   │
┌───────────────▼───────────────┐    ┌────────────▼─────────────────┐
│   NEON POSTGRESQL              │    │    EXTERNAL APIs             │
│   Database: "heart"            │    │                              │
├────────────────────────────────┤    │  ┌────────────────────────┐ │
│                                │    │  │   OpenAI GPT-4         │ │
│  ┌──────────────────────────┐ │    │  │   (Text Rewriting)     │ │
│  │  TABLE: users            │ │    │  └────────────────────────┘ │
│  │  ┌────────────────────┐  │ │    │                              │
│  │  │ id (UUID)          │  │ │    │  ┌────────────────────────┐ │
│  │  │ email              │  │ │    │  │   LanguageTool         │ │
│  │  │ password_hash      │  │ │    │  │   (Grammar Check)      │ │
│  │  │ created_at         │  │ │    │  └────────────────────────┘ │
│  │  │ updated_at         │  │ │    │                              │
│  │  └────────────────────┘  │ │    │  ┌────────────────────────┐ │
│  └──────────────────────────┘ │    │  │   GPTZero              │ │
│                                │    │  │   (AI Detection)       │ │
│  ┌──────────────────────────┐ │    │  └────────────────────────┘ │
│  │  TABLE: article_drafts   │ │    │                              │
│  │  ┌────────────────────┐  │ │    │  ┌────────────────────────┐ │
│  │  │ id (UUID)          │  │ │    │  │   MyBib/Paperpal       │ │
│  │  │ user_id (FK)       │  │ │    │  │   (Citations)          │ │
│  │  │ title              │  │ │    │  └────────────────────────┘ │
│  │  │ original_content   │  │ │    │                              │
│  │  │ rewritten_content  │  │ │    │  ┌────────────────────────┐ │
│  │  │ citations (JSONB)  │  │ │    │  │   ResearchPal          │ │
│  │  │ metadata (JSONB)   │  │ │    │  │   (Suggestions)        │ │
│  │  │ status             │  │ │    │  └────────────────────────┘ │
│  │  │ created_at         │  │ │    │                              │
│  │  │ updated_at         │  │ │    └──────────────────────────────┘
│  │  └────────────────────┘  │ │
│  └──────────────────────────┘ │
│                                │
└────────────────────────────────┘
```

## 🔄 Data Flow

### 1. User Registration Flow
```
User Input → Frontend Validation → API Request → Backend Validation
→ Hash Password → Insert to DB → Generate JWT → Return Token → Store in LocalStorage
```

### 2. User Login Flow
```
User Input → API Request → Verify Email → Compare Password Hash
→ Generate JWT → Return Token → Store in LocalStorage → Redirect to Dashboard
```

### 3. Text Rewriting Flow
```
User Pastes Text → Click Rewrite → API Request (with JWT)
→ Verify Token → Call OpenAI API → Receive Rewritten Text
→ Return to Frontend → Display in Right Panel → Auto-save Draft
```

### 4. Draft Saving Flow
```
User Clicks Save → Collect Draft Data → API Request (with JWT)
→ Verify Token → Insert/Update DB → Return Draft ID
→ Update Frontend State → Show Success Message
```

### 5. Grammar Check Flow
```
User Clicks Grammar → Get Right Panel Content → API Request
→ Call LanguageTool API → Parse Errors → Return to Frontend
→ Display Error Count → Show Error Details
```

### 6. Export Flow
```
User Clicks Export PDF/DOCX → Get Content + Citations
→ Format Document → Generate File → Trigger Download
```

## 🛡️ Security Architecture

### Authentication Layer
```
┌──────────────────────────────────────┐
│         Client Request               │
│         (with JWT token)             │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│      Auth Middleware                 │
│  ┌────────────────────────────────┐  │
│  │ 1. Extract Token from Header   │  │
│  │ 2. Verify JWT Signature        │  │
│  │ 3. Check Expiration            │  │
│  │ 4. Decode User Data            │  │
│  │ 5. Attach to Request           │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│      Route Handler                   │
│      (Access to req.user)            │
└──────────────────────────────────────┘
```

### Password Security
```
Plain Password
      ↓
   bcrypt.hash()
   (10 rounds)
      ↓
  Hashed Password
      ↓
  Store in DB
      ↓
  Compare on Login
  (bcrypt.compare())
```

## 🔌 API Integration Architecture

### External API Calls
```
Frontend Request
      ↓
Backend Endpoint
      ↓
┌─────────────────┐
│  API Wrapper    │
│  (with API key) │
└────────┬────────┘
         │
    ┌────┴────┬────────┬────────┐
    ▼         ▼        ▼        ▼
 OpenAI  LanguageTool GPTZero MyBib
    │         │        │        │
    └────┬────┴────────┴────────┘
         │
   Parse Response
         │
         ▼
  Return to Frontend
```

## 📊 State Management

### Frontend State Architecture
```
┌───────────────────────────────────────┐
│         Zustand Stores                │
├───────────────────────────────────────┤
│                                       │
│  ┌─────────────────────────────────┐ │
│  │      useAuthStore               │ │
│  │  - user                         │ │
│  │  - token                        │ │
│  │  - isAuthenticated              │ │
│  │  - login()                      │ │
│  │  - logout()                     │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │      useDraftStore              │ │
│  │  - drafts[]                     │ │
│  │  - currentDraft                 │ │
│  │  - setDrafts()                  │ │
│  │  - updateDraft()                │ │
│  └─────────────────────────────────┘ │
│                                       │
└───────────────────────────────────────┘
         ↕
┌───────────────────────────────────────┐
│       LocalStorage                    │
│  - token (JWT)                        │
│  - user (JSON)                        │
└───────────────────────────────────────┘
```

## 🗄️ Database Schema Design

### Entity Relationship
```
┌─────────────────────────┐
│        users            │
│─────────────────────────│
│ id (PK, UUID)           │
│ email (UNIQUE)          │
│ password_hash           │
│ created_at              │
│ updated_at              │
└───────────┬─────────────┘
            │ 1
            │
            │ has many
            │
            │ N
┌───────────▼─────────────┐
│   article_drafts        │
│─────────────────────────│
│ id (PK, UUID)           │
│ user_id (FK)            │
│ title                   │
│ original_content        │
│ rewritten_content       │
│ citations (JSONB)       │
│ metadata (JSONB)        │
│ status                  │
│ created_at              │
│ updated_at              │
└─────────────────────────┘
```

## 🚀 Deployment Architecture

```
┌──────────────────────────────────────────────┐
│              USERS                           │
└──────────────────┬───────────────────────────┘
                   │
                   │ HTTPS
                   │
┌──────────────────▼───────────────────────────┐
│         VERCEL / NETLIFY                     │
│         (Frontend Hosting)                   │
│         - Next.js App                        │
│         - Static Assets                      │
│         - CDN Distribution                   │
└──────────────────┬───────────────────────────┘
                   │
                   │ HTTPS API Calls
                   │
┌──────────────────▼───────────────────────────┐
│      RAILWAY / RENDER / HEROKU               │
│      (Backend Hosting)                       │
│      - Express.js Server                     │
│      - Node.js Runtime                       │
│      - Environment Variables                 │
└──────────────────┬───────────────────────────┘
                   │
                   │ PostgreSQL Connection
                   │
┌──────────────────▼───────────────────────────┐
│           NEON POSTGRESQL                    │
│           (Database Hosting)                 │
│           - Cloud PostgreSQL                 │
│           - Automatic Backups                │
│           - SSL Connections                  │
└──────────────────────────────────────────────┘
```

## 📈 Scalability Considerations

### Horizontal Scaling
- Backend can run multiple instances
- Load balancer distributes traffic
- Stateless JWT authentication

### Database Optimization
- Indexes on frequently queried fields
- JSONB for flexible metadata storage
- Connection pooling (pg Pool)

### Caching Strategy
- Frontend: React Query / SWR (future)
- Backend: Redis for sessions (future)
- CDN for static assets

## 🔐 Security Layers

1. **Network Layer**
   - HTTPS/TLS encryption
   - CORS configuration
   - Helmet.js headers

2. **Application Layer**
   - JWT token expiration
   - Password hashing (bcrypt)
   - Input validation

3. **Database Layer**
   - Parameterized queries
   - SQL injection prevention
   - Role-based access

4. **API Layer**
   - Rate limiting (future)
   - API key rotation
   - Request throttling

---

This architecture follows **best practices** for modern web applications with a clear separation of concerns and scalable design.

