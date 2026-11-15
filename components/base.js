/* Site base path. Empty on a server root; "/owrusalka-pl" on GitHub Pages.
   Set NEXT_PUBLIC_BASE_PATH at build time (see next.config.mjs). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBase(path) {
  if (!path || /^([a-z]+:|#|\/\/)/i.test(path)) return path;
  return BASE_PATH + (path.startsWith("/") ? path : "/" + path);
}
