// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://storyhub-blog.netlify.app', // Update this to your actual domain
  output: 'server', // Enable server-side rendering for dynamic routes
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});