import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from '@supabase/ssr';
import { SECURITY_HEADERS, checkRateLimit, validateSecurityEnvironment } from './utils/security';

// Define protected routes that require authentication
const PROTECTED_ROUTES = [
  '/admin/dashboard',
  '/admin/posts',
  '/admin/media',
  '/admin/comments',
  '/admin/categories',
  '/admin/tags',
  '/admin/settings'
];

// Define routes that should redirect authenticated users (like login page)
const AUTH_ROUTES = ['/admin', '/admin/login', '/auth/login'];

// Validate security environment on startup
const securityCheck = validateSecurityEnvironment();
if (securityCheck.warnings.length > 0) {
  console.warn('Security warnings:', securityCheck.warnings);
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect, cookies, clientAddress } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Get client IP for rate limiting
  const clientIP = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';

  // Skip middleware for API routes and static assets
  if (pathname.startsWith('/api/') || 
      pathname.startsWith('/_') || 
      pathname.includes('.')) {
    return next();
  }

  // Rate limiting check
  if (checkRateLimit(clientIP)) {
    return new Response('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60',
        ...SECURITY_HEADERS
      }
    });
  }

  // Validate environment variables
  if (!securityCheck.hasSecrets) {
    console.error('Missing required environment variables');
    return new Response('Server Configuration Error', { status: 500 });
  }

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

  // Get the authenticated user (secure method)
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Auth error:', error.message);
  }

  // Check if current route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => {
    if (route.endsWith('/')) {
      return pathname === route || pathname.startsWith(route);
    }
    return pathname === route || pathname.startsWith(route + '/');
  });

  // Check if current route is an auth route (login page)
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  // Handle protected routes
  if (isProtectedRoute) {
    if (!user) {
      // No user session, redirect to login
      return redirect('/admin');
    }

    // Check if user has admin role (server-side validation)
    const userRole = user.user_metadata?.role;
    const appRole = user.app_metadata?.role;
    const isAdmin = userRole === 'admin' || appRole === 'admin';
    
    // Debug logging to see what's in the user object
    console.log('User metadata check:', {
      userId: user.id,
      email: user.email,
      userRole,
      appRole,
      isAdmin,
      fullUserMetadata: user.user_metadata,
      fullAppMetadata: user.app_metadata
    });

    if (!isAdmin) {
      // User is authenticated but not admin, redirect to unauthorized page
      return redirect('/?error=unauthorized');
    }
  }

  // Handle auth routes (redirect authenticated users away from login)
  // But don't redirect if they're already on a protected route
  if (isAuthRoute && user && !isProtectedRoute) {
    const userRole = user.user_metadata?.role;
    const appRole = user.app_metadata?.role;
    const isAdmin = userRole === 'admin' || appRole === 'admin';
    
    // Debug logging for auth route check
    console.log('Auth route redirect check:', {
      userId: user.id,
      email: user.email,
      userRole,
      appRole,
      isAdmin,
      pathname,
      isProtectedRoute
    });
    
    if (isAdmin) {
      return redirect('/admin/dashboard');
    }
  }

  // Continue to the requested page and add security headers to response
  const response = await next();
  
  // Add security headers to all responses
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
});