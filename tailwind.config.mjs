/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // StoryHub-inspired color palette
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899', // Main pink accent
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151', // Dark gray for headings
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          pink: '#ec4899',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          green: '#10b981',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            lineHeight: '1.6',
            h1: {
              color: '#111827',
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              color: '#111827',
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h3: {
              color: '#111827',
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: '600',
            },
            a: {
              color: '#ec4899',
              '&:hover': {
                color: '#db2777',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}