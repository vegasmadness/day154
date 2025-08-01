# Admin User Setup Guide

This guide explains how to resolve the "Access denied. Admin privileges required." error by setting up admin users in your Supabase database.

## Problem

The authentication system checks for an `admin` role in the user's metadata, but no users have been assigned this role yet. The database migration scripts create the user structure but don't automatically assign admin privileges.

## Solution

### Step 1: Create a User Account

First, create a user account through your application:

1. Go to `http://localhost:4322/auth/signup` (or whatever port your dev server is running on)
2. Sign up with your email and password
3. Verify your email if required

### Step 2: Assign Admin Role

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Open the `create-admin-user.sql` script from this directory
4. **Option A**: Replace `'your-email@example.com'` with your actual email address in the script
5. **Option B**: Uncomment the second option to make the first user in the system an admin
6. Run the SQL script

### Step 3: Refresh Your Session

1. Sign out of your application
2. Sign back in with the same credentials
3. You should now have admin access

## Verification

After running the script, you can verify the admin role was assigned by checking the query results in the SQL editor. You should see your user with `role: "admin"`.

## Technical Details

The admin role is stored in the `raw_app_meta_data` field of the `auth.users` table. The application checks for this role in:

- `src/utils/auth.ts` - `isAdmin()` function
- `src/middleware.ts` - Server-side route protection
- `src/components/AuthGuard.astro` - Client-side protection

## Troubleshooting

- **Still getting access denied**: Make sure you signed out and back in after running the SQL script
- **SQL script fails**: Ensure you're using the correct email address and that the user exists
- **Can't access Supabase dashboard**: Check your project URL and credentials in your `.env` file

## Security Note

Only assign admin roles to trusted users. Admin users have full access to the admin panel and can manage all content.