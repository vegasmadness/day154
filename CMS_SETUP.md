# Netlify CMS Setup Guide

This blog is configured with Netlify CMS for easy content management. Follow these steps to get started.

## Initial Setup

### 1. Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy the site

### 2. Enable Netlify Identity

1. Go to your Netlify site dashboard
2. Navigate to **Identity** tab
3. Click **Enable Identity**
4. Under **Settings & usage**, click **Settings**
5. Scroll to **Git Gateway** and click **Enable Git Gateway**

### 3. Configure Authentication

1. In Identity settings, go to **Registration preferences**
2. Set to **Invite only** (recommended for personal blogs)
3. Under **External providers**, enable any desired social logins
4. Save settings

### 4. Access the CMS

1. Visit `https://your-site-name.netlify.app/admin`
2. Click **Login with Netlify Identity**
3. If registration is invite-only, you'll need to invite yourself:
   - Go to Netlify dashboard → Identity → Invite users
   - Enter your email address
   - Check your email and follow the setup link

## Using the CMS

### Creating Blog Posts

1. Navigate to `/admin` on your live site
2. Click **New Blog Posts**
3. Fill in the required fields:
   - **Title**: Your blog post title
   - **Description**: SEO description (appears in search results)
   - **Publish Date**: When the post should be published
   - **Tags**: Comma-separated tags for categorization
   - **Featured Image**: Optional hero image
   - **Body**: Your blog content in Markdown

### Editorial Workflow

The CMS is configured with editorial workflow:

- **Draft**: Save without publishing
- **In Review**: Submit for review
- **Ready**: Approved and ready to publish
- **Published**: Live on the site

### Media Management

- Upload images directly through the CMS interface
- Images are stored in `/public/images/`
- Use the image widget in blog posts for easy insertion
- Recommended image size: 1200x600px for hero images

## Content Schema

Blog posts support these frontmatter fields:

```yaml
---
title: 'Required: Post title'
description: 'Required: SEO description'
pubDate: 2025-01-24T10:00:00.000Z  # Required: ISO date format
updatedDate: 2025-01-25T15:30:00.000Z  # Optional: Update date
heroImage: '/images/hero.jpg'  # Optional: Featured image
tags: ['tag1', 'tag2']  # Optional: Array of tags
draft: false  # Optional: Boolean (default: false)
---
```

## Site Configuration

The CMS can also manage site-wide settings through the **Site Settings** collection:

- Site title and description
- Author information
- Social media links
- Contact information

## Troubleshooting

### Common Issues

1. **Can't access /admin**: Ensure the site is deployed and Identity is enabled
2. **Login fails**: Check that Git Gateway is enabled in Netlify Identity settings
3. **Images won't upload**: Verify media folder permissions and file size limits
4. **Posts don't appear**: Check that `draft: false` and the build completed successfully

### Support

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

## Development

For local development with the CMS:

1. Run `npm run dev` to start the development server
2. The CMS will be available at `http://localhost:4321/admin`
3. You'll need to use a proxy or test on the deployed site for full functionality

## Security Notes

- Keep registration set to "invite only" for personal blogs
- Regularly review user access in Netlify Identity
- Monitor the Git history for any unauthorized changes
- Consider enabling two-factor authentication for your Netlify account