import "../design-system/tokens.css";
import "../design-system/components/bundle.css";
import "../styles/site.css";
import "../styles/placeholders.css";
import "../styles/content.css";
import "../styles/pokoje.css";
import "../styles/rez.css";

export const metadata = {
  title: "Rusałka · Wakacje rodzinne nad Bałtykiem w Łazach",
  description:
    "Ośrodek Wypoczynkowy Rusałka w Łazach k/Mielna. 50 metrów od plaży, sosnowy las, domowa kuchnia. Rodzinne wakacje nad Bałtykiem.",
};

export const viewport = { width: "device-width", initialScale: 1 };

/* Runs before first paint so a returning visitor never sees the wrong theme. */
const themeInit = `(function(){try{var t=localStorage.getItem("rusalka-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="pl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body data-emphasis="coral" data-corners="soft" data-texture="on" suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
