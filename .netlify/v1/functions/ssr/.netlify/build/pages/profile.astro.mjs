import { d as createComponent, m as maybeRenderHead, f as addAttribute, j as renderScript, r as renderTemplate, i as renderComponent } from '../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D-9eq0G_.mjs';
import { $ as $$AuthGuard } from '../chunks/AuthGuard_nRtvr6tJ.mjs';
import 'clsx';
import { g as getCurrentUser } from '../chunks/auth_DrE522zM.mjs';
export { renderers } from '../renderers.mjs';

const $$UserProfile = createComponent(async ($$result, $$props, $$slots) => {
  let user = null;
  try {
    const { user: currentUser } = await getCurrentUser();
    user = currentUser;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
  return renderTemplate`${maybeRenderHead()}<div id="user-profile" class="bg-white shadow rounded-lg p-6"> <div class="flex items-center space-x-6"> <div class="flex-shrink-0"> <img id="user-avatar" class="h-20 w-20 rounded-full object-cover"${addAttribute(user?.user_metadata?.avatar_url || "/images/default-avatar.svg", "src")} alt="User avatar"> </div> <div class="flex-1 min-w-0"> <h2 id="user-name" class="text-2xl font-bold text-gray-900 truncate"> ${user?.user_metadata?.full_name || "Anonymous User"} </h2> <p id="user-email" class="text-sm text-gray-500 truncate"> ${user?.email || ""} </p> <p class="text-sm text-gray-500">
Member since ${user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"} </p> </div> <div class="flex-shrink-0"> <button id="edit-profile-btn" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path> </svg>
Edit Profile
</button> </div> </div> <!-- Edit Profile Modal --> <div id="edit-profile-modal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"> <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"> <div class="mt-3"> <div class="flex items-center justify-between mb-4"> <h3 class="text-lg font-medium text-gray-900">Edit Profile</h3> <button id="close-modal-btn" class="text-gray-400 hover:text-gray-600"> <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <form id="profile-form" class="space-y-4"> <div> <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label> <input type="text" id="full-name" name="full-name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"${addAttribute(user?.user_metadata?.full_name || "", "value")}> </div> <div> <label for="avatar-url" class="block text-sm font-medium text-gray-700">Avatar URL</label> <input type="url" id="avatar-url" name="avatar-url" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"${addAttribute(user?.user_metadata?.avatar_url || "", "value")} placeholder="https://example.com/avatar.jpg"> </div> <div class="flex justify-end space-x-3 pt-4"> <button type="button" id="cancel-btn" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Cancel
</button> <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"> <span id="save-text">Save Changes</span> </button> </div> </form> <div id="profile-error" class="hidden mt-4 p-3 bg-red-50 border border-red-200 rounded-md"> <p id="profile-error-text" class="text-sm text-red-800"></p> </div> <div id="profile-success" class="hidden mt-4 p-3 bg-green-50 border border-green-200 rounded-md"> <p id="profile-success-text" class="text-sm text-green-800"></p> </div> </div> </div> </div> </div> ${renderScript($$result, "C:/Users/James/_myApps/day154/my-blog/src/components/UserProfile.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/components/UserProfile.astro", void 0);

const $$Profile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthGuard", $$AuthGuard, { "requireAuth": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BaseLayout", $$BaseLayout, { "title": "Profile" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50 py-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900">Your Profile</h1> <p class="mt-2 text-gray-600">Manage your account settings and preferences.</p> </div> <div class="space-y-6"> ${renderComponent($$result3, "UserProfile", $$UserProfile, {})} <!-- Additional profile sections can be added here --> <div class="bg-white shadow rounded-lg p-6"> <h2 class="text-lg font-medium text-gray-900 mb-4">Account Settings</h2> <div class="space-y-4"> <div class="flex items-center justify-between"> <div> <h3 class="text-sm font-medium text-gray-900">Password</h3> <p class="text-sm text-gray-500">Update your password to keep your account secure.</p> </div> <a href="/auth/forgot-password" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Change Password
</a> </div> <div class="border-t border-gray-200 pt-4"> <div class="flex items-center justify-between"> <div> <h3 class="text-sm font-medium text-gray-900">Account Deletion</h3> <p class="text-sm text-gray-500">Permanently delete your account and all associated data.</p> </div> <button type="button" class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onclick="alert('Account deletion feature coming soon!')">
Delete Account
</button> </div> </div> </div> </div> </div> </div> </main> ` })} ` })}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/profile.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
