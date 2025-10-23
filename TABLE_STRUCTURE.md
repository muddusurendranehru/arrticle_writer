# 📊 Database Table Structure

## Quick Reference for Your Neon PostgreSQL Database

Database Name: **article_writer**

---

## 📋 Table 1: users

**Purpose:** Store user authentication data

### Structure

```
┌──────────────────────────────────────────────────────────────┐
│                        USERS TABLE                           │
├──────────────────┬──────────────┬─────────────┬──────────────┤
│ Column           │ Type         │ Constraints │ Default      │
├──────────────────┼──────────────┼─────────────┼──────────────┤
│ id               │ UUID         │ PRIMARY KEY │ auto-gen     │
│ email            │ VARCHAR(255) │ UNIQUE      │ -            │
│ password_hash    │ VARCHAR(255) │ NOT NULL    │ -            │
│ created_at       │ TIMESTAMP    │ -           │ NOW()        │
│ updated_at       │ TIMESTAMP    │ -           │ NOW()        │
└──────────────────┴──────────────┴─────────────┴──────────────┘
```

### Column Details

| Column | Description | Example |
|--------|-------------|---------|
| **id** | Unique identifier (UUID) | `550e8400-e29b-41d4-a716-446655440000` |
| **email** | User's email address | `user@example.com` |
| **password_hash** | Bcrypt hashed password | `$2b$10$N9qo8uLOickgx...` |
| **created_at** | When account was created | `2024-01-15 10:30:45` |
| **updated_at** | Last modification time | `2024-01-15 10:30:45` |

### Indexes
- ✅ `users_pkey` - Primary key on `id`
- ✅ `users_email_key` - Unique index on `email`
- ✅ `idx_users_email` - Performance index on `email`

### Triggers
- ✅ `update_users_updated_at` - Auto-updates `updated_at` on changes

---

## 📝 Table 2: article_drafts

**Purpose:** Store original content, AI rewrites, citations, and metadata

### Structure

```
┌────────────────────────────────────────────────────────────────────┐
│                     ARTICLE_DRAFTS TABLE                           │
├────────────────────┬──────────────┬─────────────┬─────────────────┤
│ Column             │ Type         │ Constraints │ Default         │
├────────────────────┼──────────────┼─────────────┼─────────────────┤
│ id                 │ UUID         │ PRIMARY KEY │ auto-gen        │
│ user_id            │ UUID         │ FOREIGN KEY │ -               │
│ title              │ VARCHAR(500) │ NULLABLE    │ NULL            │
│ original_content   │ TEXT         │ NOT NULL    │ -               │
│ rewritten_content  │ TEXT         │ NULLABLE    │ NULL            │
│ citations          │ JSONB        │ NULLABLE    │ NULL            │
│ metadata           │ JSONB        │ NULLABLE    │ NULL            │
│ status             │ VARCHAR(50)  │ -           │ 'draft'         │
│ created_at         │ TIMESTAMP    │ -           │ NOW()           │
│ updated_at         │ TIMESTAMP    │ -           │ NOW()           │
└────────────────────┴──────────────┴─────────────┴─────────────────┘
```

### Column Details

| Column | Description | Example |
|--------|-------------|---------|
| **id** | Unique identifier (UUID) | `660e8400-e29b-41d4-a716-446655440001` |
| **user_id** | Owner of this draft (FK to users.id) | `550e8400-e29b-41d4-a716-446655440000` |
| **title** | Article/draft title | `"Machine Learning in Healthcare"` |
| **original_content** | User's pasted research text | `"The study by Smith et al..."` |
| **rewritten_content** | AI-generated human-style text | `"Recent research demonstrates..."` |
| **citations** | JSON array of Vancouver citations | `[{"number": 1, "text": "..."}]` |
| **metadata** | JSON object for grammar/AI scores | `{"grammarErrors": 2, "aiScore": 0.85}` |
| **status** | Draft status | `"draft"`, `"published"`, `"archived"` |
| **created_at** | When draft was created | `2024-01-15 11:20:30` |
| **updated_at** | Last modification time | `2024-01-15 11:25:15` |

### Relationships
- ✅ **Foreign Key:** `user_id` → `users.id`
- ✅ **Cascade Delete:** Deleting a user deletes all their drafts

### Indexes
- ✅ `article_drafts_pkey` - Primary key on `id`
- ✅ `idx_article_drafts_user_id` - Performance index on `user_id`
- ✅ `idx_article_drafts_status` - Performance index on `status`

### Triggers
- ✅ `update_article_drafts_updated_at` - Auto-updates `updated_at` on changes

---

## 🔗 Table Relationships

```
┌─────────────────────┐
│       users         │
│─────────────────────│
│ id (PK, UUID)       │◄─────┐
│ email               │      │
│ password_hash       │      │
│ created_at          │      │
│ updated_at          │      │
└─────────────────────┘      │
                             │
                             │ 1 user has many drafts
                             │ (ON DELETE CASCADE)
                             │
                      ┌──────┴──────────────┐
                      │                     │
          ┌───────────────────────────────┐ │
          │    article_drafts             │ │
          │───────────────────────────────│ │
          │ id (PK, UUID)                 │ │
          │ user_id (FK) ─────────────────┘
          │ title                         │
          │ original_content              │
          │ rewritten_content             │
          │ citations (JSONB)             │
          │ metadata (JSONB)              │
          │ status                        │
          │ created_at                    │
          │ updated_at                    │
          └───────────────────────────────┘
```

---

## 📊 Sample Data

### Sample User Record

```sql
id:            550e8400-e29b-41d4-a716-446655440000
email:         test@example.com
password_hash: $2b$10$YourHashedPasswordHere...
created_at:    2024-01-15 10:30:45.123456
updated_at:    2024-01-15 10:30:45.123456
```

### Sample Article Draft Record

```sql
id:                 660e8400-e29b-41d4-a716-446655440001
user_id:            550e8400-e29b-41d4-a716-446655440000
title:              "AI in Medical Imaging"
original_content:   "The study by Smith et al. (2023) demonstrates..."
rewritten_content:  "Recent research in medical imaging has shown..."
citations:          [
                      {
                        "number": 1,
                        "text": "Smith J, Doe A. AI in Medicine. 2023;10(2):123-145.",
                        "vancouverStyle": "1. Smith J, Doe A..."
                      }
                    ]
metadata:           {
                      "grammarErrors": 0,
                      "aiDetectionScore": 0.87,
                      "wordCount": 250
                    }
status:             "draft"
created_at:         2024-01-15 11:20:30.654321
updated_at:         2024-01-15 11:25:15.987654
```

---

## 🎯 Quick SQL to Check Structure

### Option 1: Using psql
```bash
# Connect to database
psql "postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/article_writer?sslmode=require"

# View users table
\d users

# View article_drafts table
\d article_drafts
```

### Option 2: Using Neon SQL Editor

Go to https://console.neon.tech and run:

```sql
-- See users table structure
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- See article_drafts table structure
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

---

## ✅ Verification Checklist

After running `database/schema.sql`, verify:

- [ ] **2 tables exist** (users, article_drafts)
- [ ] **Both have UUID primary keys** (not integers)
- [ ] **Foreign key relationship** exists (article_drafts.user_id → users.id)
- [ ] **Email is unique** in users table
- [ ] **Indexes created** (3 on users, 3 on article_drafts)
- [ ] **Triggers created** (2 total, one per table)
- [ ] **pgcrypto extension** enabled (for UUID generation)

### Run This Quick Check:

```sql
-- Should return 2
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'article_drafts');

-- Should return 2 (both tables have UUID id)
SELECT COUNT(*) FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND column_name = 'id' 
  AND data_type = 'uuid';

-- Should return 1 (foreign key exists)
SELECT COUNT(*) FROM information_schema.table_constraints 
WHERE constraint_type = 'FOREIGN KEY' 
  AND table_name = 'article_drafts';
```

---

## 📝 Notes

### UUID vs Integer
- ✅ Using UUID (as per project rules)
- Better for distributed systems
- No sequential ID exposure
- More secure

### JSONB Fields
- `citations` - Stores array of citation objects
- `metadata` - Stores flexible data (grammar scores, AI detection, etc.)
- JSONB allows indexing and querying JSON data

### Cascade Delete
- When a user is deleted, all their drafts are automatically deleted
- Maintains referential integrity

### Timestamps
- `created_at` - Never changes after insert
- `updated_at` - Automatically updates on any row modification (via trigger)

---

## 🚀 Ready to Use!

Your database structure is complete and follows all best practices:

✅ Normalized structure  
✅ UUID primary keys  
✅ Proper foreign keys  
✅ Indexed for performance  
✅ Automatic timestamp updates  
✅ Data integrity enforced  

**Next:** Start your backend and frontend, then create your first user! 🎉

