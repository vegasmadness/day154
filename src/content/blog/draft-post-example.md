---
title: 'This is a Draft Post'
description: 'This post demonstrates the draft functionality in our content collection schema.'
pubDate: 2025-01-25
heroImage: '/images/draft-example.jpg'
tags: ['draft', 'example', 'testing']
draft: true
---

# This is a Draft Post

This post is marked as a draft and should not appear in the published blog unless specifically configured to show drafts.

## Draft Functionality

The content collection schema includes a `draft` field that defaults to `false`. When set to `true`, this post can be:
- Hidden from production builds
- Shown only in development
- Used for content review workflows

## Testing the Schema

This post tests various aspects of our content collection:
- ✅ Title field (required string)
- ✅ Description field (required string)  
- ✅ Publication date (required date)
- ✅ Hero image (optional string)
- ✅ Tags array (optional array of strings)
- ✅ Draft flag (boolean with default false)

## Content Validation

The Zod schema ensures that:
1. All required fields are present
2. Data types are correct
3. Optional fields can be omitted
4. Default values are applied

This helps maintain content quality and prevents build errors from malformed frontmatter.