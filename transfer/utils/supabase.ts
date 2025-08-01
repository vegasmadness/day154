import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// Environment variable validation with security checks
function validateEnvironmentVariables() {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  
  // Check if variables exist
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing required Supabase environment variables: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY')
  }
  
  // Validate URL format
  try {
    const url = new URL(supabaseUrl)
    if (!url.hostname.includes('supabase.co') && !url.hostname.includes('localhost')) {
      console.warn('Warning: Supabase URL does not appear to be a valid Supabase endpoint')
    }
  } catch (error) {
    throw new Error('Invalid Supabase URL format')
  }
  
  // Validate key format (basic check)
  if (supabaseAnonKey.length < 100) {
    throw new Error('Supabase anonymous key appears to be invalid (too short)')
  }
  
  // Security check: ensure we're not accidentally using service role key in client
  if (supabaseAnonKey.includes('service_role')) {
    throw new Error('SECURITY ERROR: Service role key detected in client-side code! Use PUBLIC_SUPABASE_ANON_KEY instead.')
  }
  
  return { supabaseUrl, supabaseAnonKey }
}

// Validate and get environment variables
const { supabaseUrl, supabaseAnonKey } = validateEnvironmentVariables()

// Create Supabase client with additional security options
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' // Use PKCE flow for better security
  },
  global: {
    headers: {
      'X-Client-Info': 'my-blog-app'
    }
  }
})

// Re-export types for convenience
export type { Database, User, Post, Tag, Like, Comment, Media, PostWithStats, CommentWithAuthor, MediaInsert, MediaUpdate } from '../types/database'