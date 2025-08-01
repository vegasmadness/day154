-- Script to make a user an admin
-- Run this in your Supabase SQL Editor after creating a user account

-- Option 1: Make a specific user admin by email
-- Replace 'your-email@example.com' with the actual email address
UPDATE auth.users 
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'vegasmadness@gmail.com';

-- Option 2: Make the first user in the system admin (useful for initial setup)
-- Uncomment the lines below if you want to use this option instead
/*
UPDATE auth.users 
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE id = (SELECT id FROM auth.users ORDER BY created_at LIMIT 1);
*/

-- Verify the admin role was set
SELECT 
  id,
  email,
  raw_app_meta_data->>'role' as role,
  raw_user_meta_data->>'full_name' as full_name,
  created_at
FROM auth.users 
WHERE raw_app_meta_data->>'role' = 'admin';

-- Note: After running this script, the user will need to sign out and sign back in
-- for the role change to take effect in their session.