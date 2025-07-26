-- Migration 007: Update Category Names
-- This migration updates category names from 'House' to 'Build' and 'Home' to 'Family'

-- Update category names and slugs
UPDATE public.categories 
SET 
  name = 'Build',
  slug = 'build',
  description = 'Posts about building, construction, architecture, and development projects'
WHERE name = 'House';

UPDATE public.categories 
SET 
  name = 'Family',
  slug = 'family',
  description = 'Posts about family life, relationships, and household management'
WHERE name = 'Home';

-- Verify the updates (this will show in the migration log)
SELECT name, slug, description FROM public.categories WHERE name IN ('Build', 'Family');

-- Rollback instructions (commented out):
-- To rollback this migration, run:
-- UPDATE public.categories SET name = 'House', slug = 'house', description = 'Posts about house-related topics, architecture, and home structure' WHERE name = 'Build';
-- UPDATE public.categories SET name = 'Home', slug = 'home', description = 'Posts about home life, interior design, and household management' WHERE name = 'Family';