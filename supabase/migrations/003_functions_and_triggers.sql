-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get post statistics
CREATE OR REPLACE FUNCTION public.get_post_stats(post_uuid UUID)
RETURNS TABLE (
  like_count BIGINT,
  comment_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM public.likes WHERE post_id = post_uuid) as like_count,
    (SELECT COUNT(*) FROM public.comments WHERE post_id = post_uuid AND is_approved = true) as comment_count;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user has liked a post
CREATE OR REPLACE FUNCTION public.user_has_liked_post(post_uuid UUID, user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  IF user_uuid IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN EXISTS (
    SELECT 1 FROM public.likes 
    WHERE post_id = post_uuid AND user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql;

-- Function to toggle like on a post
CREATE OR REPLACE FUNCTION public.toggle_post_like(post_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_uuid UUID := auth.uid();
  like_exists BOOLEAN;
BEGIN
  -- Check if user is authenticated
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to like posts';
  END IF;
  
  -- Check if like already exists
  SELECT EXISTS(
    SELECT 1 FROM public.likes 
    WHERE post_id = post_uuid AND user_id = user_uuid
  ) INTO like_exists;
  
  IF like_exists THEN
    -- Remove like
    DELETE FROM public.likes 
    WHERE post_id = post_uuid AND user_id = user_uuid;
    RETURN false;
  ELSE
    -- Add like
    INSERT INTO public.likes (post_id, user_id) 
    VALUES (post_uuid, user_uuid);
    RETURN true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get published posts with stats
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
  tags TEXT[]
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
    COALESCE(t.tag_names, ARRAY[]::TEXT[]) as tags
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
  WHERE p.is_draft = false AND p.published_at IS NOT NULL
  ORDER BY p.published_at DESC
  LIMIT limit_count OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Function to search posts
CREATE OR REPLACE FUNCTION public.search_posts(
  search_query TEXT,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  description TEXT,
  hero_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  author_name TEXT,
  rank REAL
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
    ts_rank(p.search_vector, plainto_tsquery('english', search_query)) as rank
  FROM public.posts p
  LEFT JOIN public.users u ON p.author_id = u.id
  WHERE 
    p.is_draft = false 
    AND p.published_at IS NOT NULL
    AND p.search_vector @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC, p.published_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;