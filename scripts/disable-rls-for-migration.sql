-- Temporarily disable RLS for migration
-- Run this before migration, then run enable-rls-after-migration.sql after

ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags DISABLE ROW LEVEL SECURITY;

-- Note: Keep users, likes, and comments RLS enabled for security
-- ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.likes DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;