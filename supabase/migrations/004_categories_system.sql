-- Migration 004: Add Categories System
-- This migration adds categories functionality alongside existing tags

-- Create categories table
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6B7280', -- Default gray color for category badges
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_categories junction table
CREATE TABLE public.post_categories (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Create indexes for better performance
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_name ON public.categories(name);
CREATE INDEX idx_post_categories_post ON public.post_categories(post_id);
CREATE INDEX idx_post_categories_category ON public.post_categories(category_id);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;

-- Categories table policies
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create categories" ON public.categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update categories" ON public.categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete categories" ON public.categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- Post_categories table policies
CREATE POLICY "Anyone can view post categories" ON public.post_categories
  FOR SELECT USING (true);

CREATE POLICY "Authors can manage post categories" ON public.post_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.posts 
      WHERE posts.id = post_categories.post_id 
      AND posts.author_id = auth.uid()
    )
  );

-- Apply updated_at trigger to categories
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert the three main categories requested
INSERT INTO public.categories (name, slug, description, color) VALUES
  ('House', 'house', 'Posts about house-related topics, architecture, and home structure', '#3B82F6'),
  ('Home', 'home', 'Posts about home life, interior design, and household management', '#10B981'),
  ('Health', 'health', 'Posts about health, wellness, and lifestyle topics', '#EF4444');

-- Drop existing function first to avoid return type conflict
DROP FUNCTION IF EXISTS public.get_published_posts(INTEGER, INTEGER);

-- Update the get_published_posts function to include categories
CREATE OR REPLACE FUNCTION public.get_published_posts(
  limit_count INTEGER DEFAULT 10,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  description TEXT,
  hero_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  author_name TEXT,
  author_avatar TEXT,
  like_count BIGINT,
  comment_count BIGINT,
  tags TEXT[],
  categories TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.description,
    p.hero_image,
    p.published_at,
    u.full_name as author_name,
    u.avatar_url as author_avatar,
    COALESCE(l.like_count, 0) as like_count,
    COALESCE(c.comment_count, 0) as comment_count,
    COALESCE(t.tag_names, ARRAY[]::TEXT[]) as tags,
    COALESCE(cat.category_names, ARRAY[]::TEXT[]) as categories
  FROM public.posts p
  LEFT JOIN public.users u ON p.author_id = u.id
  LEFT JOIN (
    SELECT post_id, COUNT(*) as like_count
    FROM public.likes
    GROUP BY post_id
  ) l ON p.id = l.post_id
  LEFT JOIN (
    SELECT post_id, COUNT(*) as comment_count
    FROM public.comments
    WHERE is_approved = true
    GROUP BY post_id
  ) c ON p.id = c.post_id
  LEFT JOIN (
    SELECT pt.post_id, ARRAY_AGG(t.name) as tag_names
    FROM public.post_tags pt
    JOIN public.tags t ON pt.tag_id = t.id
    GROUP BY pt.post_id
  ) t ON p.id = t.post_id
  LEFT JOIN (
    SELECT pc.post_id, ARRAY_AGG(cat.name) as category_names
    FROM public.post_categories pc
    JOIN public.categories cat ON pc.category_id = cat.id
    GROUP BY pc.post_id
  ) cat ON p.id = cat.post_id
  WHERE p.is_draft = false AND p.published_at IS NOT NULL
  ORDER BY p.published_at DESC
  LIMIT limit_count OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to get all categories
CREATE OR REPLACE FUNCTION public.get_all_categories()
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  description TEXT,
  color TEXT,
  post_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.slug,
    c.description,
    c.color,
    COALESCE(pc.post_count, 0) as post_count
  FROM public.categories c
  LEFT JOIN (
    SELECT category_id, COUNT(*) as post_count
    FROM public.post_categories pc
    JOIN public.posts p ON pc.post_id = p.id
    WHERE p.is_draft = false AND p.published_at IS NOT NULL
    GROUP BY category_id
  ) pc ON c.id = pc.category_id
  ORDER BY c.name;
END;
$$ LANGUAGE plpgsql;