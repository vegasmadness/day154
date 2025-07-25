import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_YFC6y_Dz.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/James/_myApps/day154/my-blog/","cacheDir":"file:///C:/Users/James/_myApps/day154/my-blog/node_modules/.astro/","outDir":"file:///C:/Users/James/_myApps/day154/my-blog/dist/","srcDir":"file:///C:/Users/James/_myApps/day154/my-blog/src/","publicDir":"file:///C:/Users/James/_myApps/day154/my-blog/public/","buildClientDir":"file:///C:/Users/James/_myApps/day154/my-blog/dist/","buildServerDir":"file:///C:/Users/James/_myApps/day154/my-blog/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin/comments","isIndex":false,"type":"page","pattern":"^\\/admin\\/comments\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/comments.astro","pathname":"/admin/comments","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin/dashboard","isIndex":false,"type":"page","pattern":"^\\/admin\\/dashboard\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/dashboard.astro","pathname":"/admin/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin/media","isIndex":false,"type":"page","pattern":"^\\/admin\\/media\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/media.astro","pathname":"/admin/media","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin/posts/new","isIndex":false,"type":"page","pattern":"^\\/admin\\/posts\\/new\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/posts/new.astro","pathname":"/admin/posts/new","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin/posts/[id]/edit","isIndex":false,"type":"page","pattern":"^\\/admin\\/posts\\/([^/]+?)\\/edit\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/admin/posts/[id]/edit.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin/posts","isIndex":true,"type":"page","pattern":"^\\/admin\\/posts\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/posts/index.astro","pathname":"/admin/posts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin/settings","isIndex":false,"type":"page","pattern":"^\\/admin\\/settings\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/settings.astro","pathname":"/admin/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/auth/forgot-password","isIndex":false,"type":"page","pattern":"^\\/auth\\/forgot-password\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"forgot-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/forgot-password.astro","pathname":"/auth/forgot-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/login.astro","pathname":"/auth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/auth/logout","isIndex":false,"type":"page","pattern":"^\\/auth\\/logout\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/logout.astro","pathname":"/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/auth/reset-password","isIndex":false,"type":"page","pattern":"^\\/auth\\/reset-password\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"reset-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/reset-password.astro","pathname":"/auth/reset-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/auth/signup","isIndex":false,"type":"page","pattern":"^\\/auth\\/signup\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/signup.astro","pathname":"/auth/signup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/auth/unauthorized","isIndex":false,"type":"page","pattern":"^\\/auth\\/unauthorized\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"unauthorized","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/unauthorized.astro","pathname":"/auth/unauthorized","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".line-clamp-3[data-astro-cid-e3grugc2]{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.group[data-astro-cid-e3grugc2]:hover{transform:translateY(-4px)}article[data-astro-cid-e3grugc2]{transition:all .3s cubic-bezier(.4,0,.2,1)}article[data-astro-cid-e3grugc2]:focus-within{outline:2px solid #ec4899;outline-offset:2px}.group[data-astro-cid-e3grugc2]:hover{box-shadow:0 20px 25px -5px #0000001a,0 10px 10px -5px #0000000a}\n"},{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/comment-form-demo","isIndex":false,"type":"page","pattern":"^\\/comment-form-demo\\/?$","segments":[[{"content":"comment-form-demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/comment-form-demo.astro","pathname":"/comment-form-demo","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/like-button-demo","isIndex":false,"type":"page","pattern":"^\\/like-button-demo\\/?$","segments":[[{"content":"like-button-demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/like-button-demo.astro","pathname":"/like-button-demo","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.BQcU0025.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://storyhub-blog.netlify.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/James/_myApps/day154/my-blog/src/pages/blog/[...slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/comments.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/media.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/[id]/edit.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/new.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/admin/settings.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/auth/forgot-password.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/auth/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/auth/logout.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/auth/reset-password.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/auth/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/auth/unauthorized.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/comment-form-demo.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/like-button-demo.astro",{"propagation":"none","containsHead":true}],["C:/Users/James/_myApps/day154/my-blog/src/pages/profile.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/comments@_@astro":"pages/admin/comments.astro.mjs","\u0000@astro-page:src/pages/admin/dashboard@_@astro":"pages/admin/dashboard.astro.mjs","\u0000@astro-page:src/pages/admin/media@_@astro":"pages/admin/media.astro.mjs","\u0000@astro-page:src/pages/admin/posts/new@_@astro":"pages/admin/posts/new.astro.mjs","\u0000@astro-page:src/pages/admin/posts/[id]/edit@_@astro":"pages/admin/posts/_id_/edit.astro.mjs","\u0000@astro-page:src/pages/admin/posts/index@_@astro":"pages/admin/posts.astro.mjs","\u0000@astro-page:src/pages/admin/settings@_@astro":"pages/admin/settings.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/auth/forgot-password@_@astro":"pages/auth/forgot-password.astro.mjs","\u0000@astro-page:src/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/pages/auth/logout@_@astro":"pages/auth/logout.astro.mjs","\u0000@astro-page:src/pages/auth/reset-password@_@astro":"pages/auth/reset-password.astro.mjs","\u0000@astro-page:src/pages/auth/signup@_@astro":"pages/auth/signup.astro.mjs","\u0000@astro-page:src/pages/auth/unauthorized@_@astro":"pages/auth/unauthorized.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/comment-form-demo@_@astro":"pages/comment-form-demo.astro.mjs","\u0000@astro-page:src/pages/like-button-demo@_@astro":"pages/like-button-demo.astro.mjs","\u0000@astro-page:src/pages/profile@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C7F6roVt.mjs","C:/Users/James/_myApps/day154/my-blog/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","C:/Users/James/_myApps/day154/my-blog/src/components/react/CommentForm.tsx":"_astro/CommentForm.Dt7lcg-E.js","C:/Users/James/_myApps/day154/my-blog/src/components/react/LikeButton.tsx":"_astro/LikeButton.DJwUoL4b.js","C:/Users/James/_myApps/day154/my-blog/src/components/react/ReadingProgress.tsx":"_astro/ReadingProgress.CUAaoBHX.js","C:/Users/James/_myApps/day154/my-blog/src/components/react/TableOfContents.tsx":"_astro/TableOfContents.Dimnj35w.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/dashboard.astro?astro&type=script&index=0&lang.ts":"_astro/dashboard.astro_astro_type_script_index_0_lang.BnKVUNY4.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/media.astro?astro&type=script&index=0&lang.ts":"_astro/media.astro_astro_type_script_index_0_lang.CFEUEJgv.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/comments.astro?astro&type=script&index=0&lang.ts":"_astro/comments.astro_astro_type_script_index_0_lang.DuMRy3k9.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/new.astro?astro&type=script&index=0&lang.ts":"_astro/new.astro_astro_type_script_index_0_lang.XLmmMfB5.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/[id]/edit.astro?astro&type=script&index=0&lang.ts":"_astro/edit.astro_astro_type_script_index_0_lang.Wjo5do9J.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/posts/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DR1VT-9Q.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/settings.astro?astro&type=script&index=0&lang.ts":"_astro/settings.astro_astro_type_script_index_0_lang.C-EPPjLb.js","C:/Users/James/_myApps/day154/my-blog/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DwzrSHtI.js","C:/Users/James/_myApps/day154/my-blog/src/pages/auth/forgot-password.astro?astro&type=script&index=0&lang.ts":"_astro/forgot-password.astro_astro_type_script_index_0_lang.ylnFRGP9.js","C:/Users/James/_myApps/day154/my-blog/src/pages/auth/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.DFyYwKDc.js","C:/Users/James/_myApps/day154/my-blog/src/pages/auth/logout.astro?astro&type=script&index=0&lang.ts":"_astro/logout.astro_astro_type_script_index_0_lang.BLNXMLjW.js","C:/Users/James/_myApps/day154/my-blog/src/pages/auth/reset-password.astro?astro&type=script&index=0&lang.ts":"_astro/reset-password.astro_astro_type_script_index_0_lang.BbSh7n_Z.js","C:/Users/James/_myApps/day154/my-blog/src/pages/auth/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.BiOA92UE.js","C:/Users/James/_myApps/day154/my-blog/src/components/AuthGuard.astro?astro&type=script&index=0&lang.ts":"_astro/AuthGuard.astro_astro_type_script_index_0_lang.S_hGgtc5.js","C:/Users/James/_myApps/day154/my-blog/src/components/UserProfile.astro?astro&type=script&index=0&lang.ts":"_astro/UserProfile.astro_astro_type_script_index_0_lang.A_wLI5fz.js","C:/Users/James/_myApps/day154/my-blog/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.jIaoZs6j.js","C:/Users/James/_myApps/day154/my-blog/src/utils/media.ts":"_astro/media.a3VLn5zZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/James/_myApps/day154/my-blog/src/components/Header.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const r=document.getElementById(\"mobile-menu-button\"),s=document.getElementById(\"mobile-menu\");if(r&&s&&r.addEventListener(\"click\",()=>{s.classList.toggle(\"hidden\")}),(()=>{try{console.log(\"Checking authentication...\"),console.log(\"LocalStorage keys:\",Object.keys(localStorage));const t=[\"sb-localhost-auth-token\",\"sb-127.0.0.1-auth-token\",\"sb-auth-token\",\"supabase.auth.token\",\"sb-access-token\",\"sb-refresh-token\"];for(const o of t){const e=localStorage.getItem(o);if(e&&e!==\"null\"&&e!==\"{}\")return console.log(\"Found auth token:\",o),!0}for(const o of t){const e=sessionStorage.getItem(o);if(e&&e!==\"null\"&&e!==\"{}\")return console.log(\"Found auth token in session:\",o),!0}if(document.cookie.includes(\"sb-access-token\")||document.cookie.includes(\"sb-refresh-token\"))return console.log(\"Found auth in cookies\"),!0;for(let o=0;o<localStorage.length;o++){const e=localStorage.key(o);if(e&&(e.includes(\"supabase\")||e.includes(\"sb-\"))){const n=localStorage.getItem(e);if(console.log(\"Supabase key found:\",e,\"Value length:\",n?.length),n&&n!==\"null\"&&n!==\"{}\"&&n.length>10)try{const a=JSON.parse(n);if(a&&(a.access_token||a.user||a.session))return console.log(\"Valid auth data found in:\",e),!0}catch{if(n.length>50)return console.log(\"Non-JSON auth data found in:\",e),!0}}}return console.log(\"No authentication found\"),!1}catch(t){return console.log(\"Auth check error:\",t),!1}})()){const t=document.getElementById(\"admin-nav-link\");t&&(t.innerHTML=`\n          <a href=\"/admin/dashboard\" class=\"text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200\">\n            Admin\n          </a>\n        `);const o=document.getElementById(\"logout-button\");o&&(o.innerHTML=`\n          <a href=\"/auth/logout\" class=\"inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200\">\n            <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1\"></path>\n            </svg>\n            Logout\n          </a>\n        `);const e=document.getElementById(\"mobile-admin-links\");e&&(e.innerHTML=`\n          <a href=\"/admin/dashboard\" class=\"block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200\">\n            Admin\n          </a>\n          <a href=\"/auth/logout\" class=\"block px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md font-medium transition-colors duration-200\">\n            Logout\n          </a>\n        `)}});"]],"assets":["/_astro/_slug_.BCxd2W2H.css","/_astro/_slug_.BQcU0025.css","/favicon.svg","/_redirects","/images/default-avatar.svg","/_astro/auth.DAEXQpZi.js","/_astro/auth.DCBz3bzk.js","/_astro/AuthGuard.astro_astro_type_script_index_0_lang.S_hGgtc5.js","/_astro/client.BPIbHqJh.js","/_astro/CommentForm.Dt7lcg-E.js","/_astro/comments.astro_astro_type_script_index_0_lang.DuMRy3k9.js","/_astro/dashboard.astro_astro_type_script_index_0_lang.BnKVUNY4.js","/_astro/edit.astro_astro_type_script_index_0_lang.Wjo5do9J.js","/_astro/forgot-password.astro_astro_type_script_index_0_lang.ylnFRGP9.js","/_astro/index.astro_astro_type_script_index_0_lang.DR1VT-9Q.js","/_astro/index.astro_astro_type_script_index_0_lang.DwzrSHtI.js","/_astro/index.BVOCwoKb.js","/_astro/index.YuXn_Tmw.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/LikeButton.DJwUoL4b.js","/_astro/login.astro_astro_type_script_index_0_lang.DFyYwKDc.js","/_astro/logout.astro_astro_type_script_index_0_lang.BLNXMLjW.js","/_astro/media.a3VLn5zZ.js","/_astro/media.astro_astro_type_script_index_0_lang.CFEUEJgv.js","/_astro/new.astro_astro_type_script_index_0_lang.XLmmMfB5.js","/_astro/ReadingProgress.CUAaoBHX.js","/_astro/reset-password.astro_astro_type_script_index_0_lang.BbSh7n_Z.js","/_astro/settings.astro_astro_type_script_index_0_lang.C-EPPjLb.js","/_astro/signup.astro_astro_type_script_index_0_lang.BiOA92UE.js","/_astro/supabase.BQlMnT7U.js","/_astro/TableOfContents.Dimnj35w.js","/_astro/UserProfile.astro_astro_type_script_index_0_lang.A_wLI5fz.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"quPc45OyrYrb1Rzx2c4lwt0ZSxXwh9iCRWs46IK72ZA=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
