import type { APIRoute } from 'astro';
import { createServerClient } from '@supabase/ssr';

export const GET: APIRoute = async ({ request, cookies }) => {
  // Create Supabase client for server-side auth
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

  try {
    // Get the current session
    const { data: { session }, error } = await supabase.auth.getSession();
    const user = session?.user || null;

    // Debug information
    const debugInfo = {
      hasSession: !!session,
      hasUser: !!user,
      userId: user?.id || null,
      email: user?.email || null,
      userMetadata: user?.user_metadata || null,
      appMetadata: user?.app_metadata || null,
      sessionError: error?.message || null,
      cookies: {
        // List all cookies that start with 'sb-'
        supabaseCookies: Object.fromEntries(
          Array.from(request.headers.entries())
            .filter(([key]) => key.toLowerCase() === 'cookie')
            .flatMap(([, value]) => 
              value.split(';')
                .map(cookie => cookie.trim().split('='))
                .filter(([name]) => name.startsWith('sb-'))
            )
        )
      }
    };

    return new Response(JSON.stringify(debugInfo, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};