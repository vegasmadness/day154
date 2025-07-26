-- Migration 005: Update Category Colors
-- This migration updates the category colors to the new color scheme

-- Update category colors to the new scheme
UPDATE public.categories 
SET color = '#EEADA7'
WHERE name = 'House';

UPDATE public.categories 
SET color = '#80E3CD'
WHERE name = 'Home';

UPDATE public.categories 
SET color = '#F9F48C'
WHERE name = 'Health';

-- Ensure categories are in the correct order by updating their names if needed
-- and making sure they exist with the right order
DELETE FROM public.categories WHERE name NOT IN ('House', 'Home', 'Health');

-- Insert categories if they don't exist (with correct order)
INSERT INTO public.categories (name, slug, description, color) 
VALUES 
  ('House', 'house', 'Posts about house-related topics, architecture, and home structure', '#EEADA7'),
  ('Home', 'home', 'Posts about home life, interior design, and household management', '#80E3CD'),
  ('Health', 'health', 'Posts about health, wellness, and lifestyle topics', '#F9F48C')
ON CONFLICT (name) DO UPDATE SET 
  color = EXCLUDED.color,
  description = EXCLUDED.description;

-- Update the get_all_categories function to return categories in the specified order
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
  ORDER BY 
    CASE c.name 
      WHEN 'House' THEN 1
      WHEN 'Home' THEN 2
      WHEN 'Health' THEN 3
      ELSE 4
    END;
END;
$$ LANGUAGE plpgsql;