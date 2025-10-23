-- ========================================
-- QUICK DATABASE CHECK COMMANDS
-- Copy and paste into Neon SQL Editor
-- https://console.neon.tech
-- ========================================

-- 1. CHECK IF TABLES EXIST (Should show 2 tables)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Expected: article_drafts, users


-- 2. VIEW USERS TABLE STRUCTURE
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Expected columns:
-- id (uuid)
-- email (character varying)
-- password_hash (character varying)
-- created_at (timestamp)
-- updated_at (timestamp)


-- 3. VIEW ARTICLE_DRAFTS TABLE STRUCTURE
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'article_drafts'
ORDER BY ordinal_position;

-- Expected columns:
-- id (uuid)
-- user_id (uuid)
-- title (character varying)
-- original_content (text)
-- rewritten_content (text)
-- citations (jsonb)
-- metadata (jsonb)
-- status (character varying)
-- created_at (timestamp)
-- updated_at (timestamp)


-- 4. VERIFY PRIMARY KEYS ARE UUID
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE column_name = 'id' 
    AND table_schema = 'public'
ORDER BY table_name;

-- Expected: Both should be 'uuid' type


-- 5. CHECK FOREIGN KEY RELATIONSHIP
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS references_table,
    ccu.column_name AS references_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';

-- Expected: article_drafts.user_id -> users.id


-- 6. COUNT RECORDS (After using the app)
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM article_drafts) as total_drafts;

-- Initially: 0, 0
-- After signup: 1, 0
-- After creating draft: 1, 1


-- 7. VIEW ALL USERS (WITHOUT PASSWORD HASHES)
SELECT 
    id,
    email,
    created_at,
    updated_at
FROM users
ORDER BY created_at DESC;


-- 8. VIEW ALL DRAFTS (SUMMARY)
SELECT 
    d.id,
    u.email as owner,
    d.title,
    LEFT(d.original_content, 50) as preview,
    d.status,
    d.created_at
FROM article_drafts d
JOIN users u ON d.user_id = u.id
ORDER BY d.created_at DESC;


-- 9. CHECK INDEXES EXIST
SELECT 
    tablename,
    indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Expected indexes:
-- article_drafts: article_drafts_pkey, idx_article_drafts_status, idx_article_drafts_user_id
-- users: users_pkey, users_email_key, idx_users_email


-- 10. VERIFY TRIGGERS EXIST
SELECT 
    trigger_name,
    event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;

-- Expected:
-- update_article_drafts_updated_at on article_drafts
-- update_users_updated_at on users


-- ========================================
-- AFTER CREATING A USER (via signup page)
-- ========================================

-- Check your user was created (replace with your email)
SELECT 
    id,
    email,
    created_at
FROM users
WHERE email = 'test@example.com';


-- ========================================
-- AFTER CREATING A DRAFT (via dashboard)
-- ========================================

-- View your drafts
SELECT 
    id,
    title,
    status,
    created_at,
    LENGTH(original_content) as original_chars,
    LENGTH(rewritten_content) as rewritten_chars
FROM article_drafts
WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com')
ORDER BY created_at DESC;


-- ========================================
-- SAMPLE DATA CHECK (Full draft view)
-- ========================================

-- View complete draft with all fields
SELECT 
    d.id,
    u.email as owner_email,
    d.title,
    d.original_content,
    d.rewritten_content,
    d.citations,
    d.metadata,
    d.status,
    d.created_at,
    d.updated_at
FROM article_drafts d
JOIN users u ON d.user_id = u.id
LIMIT 1;


-- ========================================
-- MAINTENANCE QUERIES
-- ========================================

-- Check database size
SELECT pg_size_pretty(pg_database_size('article_writer'));

-- Check table sizes
SELECT
    tablename,
    pg_size_pretty(pg_total_relation_size('public.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size('public.'||tablename) DESC;

-- Check for orphaned drafts (should be 0)
SELECT COUNT(*) as orphaned_drafts
FROM article_drafts d
LEFT JOIN users u ON d.user_id = u.id
WHERE u.id IS NULL;


-- ========================================
-- VERIFICATION CHECKLIST
-- ========================================

-- Run all these - should all return expected results:

-- 1. Extension enabled?
SELECT EXISTS(SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') as pgcrypto_enabled;
-- Expected: true

-- 2. Tables created?
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('users', 'article_drafts');
-- Expected: 2

-- 3. Primary keys are UUID?
SELECT COUNT(*) as uuid_pk_count
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND column_name = 'id' 
    AND data_type = 'uuid';
-- Expected: 2

-- 4. Foreign key exists?
SELECT COUNT(*) as fk_count
FROM information_schema.table_constraints 
WHERE constraint_type = 'FOREIGN KEY' 
    AND table_name = 'article_drafts';
-- Expected: 1

-- 5. Unique constraint on email?
SELECT COUNT(*) as unique_email
FROM information_schema.table_constraints 
WHERE constraint_type = 'UNIQUE' 
    AND table_name = 'users'
    AND constraint_name LIKE '%email%';
-- Expected: 1


-- ========================================
-- ALL CHECKS PASSED? 
-- ========================================
-- ✅ Your database is ready!
-- ✅ Start the backend: cd backend && npm run dev
-- ✅ Start the frontend: cd frontend && npm run dev
-- ✅ Open: http://localhost:3000
-- ========================================

