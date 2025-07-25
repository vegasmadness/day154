# Blog Content Migration Guide

This guide explains how to migrate existing blog content from markdown files to Supabase.

## Prerequisites

1. Supabase project set up with the database schema from `src/lib/database.ts`
2. Environment variables configured in `.env`:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
3. **Create a user account first**:
   - Go to your app at `http://localhost:4321/signup`
   - Create an account (this will be used as the author for migrated posts)
   - Or use an existing user account in your Supabase project

## Migration Steps

### Step 1: Prepare the Database

First, temporarily disable Row Level Security (RLS) for the migration:

```bash
# Run this SQL in your Supabase SQL editor or via psql
psql -h your-db-host -U postgres -d postgres -f scripts/disable-rls-for-migration.sql
```

Or copy and paste the contents of `disable-rls-for-migration.sql` into your Supabase SQL editor.

### Step 2: Run the Migration

```bash
cd scripts
node migrate-content.js
```

The script will:
- Read all markdown files from `src/content/blog/`
- Parse frontmatter and content
- Create tags as needed
- Insert posts into the database
- Link posts with tags

### Step 3: Re-enable Security

After successful migration, re-enable RLS:

```bash
# Run this SQL in your Supabase SQL editor or via psql
psql -h your-db-host -U postgres -d postgres -f scripts/enable-rls-after-migration.sql
```

Or copy and paste the contents of `enable-rls-after-migration.sql` into your Supabase SQL editor.

## What Gets Migrated

- **Posts**: Title, slug, description, content, hero image, publication date, draft status
- **Tags**: Extracted from frontmatter, created with slugs and descriptions
- **Post-Tag Relationships**: Links between posts and their tags

## Frontmatter Mapping

| Markdown Frontmatter | Database Field |
|---------------------|----------------|
| `title` | `posts.title` |
| `description` | `posts.description` |
| `pubDate` | `posts.published_at` |
| `heroImage` | `posts.hero_image` |
| `tags` | `tags.name` + `post_tags` relationship |
| `draft` | `posts.is_draft` |

## Troubleshooting

### "new row violates row-level security policy"
- Make sure you ran `disable-rls-for-migration.sql` first
- Verify your Supabase connection is working

### "No users found in database"
- Create at least one user in the `users` table before running migration
- The script uses the first user it finds as the author for all posts

### "Failed to create tag" or "Failed to create post"
- Check your database schema matches `src/lib/database.ts`
- Verify all required fields are present
- Check Supabase logs for detailed error messages

## Post-Migration

After successful migration:
1. Verify posts appear in your Supabase dashboard
2. Test that your blog application can read the migrated content
3. Consider backing up your original markdown files
4. Update your application to use Supabase as the content source

## Files Created

- `migrate-content.js` - Main migration script
- `disable-rls-for-migration.sql` - Temporarily disables RLS
- `enable-rls-after-migration.sql` - Re-enables RLS after migration
- `MIGRATION_GUIDE.md` - This guide