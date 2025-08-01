import type { APIRoute } from 'astro';
import { createServerClient } from '@supabase/ssr';

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    // Create server client exactly like middleware does
    const supabase = createServerClient(
      import.meta.env.PUBLIC_SUPABASE_URL!,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(key) {
            return cookies.get(key)?.value;
          },
          set(key, value, options) {
            cookies.set(key, value, options);
          },
          remove(key, options) {
            cookies.delete(key, options);
          },
        },
      }
    );

    // Try to get session
    const { data: { session }, error } = await supabase.auth.getSession();
    const user = session?.user || null;

    // Get all cookies from request
    const allCookies = request.headers.get('cookie') || '';
    const supabaseCookies = allCookies
      .split(';')
      .map(c => c.trim())
      .filter(c => c.includes('supabase') || c.includes('sb-'))
      .join('; ');

    return new Response(JSON.stringify({
      hasSession: !!session,
      hasUser: !!user,
      userId: user?.id || null,
      email: user?.email || null,
      userMetadata: user?.user_metadata || null,
      appMetadata: user?.app_metadata || null,
      sessionError: error?.message || null,
      supabaseCookies: supabaseCookies || 'No Supabase cookies found',
      allCookies: allCookies || 'No cookies found',
      timestamp: new Date().toISOString()
    }, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, null, 2), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};