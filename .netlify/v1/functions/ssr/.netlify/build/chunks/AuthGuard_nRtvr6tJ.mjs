import { c as createAstro, d as createComponent, k as renderSlot, j as renderScript, r as renderTemplate } from './astro/server_YFC6y_Dz.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://storyhub-blog.netlify.app");
const $$AuthGuard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthGuard;
  return renderTemplate`<!-- Admin authentication guard -->${renderSlot($$result, $$slots["default"])} ${renderScript($$result, "C:/Users/James/_myApps/day154/my-blog/src/components/AuthGuard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/James/_myApps/day154/my-blog/src/components/AuthGuard.astro", void 0);

export { $$AuthGuard as $ };
