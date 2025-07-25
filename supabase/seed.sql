-- Seed data for testing the blog migration

-- Insert some sample tags
INSERT INTO public.tags (name, slug, description) VALUES
  ('Astro', 'astro', 'Posts about the Astro web framework'),
  ('React', 'react', 'Posts about React development'),
  ('TypeScript', 'typescript', 'Posts about TypeScript programming'),
  ('Supabase', 'supabase', 'Posts about Supabase backend services'),
  ('Web Development', 'web-development', 'General web development topics'),
  ('Tutorial', 'tutorial', 'Step-by-step tutorials and guides'),
  ('Migration', 'migration', 'Posts about migrating between technologies')
ON CONFLICT (slug) DO NOTHING;

-- Note: User data will be created automatically when users sign up
-- The handle_new_user() function will populate the users table

-- Sample posts will be added after user authentication is set up
-- For now, we'll create a placeholder that can be updated later

-- Insert a sample comment structure (will be populated after posts exist)
-- This is just to show the schema works

-- Create some sample data that doesn't require authentication
-- This helps verify the database structure is working

-- Note: This seed script should be run AFTER you have created at least one user
-- through the normal Supabase Auth signup process (via your app's signup form)
-- The migration script will use the first user it finds in the database

-- If you need to create a user for testing, you can:
-- 1. Use your app's signup form at http://localhost:4321/signup
-- 2. Or manually insert a user (requires auth.users entry first)

-- For now, we'll just create the sample post structure without a user
-- The migration script will handle creating posts with proper user associations

DO $$
DECLARE
  sample_post_id UUID;
  astro_tag_id UUID;
  supabase_tag_id UUID;
BEGIN
  -- Only create sample data if we have users in the system
  IF EXISTS (SELECT 1 FROM public.users LIMIT 1) THEN
    DECLARE
      sample_user_id UUID;
    BEGIN
      -- Get the first user
      SELECT id INTO sample_user_id FROM public.users LIMIT 1;
      
      -- Create a sample post
      INSERT INTO public.posts (
        title,
        slug,
        description,
        content,
        published_at,
        is_draft,
        author_id
      )
      VALUES (
        'Welcome to the Migrated Blog',
        'welcome-to-migrated-blog',
        'This is our first post after migrating from Netlify CMS to Supabase',
        '# Welcome to the New Blog\n\nWe have successfully migrated our blog from Netlify CMS to Supabase! This brings us many new features:\n\n## New Features\n\n- **Real-time comments**: Comments now update in real-time\n- **User authentication**: Users can sign up and manage their profiles\n- **Advanced search**: Full-text search across all posts\n- **Like system**: Users can like posts\n- **Tag management**: Better organization with tags\n\n## Technical Stack\n\n- **Frontend**: Astro + React + Tailwind CSS\n- **Backend**: Supabase (PostgreSQL + Auth + Real-time)\n- **Deployment**: Netlify (frontend) + Supabase (backend)\n\nThis migration allows us to have a more dynamic and interactive blog while maintaining the performance benefits of static site generation.',
        NOW(),
        false,
        sample_user_id
      )
      RETURNING id INTO sample_post_id;
      
      -- Get tag IDs
      SELECT id INTO astro_tag_id FROM public.tags WHERE slug = 'astro';
      SELECT id INTO supabase_tag_id FROM public.tags WHERE slug = 'supabase';
      
      -- Associate tags with the post
      INSERT INTO public.post_tags (post_id, tag_id)
      VALUES 
        (sample_post_id, astro_tag_id),
        (sample_post_id, supabase_tag_id);
      
      -- Add a sample comment
      INSERT INTO public.comments (
        post_id,
        author_name,
        author_email,
        content,
        is_approved
      )
      VALUES (
        sample_post_id,
        'Test Commenter',
        'test@example.com',
        'Great post! Looking forward to seeing more content on the new platform.',
        true
      );
      
      RAISE NOTICE 'Sample data created successfully with user ID: %', sample_user_id;
    END;
  ELSE
     RAISE NOTICE 'No users found. Please create a user first through the signup process.';
   END IF;
  
END $$;