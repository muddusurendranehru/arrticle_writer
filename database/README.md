# Heart Database Documentation

## Database: heart

This database powers the Scientific Article Writing Agent application.

## Tables

### 1. users
- **Purpose**: Store user authentication data
- **Primary Key**: `id` (UUID)
- **Fields**:
  - `id`: UUID (auto-generated)
  - `email`: Unique user email
  - `password_hash`: Bcrypt hashed password
  - `created_at`: Account creation timestamp
  - `updated_at`: Last update timestamp

### 2. article_drafts
- **Purpose**: Store research snippets, rewrites, citations, and metadata
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` references users(id)
- **Fields**:
  - `id`: UUID (auto-generated)
  - `user_id`: Owner of the draft
  - `title`: Optional draft title
  - `original_content`: User-pasted research content
  - `rewritten_content`: AI-generated human-style rewrite
  - `citations`: JSON array of Vancouver-style citations
  - `metadata`: JSON object for additional data (AI detector scores, grammar checks, etc.)
  - `status`: Draft status (draft, published, archived)
  - `created_at`: Creation timestamp
  - `updated_at`: Last update timestamp

## Setup Instructions

### 1. Create Neon PostgreSQL Database
1. Go to https://neon.tech
2. Create a new database named "heart"
3. Copy the connection string

### 2. Run Schema
Execute the `schema.sql` file in your Neon database console or via psql:
```bash
psql YOUR_NEON_CONNECTION_STRING -f schema.sql
```

### 3. Verify Tables
```sql
\dt -- List all tables (should show users and article_drafts)
```

## Connection String Format
```
postgresql://[user]:[password]@[host]/heart?sslmode=require
```

