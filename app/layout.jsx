import "../design-system/tokens.css";
import "../design-system/components/bundle.css";
import "../styles/site.css";
import "../styles/placeholders.css";
import "../styles/content.css";
import "../styles/pokoje.css";
import "../styles/rez.css";
import { SITE_URL, LODGING_JSON_LD, pageMeta } from "../components/site-meta";

export const metadata = { metadataBase: new URL(SITE_URL + "/"), ...pageMeta("/") };

const jsonLd = JSON.stringify(LODGING_JSON_LD).replace(/</g, "\\u003c");

export const viewport = { width: "device-width", initialScale: 1 };

/* Runs before first paint so a returning visitor never sees the wrong theme. */
const themeInit = `(function(){try{var t=localStorage.getItem("rusalka-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="pl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body data-emphasis="coral" data-corners="soft" data-texture="on" suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
