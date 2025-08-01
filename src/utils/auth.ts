import { supabaseBrowser } from './supabase-browser';
import type { User, Session } from '@supabase/supabase-js';

// Auth state management
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

// Sign up with email and password
export async function signUp(email: string, password: string, fullName?: string) {
  const { data, error } = await supabaseBrowser.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  return { data, error };
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

// Sign out
export async function signOut() {
  const { error } = await supabaseBrowser.auth.signOut();
  return { error };
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabaseBrowser.auth.getUser();
  return { user, error };
}

// Get current session
export async function getCurrentSession() {
  const { data: { session }, error } = await supabaseBrowser.auth.getSession();
  return { session, error };
}

// Reset password
export async function resetPassword(email: string) {
  const { data, error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  return { data, error };
}

// Update password
export async function updatePassword(password: string) {
  const { data, error } = await supabaseBrowser.auth.updateUser({
    password,
  });

  return { data, error };
}

// Update user profile
export async function updateProfile(updates: {
  full_name?: string;
  avatar_url?: string;
}) {
  const { data, error } = await supabaseBrowser.auth.updateUser({
    data: updates,
  });

  return { data, error };
}

// Check if user is authenticated
export function isAuthenticated(user: User | null): boolean {
  return user !== null;
}

// Check if user is admin (you can customize this logic)
export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  // Add your admin check logic here
  // For example, check user metadata or role
  return user.user_metadata?.role === 'admin' || user.email === 'admin@example.com';
}

// Auth event listener helper
export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabaseBrowser.auth.onAuthStateChange(callback);
}