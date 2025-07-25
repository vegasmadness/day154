import { c as createAstro, d as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D-9eq0G_.mjs';
import { g as getCurrentUser } from '../chunks/auth_DrE522zM.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://storyhub-blog.netlify.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let user = null;
  try {
    const { user: currentUser } = await getCurrentUser();
    user = currentUser;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
  if (user) {
    return Astro2.redirect("/admin/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Login" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
Admin Access
</h2> <p class="mt-2 text-center text-sm text-gray-600">
Sign in to manage your blog
</p> </div> <form id="admin-login-form" class="mt-8 space-y-6"> <input type="hidden" name="remember" value="true"> <div class="rounded-md shadow-sm -space-y-px"> <div> <label for="email-address" class="sr-only">Email address</label> <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"> </div> <div> <label for="password" class="sr-only">Password</label> <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"> </div> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"> <label for="remember-me" class="ml-2 block text-sm text-gray-900">
Remember me
</label> </div> <div class="text-sm"> <a href="/auth/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
Forgot your password?
</a> </div> </div> <div> <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"> <span class="absolute left-0 inset-y-0 flex items-center pl-3"> <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path> </svg> </span>
Sign in to Admin
</button> </div> <div id="error-message" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-md"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <h3 class="text-sm font-medium text-red-800">
Authentication Error
</h3> <div class="mt-2 text-sm text-red-700"> <p id="error-text"></p> </div> </div> </div> </div> <div id="success-message" class="hidden mt-4 p-4 bg-green-50 border border-green-200 rounded-md"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <h3 class="text-sm font-medium text-green-800">
Login Successful
</h3> <div class="mt-2 text-sm text-green-700"> <p>Redirecting to admin dashboard...</p> </div> </div> </div> </div> </form> </div> </div> ` })} ${renderScript($$result, "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
