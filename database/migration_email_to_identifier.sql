-- Optional Migration: Rename email column to identifier for clarity
-- This migration is OPTIONAL - the current schema already works with phone numbers
-- Only run this if you want to make the column name more descriptive

-- Step 1: Rename the column
ALTER TABLE users RENAME COLUMN email TO identifier;

-- Step 2: Update the index
DROP INDEX IF EXISTS idx_users_email;
CREATE INDEX idx_users_identifier ON users(identifier);

-- Step 3: Add a comment to clarify what this column stores
COMMENT ON COLUMN users.identifier IS 'User identifier: can be email address or phone number (+91XXXXXXXXXX)';

-- To rollback this migration:
-- ALTER TABLE users RENAME COLUMN identifier TO email;
-- DROP INDEX IF EXISTS idx_users_identifier;
-- CREATE INDEX idx_users_email ON users(email);

