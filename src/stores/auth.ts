import { atom } from 'nanostores';
import type { User, Session } from '@supabase/supabase-js';
import { supabaseBrowser } from '../utils/supabase-browser';
import type { AuthState } from '../utils/auth';

// Auth state store
export const authStore = atom<AuthState>({
  user: null,
  session: null,
  loading: true,
});

// Initialize auth state
export async function initAuth() {
  try {
    // Get initial session
    const { data: { session }, error } = await supabaseBrowser.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
    }

    authStore.set({
      user: session?.user ?? null,
      session,
      loading: false,
    });

    // Listen for auth changes
    supabaseBrowser.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      authStore.set({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });
  } catch (error) {
    console.error('Error initializing auth:', error);
    authStore.set({
      user: null,
      session: null,
      loading: false,
    });
  }
}

// Helper functions to get current auth state
export function getAuthState(): AuthState {
  return authStore.get();
}

export function getCurrentUser(): User | null {
  return authStore.get().user;
}

export function getCurrentSession(): Session | null {
  return authStore.get().session;
}

export function isAuthenticated(): boolean {
  return authStore.get().user !== null;
}

export function isLoading(): boolean {
  return authStore.get().loading;
}