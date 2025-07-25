import { d as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D-9eq0G_.mjs';
export { renderers } from '../../renderers.mjs';

const $$Unauthorized = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Unauthorized" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8 text-center"> <div> <svg class="mx-auto h-24 w-24 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path> </svg> <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
Access Denied
</h2> <p class="mt-2 text-sm text-gray-600">
You don't have permission to access this page.
</p> </div> <div class="mt-8 space-y-4"> <div> <a href="/" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Go to Home Page
</a> </div> <div> <a href="/auth/login" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Sign In with Different Account
</a> </div> </div> <div class="mt-6"> <p class="text-xs text-gray-500">
If you believe this is an error, please contact the administrator.
</p> </div> </div> </main> ` })}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/unauthorized.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/unauthorized.astro";
const $$url = "/auth/unauthorized";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Unauthorized,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
