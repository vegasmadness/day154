import { d as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D-9eq0G_.mjs';
import { L as LikeButton } from '../chunks/LikeButton_DJKcpBJW.mjs';
export { renderers } from '../renderers.mjs';

const $$LikeButtonDemo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Like Button Demo", "description": "Demonstration of the LikeButton React component" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <h1 class="font-heading text-4xl font-bold text-gray-900 mb-8">Like Button Demo</h1> <div class="space-y-8"> <!-- Demo Section 1 --> <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200"> <h2 class="font-heading text-2xl font-semibold text-gray-900 mb-4">Sample Blog Post 1</h2> <p class="text-gray-600 mb-6">
This is a sample blog post to demonstrate the LikeButton component. 
          Click the like button below to see the animation and persistence in action.
</p> ${renderComponent($$result2, "LikeButton", LikeButton, { "postId": "demo-post-1", "initialLikes": 5, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/James/_myApps/day154/my-blog/src/components/react/LikeButton.tsx", "client:component-export": "default" })} </div> <!-- Demo Section 2 --> <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200"> <h2 class="font-heading text-2xl font-semibold text-gray-900 mb-4">Sample Blog Post 2</h2> <p class="text-gray-600 mb-6">
Another sample post with a different post ID. Each post maintains its own like state.
          Try liking both posts and refreshing the page to see persistence.
</p> ${renderComponent($$result2, "LikeButton", LikeButton, { "postId": "demo-post-2", "initialLikes": 12, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/James/_myApps/day154/my-blog/src/components/react/LikeButton.tsx", "client:component-export": "default" })} </div> <!-- Demo Section 3 --> <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200"> <h2 class="font-heading text-2xl font-semibold text-gray-900 mb-4">Sample Blog Post 3</h2> <p class="text-gray-600 mb-6">
A third post starting with zero likes. Notice how the button prevents multiple likes 
          per user per post using localStorage.
</p> ${renderComponent($$result2, "LikeButton", LikeButton, { "postId": "demo-post-3", "initialLikes": 0, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/James/_myApps/day154/my-blog/src/components/react/LikeButton.tsx", "client:component-export": "default" })} </div> </div> <!-- Instructions --> <div class="mt-12 bg-gray-50 p-6 rounded-xl"> <h3 class="font-heading text-lg font-semibold text-gray-900 mb-3">Features Demonstrated:</h3> <ul class="space-y-2 text-gray-600"> <li>• <strong>Heart Animation:</strong> Scale effect and particle animation on click</li> <li>• <strong>Pink Gradient:</strong> Button changes to pink gradient when liked</li> <li>• <strong>Persistence:</strong> Like state is saved in localStorage</li> <li>• <strong>Prevention:</strong> Multiple likes per user per post are prevented</li> <li>• <strong>Optimistic UI:</strong> Immediate feedback before persistence</li> <li>• <strong>Accessibility:</strong> Proper ARIA labels and keyboard support</li> </ul> </div> <!-- Back Link --> <div class="mt-8"> <a href="/" class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"> <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg>
Back to Home
</a> </div> </div> ` })}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/like-button-demo.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/like-button-demo.astro";
const $$url = "/like-button-demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LikeButtonDemo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
