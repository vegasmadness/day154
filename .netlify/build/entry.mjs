import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_C7F6roVt.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/comments.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/media.astro.mjs');
const _page4 = () => import('./pages/admin/posts/new.astro.mjs');
const _page5 = () => import('./pages/admin/posts/_id_/edit.astro.mjs');
const _page6 = () => import('./pages/admin/posts.astro.mjs');
const _page7 = () => import('./pages/admin/settings.astro.mjs');
const _page8 = () => import('./pages/admin.astro.mjs');
const _page9 = () => import('./pages/auth/forgot-password.astro.mjs');
const _page10 = () => import('./pages/auth/login.astro.mjs');
const _page11 = () => import('./pages/auth/logout.astro.mjs');
const _page12 = () => import('./pages/auth/reset-password.astro.mjs');
const _page13 = () => import('./pages/auth/signup.astro.mjs');
const _page14 = () => import('./pages/auth/unauthorized.astro.mjs');
const _page15 = () => import('./pages/blog.astro.mjs');
const _page16 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page17 = () => import('./pages/comment-form-demo.astro.mjs');
const _page18 = () => import('./pages/like-button-demo.astro.mjs');
const _page19 = () => import('./pages/profile.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/comments.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/media.astro", _page3],
    ["src/pages/admin/posts/new.astro", _page4],
    ["src/pages/admin/posts/[id]/edit.astro", _page5],
    ["src/pages/admin/posts/index.astro", _page6],
    ["src/pages/admin/settings.astro", _page7],
    ["src/pages/admin/index.astro", _page8],
    ["src/pages/auth/forgot-password.astro", _page9],
    ["src/pages/auth/login.astro", _page10],
    ["src/pages/auth/logout.astro", _page11],
    ["src/pages/auth/reset-password.astro", _page12],
    ["src/pages/auth/signup.astro", _page13],
    ["src/pages/auth/unauthorized.astro", _page14],
    ["src/pages/blog.astro", _page15],
    ["src/pages/blog/[...slug].astro", _page16],
    ["src/pages/comment-form-demo.astro", _page17],
    ["src/pages/like-button-demo.astro", _page18],
    ["src/pages/profile.astro", _page19],
    ["src/pages/index.astro", _page20]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2fb36282-d274-49f0-991f-11c948880acc"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
