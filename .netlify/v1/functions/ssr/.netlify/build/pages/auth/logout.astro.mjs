import { d as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D-9eq0G_.mjs';
export { renderers } from '../../renderers.mjs';

const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Logout" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div class="text-center"> <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
Signing out...
</h2> <p class="mt-2 text-sm text-gray-600">
Please wait while we sign you out.
</p> <div class="mt-8"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div> </div> <div id="error-message" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-md"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <p id="error-text" class="text-sm text-red-800"></p> <div class="mt-2"> <a href="/" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
Return to home page
</a> </div> </div> </div> </div> </div> </div> </main> ` })} ${renderScript($$result, "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/logout.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/logout.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/logout.astro";
const $$url = "/auth/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
