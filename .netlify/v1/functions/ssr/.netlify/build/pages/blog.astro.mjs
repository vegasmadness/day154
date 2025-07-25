import { c as createAstro, d as createComponent, m as maybeRenderHead, f as addAttribute, r as renderTemplate, i as renderComponent } from '../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D-9eq0G_.mjs';
import 'clsx';
/* empty css                                */
import { s as supabase } from '../chunks/supabase_8aLQgMSH.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://storyhub-blog.netlify.app");
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { post, featured = false, className = "" } = Astro2.props;
  const { title, description, pubDate, heroImage, tags } = post.data;
  const content = post.body || "";
  const wordCount = content ? content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(pubDate);
  const tagColors = [
    "bg-primary-500 text-white",
    "bg-accent-blue text-white",
    "bg-accent-green text-white",
    "bg-accent-purple text-white",
    "bg-gray-700 text-white"
  ];
  const getTagColor = (index) => tagColors[index % tagColors.length];
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden ${featured ? "md:col-span-2 lg:col-span-1" : ""} ${className}`, "class")} data-astro-cid-e3grugc2> <!-- Featured Image --> ${heroImage && renderTemplate`<div class="relative overflow-hidden" data-astro-cid-e3grugc2> <img${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} class="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" data-astro-cid-e3grugc2> ${featured && renderTemplate`<div class="absolute top-4 left-4" data-astro-cid-e3grugc2> <span class="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium" data-astro-cid-e3grugc2>
Featured
</span> </div>`} </div>`} <!-- Card Content --> <div class="p-6" data-astro-cid-e3grugc2> <!-- Meta Information --> <div class="flex items-center gap-3 text-sm text-gray-500 mb-3" data-astro-cid-e3grugc2> <time${addAttribute(pubDate.toISOString(), "datetime")} data-astro-cid-e3grugc2> ${formattedDate} </time> <span data-astro-cid-e3grugc2>•</span> <span data-astro-cid-e3grugc2>${readingTime} min read</span> </div> <!-- Tags --> ${tags && tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-4" data-astro-cid-e3grugc2> ${tags.slice(0, 3).map((tag, index) => renderTemplate`<span${addAttribute(`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(index)}`, "class")} data-astro-cid-e3grugc2>
#${tag} </span>`)} ${tags.length > 3 && renderTemplate`<span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600" data-astro-cid-e3grugc2>
+${tags.length - 3} more
</span>`} </div>`} <!-- Title --> <h3 class="font-heading font-bold text-xl md:text-2xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200" data-astro-cid-e3grugc2> ${title} </h3> <!-- Description/Excerpt --> <p class="text-gray-600 leading-relaxed mb-4 line-clamp-3" data-astro-cid-e3grugc2> ${description} </p> <!-- Read More Link --> <a${addAttribute(`/blog/${post.slug}`, "href")} class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200 group/link"${addAttribute(`Read more about ${title}`, "aria-label")} data-astro-cid-e3grugc2>
Read More
<svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-e3grugc2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-e3grugc2></path> </svg> </a> </div> </article> `;
}, "C:/Users/James/_myApps/day154/my-blog/src/components/BlogCard.astro", void 0);

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const { data: allPosts, error } = await supabase.from("posts").select("*").eq("is_draft", false).order("published_at", { ascending: false });
  if (error) {
    console.error("Error fetching posts:", error);
  }
  const sortedPosts = (allPosts || []).map((post) => ({
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
  const allTags = [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "All Stories - StoryHub", "description": "Browse all our stories, tutorials, and insights about web development, design, and technology." }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-16 md:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center"> <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
All Stories
</h1> <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
Explore our complete collection of stories, tutorials, and insights about web development, design, and technology.
</p> <!-- Stats --> <div class="flex justify-center items-center gap-8 text-sm text-gray-500"> <span>${sortedPosts.length} stories</span> <span>•</span> <span>${allTags.length} topics</span> </div> </div> </div> </section>  <section class="py-16 md:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Featured Post --> ${sortedPosts.length > 0 && renderTemplate`<div class="mb-16"> <div class="flex items-center mb-8"> <h2 class="font-heading text-2xl font-bold text-gray-900">Latest Story</h2> <div class="ml-4 h-0.5 bg-primary-500 flex-1 max-w-20"></div> </div> <div class="max-w-4xl"> ${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": sortedPosts[0], "featured": true })} </div> </div>`} <!-- All Posts --> ${sortedPosts.length > 1 && renderTemplate`<div> <div class="flex items-center mb-8"> <h2 class="font-heading text-2xl font-bold text-gray-900">More Stories</h2> <div class="ml-4 h-0.5 bg-primary-500 flex-1 max-w-20"></div> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${sortedPosts.slice(1).map((post) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": post })}`)} </div> </div>`} <!-- Empty State --> ${sortedPosts.length === 0 && renderTemplate`<div class="text-center py-16"> <div class="max-w-md mx-auto"> <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> </div> <h3 class="font-heading text-xl font-semibold text-gray-900 mb-2">No stories yet</h3> <p class="text-gray-600">Check back soon for new content!</p> </div> </div>`} </div> </section> ` })}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/blog.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
