import { absUrl } from "../components/site-meta";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absUrl("/sitemap.xml"),
  };
}
