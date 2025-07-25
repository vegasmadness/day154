import { d as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead, j as renderScript } from '../../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D-9eq0G_.mjs';
import { $ as $$AuthGuard } from '../../chunks/AuthGuard_nRtvr6tJ.mjs';
export { renderers } from '../../renderers.mjs';

const $$Comments = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthGuard", $$AuthGuard, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BaseLayout", $$BaseLayout, { "title": "Comment Moderation - Admin", "description": "Manage and moderate blog comments" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Header --> <div class="mb-8"> <div class="flex items-center justify-between"> <div> <h1 class="text-3xl font-bold text-gray-900">Comment Moderation</h1> <p class="mt-2 text-gray-600">Review and approve comments before they appear on your blog</p> </div> <div class="flex space-x-3"> <a href="/admin/dashboard" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
← Back to Dashboard
</a> </div> </div> </div> <!-- Stats Cards --> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> <div class="bg-white overflow-hidden shadow rounded-lg"> <div class="p-5"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center"> <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> </div> <div class="ml-5 w-0 flex-1"> <dl> <dt class="text-sm font-medium text-gray-500 truncate">Pending Comments</dt> <dd class="text-lg font-medium text-gray-900" id="pending-count">Loading...</dd> </dl> </div> </div> </div> </div> <div class="bg-white overflow-hidden shadow rounded-lg"> <div class="p-5"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center"> <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> </div> <div class="ml-5 w-0 flex-1"> <dl> <dt class="text-sm font-medium text-gray-500 truncate">Approved Comments</dt> <dd class="text-lg font-medium text-gray-900" id="approved-count">Loading...</dd> </dl> </div> </div> </div> </div> <div class="bg-white overflow-hidden shadow rounded-lg"> <div class="p-5"> <div class="flex items-center"> <div class="flex-shrink-0"> <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center"> <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z"></path> </svg> </div> </div> <div class="ml-5 w-0 flex-1"> <dl> <dt class="text-sm font-medium text-gray-500 truncate">Total Comments</dt> <dd class="text-lg font-medium text-gray-900" id="total-count">Loading...</dd> </dl> </div> </div> </div> </div> </div> <!-- Filter Tabs --> <div class="bg-white shadow rounded-lg mb-6"> <div class="border-b border-gray-200"> <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs"> <button id="pending-tab" class="tab-button border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-filter="pending">
Pending Review
<span id="pending-badge" class="bg-yellow-100 text-yellow-800 ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium">0</span> </button> <button id="approved-tab" class="tab-button border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-filter="approved">
Approved
<span id="approved-badge" class="bg-green-100 text-green-800 ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium">0</span> </button> <button id="all-tab" class="tab-button border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-filter="all">
All Comments
<span id="all-badge" class="bg-gray-100 text-gray-800 ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium">0</span> </button> </nav> </div> </div> <!-- Comments List --> <div class="bg-white shadow rounded-lg"> <div class="px-6 py-4 border-b border-gray-200"> <h3 class="text-lg font-medium text-gray-900">Comments</h3> </div> <div id="comments-container" class="divide-y divide-gray-200"> <!-- Comments will be loaded here --> <div class="p-6 text-center text-gray-500"> <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
Loading comments...
</div> </div> </div> </div> </div>  ${renderScript($$result3, "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/comments.astro?astro&type=script&index=0&lang.ts")} ` })} ` })}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/comments.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/comments.astro";
const $$url = "/admin/comments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Comments,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
