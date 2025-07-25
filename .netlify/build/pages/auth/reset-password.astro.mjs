import { d as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D-9eq0G_.mjs';
export { renderers } from '../../renderers.mjs';

const $$ResetPassword = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Reset Password" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8"> <div> <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
Set new password
</h2> <p class="mt-2 text-center text-sm text-gray-600">
Enter your new password below.
</p> </div> <form id="reset-password-form" class="mt-8 space-y-6"> <div class="rounded-md shadow-sm -space-y-px"> <div> <label for="password" class="sr-only">New password</label> <input id="password" name="password" type="password" autocomplete="new-password" required minlength="6" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New password (min. 6 characters)"> </div> <div> <label for="confirm-password" class="sr-only">Confirm new password</label> <input id="confirm-password" name="confirm-password" type="password" autocomplete="new-password" required minlength="6" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm new password"> </div> </div> <div> <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"> <span class="absolute left-0 inset-y-0 flex items-center pl-3"> <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path> </svg> </span> <span id="update-text">Update password</span> </button> </div> <div class="text-center"> <a href="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
Back to sign in
</a> </div> <div id="error-message" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-md"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <p id="error-text" class="text-sm text-red-800"></p> </div> </div> </div> <div id="success-message" class="hidden mt-4 p-4 bg-green-50 border border-green-200 rounded-md"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <p id="success-text" class="text-sm text-green-800"></p> </div> </div> </div> <div id="invalid-link-message" class="hidden mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <p class="text-sm text-yellow-800">
This password reset link is invalid or has expired.
<a href="/auth/forgot-password" class="font-medium underline">Request a new one</a> </p> </div> </div> </div> </form> </div> </main> ` })} ${renderScript($$result, "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/reset-password.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/reset-password.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/auth/reset-password.astro";
const $$url = "/auth/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ResetPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
