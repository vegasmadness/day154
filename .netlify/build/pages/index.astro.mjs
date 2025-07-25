import { d as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D-9eq0G_.mjs';
import { s as supabase } from '../chunks/supabase_8aLQgMSH.mjs';
export { renderers } from '../renderers.mjs';

function formatDate(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: allPosts, error } = await supabase.from("posts").select("*").eq("is_draft", false).order("published_at", { ascending: false });
  if (error) {
    console.error("Error fetching posts:", error);
  }
  const transformedPosts = (allPosts || []).map((post) => ({
    slug: post.slug,
    body: post.content || "",
    data: {
      title: post.title,
      description: post.description,
      pubDate: new Date(post.published_at || post.created_at),
      heroImage: post.hero_image,
      tags: [],
      // TODO: Implement tags from post_tags table
      draft: post.is_draft
    }
  }));
  const featuredPost = transformedPosts[0];
  const latestPosts = transformedPosts.slice(1, 4);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "StoryHub", "description": "Stay on the story with StoryHub - A modern blog featuring engaging stories, insights, and creative content that keeps you engaged and inspired." }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative bg-white py-20 md:py-32 lg:py-40"> <!-- Subtle background pattern --> <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50/30"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center"> <!-- Main Headline --> <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-gray-900 mb-8 leading-tight">
Stay on the
<span class="text-primary-500 relative">
story
<!-- Decorative underline --> <svg class="absolute -bottom-2 left-0 w-full h-3 text-primary-200" viewBox="0 0 200 12" fill="currentColor" preserveAspectRatio="none"> <path d="M0,8 Q50,2 100,6 T200,4 L200,12 L0,12 Z"></path> </svg> </span> </h1> <!-- Subtitle --> <p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
Welcome to StoryHub where I share stories about web development,
          design, and technology. Discover insights, tutorials, and creative
          content that keeps you engaged and inspired.
</p> <!-- Social Media Icons --> <div class="flex justify-center items-center space-x-8"> <!-- Facebook --> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="group text-gray-400 hover:text-primary-500 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Facebook"> <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg> </a> <!-- Instagram --> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="group text-gray-400 hover:text-primary-500 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Instagram"> <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path> </svg> </a> <!-- Twitter/X --> <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="group text-gray-400 hover:text-primary-500 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Twitter"> <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path> </svg> </a> <!-- GitHub --> <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="group text-gray-400 hover:text-primary-500 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on GitHub"> <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path> </svg> </a> </div> </div> </div> <!-- Decorative elements --> <div class="absolute top-10 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-50 blur-xl"></div> <div class="absolute bottom-10 right-10 w-32 h-32 bg-accent-purple/20 rounded-full opacity-30 blur-2xl"></div> </section>  <section class="py-16 bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Story</h2> ${featuredPost && renderTemplate`<article class="max-w-4xl mx-auto"> <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"> ${featuredPost.data.heroImage && renderTemplate`<div class="aspect-video overflow-hidden"> <img${addAttribute(featuredPost.data.heroImage, "src")}${addAttribute(featuredPost.data.title, "alt")} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"> </div>`} <div class="p-8"> <div class="flex items-center gap-4 mb-4"> <time class="text-sm text-gray-500"> ${formatDate(featuredPost.data.pubDate)} </time> ${featuredPost.data.tags && renderTemplate`<div class="flex gap-2"> ${featuredPost.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"> ${tag} </span>`)} </div>`} </div> <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors"> <a${addAttribute(`/blog/${featuredPost.slug}`, "href")}> ${featuredPost.data.title} </a> </h3> <p class="text-gray-600 text-lg mb-6 leading-relaxed"> ${featuredPost.data.description} </p> <a${addAttribute(`/blog/${featuredPost.slug}`, "href")} class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors">
Read more
<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> </article>`} </div> </section>  <section class="py-16 bg-gray-50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Stories</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${latestPosts.map((post) => renderTemplate`<article class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"> ${post.data.heroImage && renderTemplate`<div class="aspect-video overflow-hidden"> <img${addAttribute(post.data.heroImage, "src")}${addAttribute(post.data.title, "alt")} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"> </div>`} <div class="p-6"> <div class="flex items-center gap-3 mb-3"> <time class="text-sm text-gray-500"> ${formatDate(post.data.pubDate)} </time> ${post.data.tags && post.data.tags[0] && renderTemplate`<span class="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"> ${post.data.tags[0]} </span>`} </div> <h3 class="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors"> <a${addAttribute(`/blog/${post.slug}`, "href")}> ${post.data.title} </a> </h3> <p class="text-gray-600 mb-4 leading-relaxed"> ${post.data.description} </p> <a${addAttribute(`/blog/${post.slug}`, "href")} class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
Read more
<svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </article>`)} </div> ${latestPosts.length === 0 && renderTemplate`<p class="text-center text-gray-600">No posts available yet. Check back soon!</p>`} <div class="text-center mt-12"> <a href="/blog" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
View All Posts
<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> </section> ` })}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/index.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
