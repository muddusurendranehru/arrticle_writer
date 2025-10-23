# 🗄️ Database Commands Reference

Your Neon PostgreSQL database: **article_writer**

Connection string:
```
postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require
```

---

## 📊 Complete SQL Schema

### Table 1: users (Authentication)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Columns:**
- `id` - UUID (Primary Key, auto-generated)
- `email` - User's email address (unique)
- `password_hash` - Bcrypt hashed password
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

---

### Table 2: article_drafts (Content Storage)

```sql
CREATE TABLE article_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(500),
    original_content TEXT NOT NULL,
    rewritten_content TEXT,
    citations JSONB,
    metadata JSONB,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Columns:**
- `id` - UUID (Primary Key, auto-generated)
- `user_id` - Foreign Key to users table (owner)
- `title` - Draft title (optional, max 500 chars)
- `original_content` - User's input text (required)
- `rewritten_content` - AI-generated output
- `citations` - JSON array of citations
- `metadata` - JSON object for extra data
- `status` - Draft status (draft/published/archived)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

---

## 🔍 Commands to Check Tables

### 1. Connect to Your Database

**Using psql:**
```bash
psql "postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require"
```

**Using Neon Console:**
1. Go to https://console.neon.tech
2. Select your project
3. Click "SQL Editor"
4. Run queries below

---

### 2. List All Tables

```sql
-- Method 1: Simple list
\dt

-- Method 2: Detailed info
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

**Expected output:**
```
 table_name      
-----------------
 users
 article_drafts
```

---

### 3. View Table Structure (Column Details)

**For users table:**
```sql
\d users

-- Or detailed version:
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

**Expected output:**
```
 column_name   | data_type         | max_length | is_nullable | default
---------------+-------------------+------------+-------------+------------------
 id            | uuid              | NULL       | NO          | gen_random_uuid()
 email         | character varying | 255        | NO          | NULL
 password_hash | character varying | 255        | NO          | NULL
 created_at    | timestamp         | NULL       | YES         | now()
 updated_at    | timestamp         | NULL       | YES         | now()
```

---

**For article_drafts table:**
```sql
\d article_drafts

-- Or detailed version:
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'article_drafts'
ORDER BY ordinal_position;
```

**Expected output:**
```
 column_name        | data_type         | max_length | is_nullable | default
--------------------+-------------------+------------+-------------+------------------
 id                 | uuid              | NULL       | NO          | gen_random_uuid()
 user_id            | uuid              | NULL       | NO          | NULL
 title              | character varying | 500        | YES         | NULL
 original_content   | text              | NULL       | NO          | NULL
 rewritten_content  | text              | NULL       | YES         | NULL
 citations          | jsonb             | NULL       | YES         | NULL
 metadata           | jsonb             | NULL       | YES         | NULL
 status             | character varying | 50         | YES         | 'draft'
 created_at         | timestamp         | NULL       | YES         | now()
 updated_at         | timestamp         | NULL       | YES         | now()
```

---

### 4. View Table Constraints (Primary Keys, Foreign Keys)

```sql
-- Check primary keys
SELECT 
    tc.table_name, 
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.constraint_type = 'PRIMARY KEY'
    AND tc.table_schema = 'public';
```

**Expected output:**
```
 table_name      | column_name
-----------------+-------------
 users           | id
 article_drafts  | id
```

---

```sql
-- Check foreign keys
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';
```

**Expected output:**
```
 table_name      | column_name | foreign_table_name | foreign_column_name
-----------------+-------------+--------------------+--------------------
 article_drafts  | user_id     | users              | id
```

---

### 5. View Indexes

```sql
-- List all indexes
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

**Expected output:**
```
 tablename       | indexname                   | indexdef
-----------------+-----------------------------+----------------------------------
 article_drafts  | article_drafts_pkey         | CREATE UNIQUE INDEX...
 article_drafts  | idx_article_drafts_status   | CREATE INDEX...
 article_drafts  | idx_article_drafts_user_id  | CREATE INDEX...
 users           | users_email_key             | CREATE UNIQUE INDEX...
 users           | users_pkey                  | CREATE UNIQUE INDEX...
 users           | idx_users_email             | CREATE INDEX...
```

---

## 📋 View Table Contents

### Check if tables have data:

```sql
-- Count records in users table
SELECT COUNT(*) as user_count FROM users;

-- Count records in article_drafts table
SELECT COUNT(*) as draft_count FROM article_drafts;
```

---

### View users table data:

```sql
-- View all users (without password hash for security)
SELECT 
    id,
    email,
    created_at,
    updated_at
FROM users
ORDER BY created_at DESC;
```

---

### View article_drafts table data:

```sql
-- View all drafts (summary)
SELECT 
    id,
    user_id,
    title,
    LEFT(original_content, 50) || '...' as preview,
    status,
    created_at
FROM article_drafts
ORDER BY created_at DESC;
```

---

### View specific user's drafts:

```sql
-- Replace 'user@example.com' with actual email
SELECT 
    d.id,
    d.title,
    d.status,
    d.created_at,
    u.email as owner_email
FROM article_drafts d
JOIN users u ON d.user_id = u.id
WHERE u.email = 'test@example.com'
ORDER BY d.created_at DESC;
```

---

## 🧪 Test Data (Optional)

### Insert test user (for manual testing):

```sql
-- Note: This is a hashed version of "Test1234"
INSERT INTO users (email, password_hash)
VALUES (
    'manual-test@example.com',
    '$2b$10$YourHashedPasswordHere'
);
```

**⚠️ Don't do this!** Use the signup page instead.

---

### View sample draft structure:

```sql
-- After creating drafts via the app, view one:
SELECT 
    id,
    title,
    original_content,
    rewritten_content,
    citations,
    metadata,
    status
FROM article_drafts
LIMIT 1;
```

---

## 🔧 Maintenance Commands

### Check database size:

```sql
SELECT 
    pg_size_pretty(pg_database_size('article_writer')) as database_size;
```

---

### Check table sizes:

```sql
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

### Check for orphaned drafts (drafts without users):

```sql
-- Should return 0 if everything is correct
SELECT COUNT(*) 
FROM article_drafts d
LEFT JOIN users u ON d.user_id = u.id
WHERE u.id IS NULL;
```

---

## 🔍 Verification Checklist

After running schema.sql, verify:

- [ ] **Extension enabled:**
  ```sql
  SELECT * FROM pg_extension WHERE extname = 'pgcrypto';
  ```

- [ ] **Tables exist:**
  ```sql
  SELECT COUNT(*) FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_name IN ('users', 'article_drafts');
  -- Should return: 2
  ```

- [ ] **Primary keys are UUIDs:**
  ```sql
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND column_name = 'id';
  -- Should show: uuid for both tables
  ```

- [ ] **Foreign key exists:**
  ```sql
  SELECT COUNT(*) FROM information_schema.table_constraints 
  WHERE constraint_type = 'FOREIGN KEY' 
    AND table_name = 'article_drafts';
  -- Should return: 1
  ```

- [ ] **Triggers exist:**
  ```sql
  SELECT trigger_name, event_object_table 
  FROM information_schema.triggers 
  WHERE trigger_schema = 'public';
  -- Should show 2 triggers (one per table)
  ```

---

## 📊 Quick Table Summary

### Table 1: users
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

### Table 2: article_drafts
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| user_id | UUID | FOREIGN KEY → users(id), NOT NULL |
| title | VARCHAR(500) | NULL |
| original_content | TEXT | NOT NULL |
| rewritten_content | TEXT | NULL |
| citations | JSONB | NULL |
| metadata | JSONB | NULL |
| status | VARCHAR(50) | DEFAULT 'draft' |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

---

## 🎯 Common Queries for Development

### Get all drafts with user info:
```sql
SELECT 
    u.email,
    d.title,
    d.status,
    d.created_at,
    LENGTH(d.original_content) as original_length,
    LENGTH(d.rewritten_content) as rewritten_length
FROM article_drafts d
JOIN users u ON d.user_id = u.id
ORDER BY d.created_at DESC;
```

### Count drafts by status:
```sql
SELECT 
    status,
    COUNT(*) as count
FROM article_drafts
GROUP BY status;
```

### Find recent activity:
```sql
SELECT 
    'user' as type,
    email as identifier,
    created_at
FROM users
UNION ALL
SELECT 
    'draft' as type,
    title as identifier,
    created_at
FROM article_drafts
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🚀 Ready to Use!

Now you can:
1. ✅ Verify your tables exist
2. ✅ Check table structure
3. ✅ View table contents
4. ✅ Run maintenance queries
5. ✅ Monitor your database

**Start the app and create your first user!** 🎉

