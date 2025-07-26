-- Migration 006: Add scheduled_at column to posts table
-- This migration adds the scheduled_at column to support post scheduling functionality

-- Add scheduled_at column to posts table
ALTER TABLE public.posts 
ADD COLUMN scheduled_at TIMESTAMP WITH TIME ZONE;

-- Create index for scheduled posts for better performance
CREATE INDEX idx_posts_scheduled_at ON public.posts(scheduled_at) WHERE scheduled_at IS NOT NULL;

-- Add comment to document the column purpose
COMMENT ON COLUMN public.posts.scheduled_at IS 'Timestamp when a post is scheduled to be published automatically';

-- Update the existing index to include scheduled posts in published posts query
DROP INDEX IF EXISTS idx_posts_published_at;
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC) 
WHERE NOT is_draft AND (published_at IS NOT NULL OR scheduled_at IS NOT NULL);

-- Verification query (commented out for production)
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'posts' AND column_name = 'scheduled_at';