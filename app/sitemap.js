import { PAGES, absUrl } from "../components/site-meta";

export const dynamic = "force-static";

export default function sitemap() {
  return Object.keys(PAGES).map((path) => ({
    url: absUrl(path),
    changeFrequency: path === "/cennik/" || path === "/lato/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/rezerwacja/" ? 0.9 : 0.7,
  }));
}
