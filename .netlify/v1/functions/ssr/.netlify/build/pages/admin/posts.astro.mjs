import { d as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D-9eq0G_.mjs';
import { $ as $$AuthGuard } from '../../chunks/AuthGuard_nRtvr6tJ.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Manage Posts - Admin" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthGuard", $$AuthGuard, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50"> <!-- Header --> <div class="bg-white shadow"> <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"> <div class="flex items-center justify-between"> <div> <h1 class="text-3xl font-bold text-gray-900">Manage Posts</h1> <p class="mt-1 text-sm text-gray-500">Create, edit, and manage your blog posts</p> </div> <div class="flex items-center space-x-3"> <a href="/admin/dashboard" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Back to Dashboard
</a> <a href="/admin/posts/new" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"> <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
New Post
</a> </div> </div> </div> </div> <!-- Main Content --> <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> <div class="px-4 py-6 sm:px-0"> <!-- Search and Filter Bar --> <div class="bg-white shadow rounded-lg mb-6"> <div class="px-4 py-5 sm:p-6"> <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4"> <div class="flex-1"> <label for="search" class="sr-only">Search posts</label> <div class="relative"> <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <input id="search" name="search" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Search posts..." type="search"> </div> </div> <div class="flex items-center space-x-3"> <select id="status-filter" class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"> <option value="all">All Posts</option> <option value="published">Published</option> <option value="draft">Drafts</option> </select> <select id="sort-filter" class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"> <option value="newest">Newest First</option> <option value="oldest">Oldest First</option> <option value="title">Title A-Z</option> </select> </div> </div> </div> </div> <!-- Posts List --> <div class="bg-white shadow rounded-lg"> <div class="px-4 py-5 sm:p-6"> <div id="posts-loading" class="text-center py-8"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div> <p class="mt-2 text-sm text-gray-500">Loading posts...</p> </div> <div id="posts-container" class="hidden"> <div class="overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Title
</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Status
</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Created
</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Updated
</th> <th scope="col" class="relative px-6 py-3"> <span class="sr-only">Actions</span> </th> </tr> </thead> <tbody id="posts-table-body" class="bg-white divide-y divide-gray-200"> <!-- Posts will be loaded here --> </tbody> </table> </div> </div> <div id="no-posts" class="hidden text-center py-8"> <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> <h3 class="mt-2 text-sm font-medium text-gray-900">No posts found</h3> <p class="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p> <div class="mt-6"> <a href="/admin/posts/new" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
New Post
</a> </div> </div> </div> </div> </div> </main> </div> ` })} ` })} ${renderScript($$result, "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/index.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/index.astro";
const $$url = "/admin/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
