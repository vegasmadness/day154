import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.error('Required: PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or PUBLIC_SUPABASE_ANON_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Helper function to create tag slug
function createTagSlug(tagName) {
  return tagName
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

async function getOrCreateTag(tagName) {
  const tagSlug = createTagSlug(tagName);
  
  // Check if tag exists
  const { data: existingTag, error: fetchError } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', tagSlug)
    .single();
    
  if (existingTag) {
    return existingTag.id;
  }
  
  // Create new tag with direct insert
  const { data: newTag, error: createError } = await supabase
    .from('tags')
    .insert({
      name: tagName,
      slug: tagSlug,
      description: `Posts tagged with ${tagName}`
    })
    .select('id')
    .single();
    
  if (createError) {
    console.error(`Failed to create tag "${tagName}":`, createError);
    throw createError;
  }
  
  console.log(`✅ Created tag: ${tagName}`);
  return newTag.id;
}

async function migratePost(filePath, authorId) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);
  
  const slug = createSlug(frontmatter.title);
  
  console.log(`\n📝 Processing: ${frontmatter.title}`);
  
  // Check if post already exists
  const { data: existingPost } = await supabase
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .single();
    
  if (existingPost) {
    console.log(`⚠️  Post "${frontmatter.title}" already exists, skipping...`);
    return existingPost.id;
  }
  
  // Create the post with direct insert
  const { data: newPost, error: postError } = await supabase
    .from('posts')
    .insert({
      title: frontmatter.title,
      slug: slug,
      description: frontmatter.description || null,
      content: content,
      hero_image: frontmatter.heroImage || null,
      published_at: frontmatter.draft ? null : frontmatter.pubDate,
      is_draft: frontmatter.draft || false,
      author_id: authorId
    })
    .select('id')
    .single();
    
  if (postError) {
    console.error(`Error creating post "${frontmatter.title}":`, postError);
    throw postError;
  }
  
  console.log(`✅ Created post: ${frontmatter.title}`);
  const postId = newPost.id;
  
  // Handle tags
  if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
    for (const tagName of frontmatter.tags) {
      try {
        const tagId = await getOrCreateTag(tagName);
        
        const { error: tagError } = await supabase
          .from('post_tags')
          .insert({
            post_id: postId,
            tag_id: tagId
          });
          
        if (tagError) {
          console.error(`Error linking tag "${tagName}" to post:`, tagError);
        } else {
          console.log(`  🏷️  Tagged with: ${tagName}`);
        }
      } catch (error) {
        console.error(`Error processing tag "${tagName}":`, error);
      }
    }
  }
  
  return postId;
}

async function getAuthorId() {
  // Get the first user from the database as the author
  const { data: users, error } = await supabase
    .from('users')
    .select('id, email')
    .limit(1);
    
  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
  
  if (!users || users.length === 0) {
    console.error('No users found in database. Please create a user first.');
    console.log('You can create a user by signing up at: http://localhost:4321/auth/signup');
    process.exit(1);
  }
  
  console.log(`👤 Found user: ${users[0].email}`);
  return users[0].id;
}

async function main() {
  try {
    console.log('🚀 Starting blog content migration to Supabase...');
    console.log('⚠️  Note: Make sure to run disable-rls-for-migration.sql first!');
    
    // Get author ID
    const authorId = await getAuthorId();
    console.log(`👤 Using author ID: ${authorId}`);
    
    // Get all markdown files from content/blog directory
    const contentDir = path.join(__dirname, '../src/content/blog');
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(contentDir, file));
      
    console.log(`📁 Found ${files.length} blog posts to migrate`);
    
    let successCount = 0;
    let skipCount = 0;
    
    // Process each file
    for (const filePath of files) {
      try {
        const postId = await migratePost(filePath, authorId);
        if (postId) {
          successCount++;
        }
      } catch (error) {
        console.error(`❌ Failed to migrate ${path.basename(filePath)}:`, error);
        skipCount++;
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`✅ Successfully migrated: ${successCount} posts`);
    console.log(`⚠️  Skipped: ${skipCount} posts`);
    
    // Display summary
    const { data: posts, error: countError } = await supabase
      .from('posts')
      .select('id, title, is_draft')
      .order('created_at', { ascending: false });
      
    if (!countError && posts) {
      console.log(`\n📊 Database now contains ${posts.length} total posts:`);
      posts.forEach(post => {
        const status = post.is_draft ? '📝 Draft' : '✅ Published';
        console.log(`  ${status}: ${post.title}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
main();