/**
 * Security configuration and utilities
 * Centralizes security settings and validation
 */

// Security constants
export const SECURITY_CONFIG = {
  // File upload limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain'
  ],
  
  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS: 100, // per minute
    WINDOW_MS: 60 * 1000, // 1 minute
    ADMIN_MAX_REQUESTS: 200 // higher limit for admin users
  },
  
  // Session security
  SESSION: {
    MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
    SECURE: true, // HTTPS only in production
    HTTP_ONLY: true,
    SAME_SITE: 'strict' as const
  },
  
  // Content Security Policy
  CSP: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    STYLE_SRC: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    IMG_SRC: ["'self'", "data:", "https:"],
    FONT_SRC: ["'self'", "https://fonts.gstatic.com"],
    CONNECT_SRC: ["'self'", "https://*.supabase.co"],
    FRAME_SRC: ["'none'"],
    OBJECT_SRC: ["'none'"],
    BASE_URI: ["'self'"]
  }
} as const

/**
 * Validate environment variables for security
 */
export function validateSecurityEnvironment(): {
  isProduction: boolean
  hasSecrets: boolean
  warnings: string[]
} {
  const warnings: string[] = []
  const isProduction = import.meta.env.PROD
  
  // Check for required environment variables
  const requiredVars = ['PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_ANON_KEY']
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName])
  
  if (missingVars.length > 0) {
    warnings.push(`Missing required environment variables: ${missingVars.join(', ')}`)
  }
  
  // Check for development-specific issues
  if (!isProduction) {
    if (import.meta.env.PUBLIC_SUPABASE_URL?.includes('localhost')) {
      warnings.push('Using local Supabase instance - ensure it\'s properly configured')
    }
  }
  
  // Check for production-specific security requirements
  if (isProduction) {
    if (!import.meta.env.PUBLIC_SUPABASE_URL?.startsWith('https://')) {
      warnings.push('Production Supabase URL should use HTTPS')
    }
  }
  
  const hasSecrets = !!(import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY)
  
  return { isProduction, hasSecrets, warnings }
}

/**
 * Generate Content Security Policy header value
 */
export function generateCSPHeader(): string {
  const csp = SECURITY_CONFIG.CSP
  const directives = [
    `default-src ${csp.DEFAULT_SRC.join(' ')}`,
    `script-src ${csp.SCRIPT_SRC.join(' ')}`,
    `style-src ${csp.STYLE_SRC.join(' ')}`,
    `img-src ${csp.IMG_SRC.join(' ')}`,
    `font-src ${csp.FONT_SRC.join(' ')}`,
    `connect-src ${csp.CONNECT_SRC.join(' ')}`,
    `frame-src ${csp.FRAME_SRC.join(' ')}`,
    `object-src ${csp.OBJECT_SRC.join(' ')}`,
    `base-uri ${csp.BASE_URI.join(' ')}`
  ]
  
  return directives.join('; ')
}

/**
 * Security headers for responses
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': generateCSPHeader()
} as const

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>"'&]/g, (match) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      }
      return entities[match] || match
    })
    .trim()
}

/**
 * Validate and sanitize URL input
 */
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null
    }
    return parsed.toString()
  } catch {
    return null
  }
}

/**
 * Rate limiting store (in-memory for simplicity)
 * In production, use Redis or similar
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Check if request should be rate limited
 */
export function checkRateLimit(identifier: string, maxRequests = SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS): boolean {
  const now = Date.now()
  const windowMs = SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS
  const resetTime = now + windowMs
  
  const current = rateLimitStore.get(identifier)
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    rateLimitStore.set(identifier, { count: 1, resetTime })
    return false // Not rate limited
  }
  
  if (current.count >= maxRequests) {
    return true // Rate limited
  }
  
  // Increment count
  current.count++
  return false // Not rate limited
}

/**
 * Clean up expired rate limit entries
 */
export function cleanupRateLimit(): void {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Clean up rate limit store every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimit, 5 * 60 * 1000)
}