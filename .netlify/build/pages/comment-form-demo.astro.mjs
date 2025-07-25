import { d as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D-9eq0G_.mjs';
import { C as CommentForm } from '../chunks/CommentForm_DrNtTEbL.mjs';
export { renderers } from '../renderers.mjs';

const $$CommentFormDemo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Comment Form Demo", "description": "Testing the comment system functionality" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 py-8"> <div class="prose prose-lg max-w-none"> <h1 class="text-4xl font-heading font-bold text-gray-900 mb-4">
Comment Form Demo
</h1> <p class="text-xl text-gray-600 mb-8">
This page demonstrates the comment system functionality. Try leaving a comment below!
</p> <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8"> <h2 class="text-2xl font-heading font-semibold text-gray-900 mb-4">
Sample Blog Post Content
</h2> <p class="text-gray-700 leading-relaxed mb-4">
This is a sample blog post to demonstrate the comment system. The comment form below 
          allows users to leave comments with their name and message. Comments are stored locally 
          in the browser's localStorage and will persist between page visits.
</p> <p class="text-gray-700 leading-relaxed mb-4">
Key features of the comment system:
</p> <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4"> <li>Form validation for required fields (name and comment content)</li> <li>Immediate display of submitted comments</li> <li>Chronological ordering of comments (oldest first)</li> <li>Persistent storage using localStorage</li> <li>Responsive design that matches the overall site aesthetic</li> <li>Accessible form elements with proper labels and error messages</li> </ul> <p class="text-gray-700 leading-relaxed">
Try submitting a comment to see how the system works. You can also try submitting 
          an empty form to see the validation in action.
</p> </div> <!-- Comment Form Component --> ${renderComponent($$result2, "CommentForm", CommentForm, { "postId": "comment-form-demo", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/James/_myApps/day154/my-blog/src/components/react/CommentForm.tsx", "client:component-export": "default" })} </div> </main> ` })}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/pages/comment-form-demo.astro", void 0);

const $$file = "C:/Users/James/_myApps/day154/my-blog/src/pages/comment-form-demo.astro";
const $$url = "/comment-form-demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CommentFormDemo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
