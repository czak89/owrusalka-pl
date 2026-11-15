/* Static export. The site is plain files in out/ and runs on any web server.
   NEXT_PUBLIC_BASE_PATH is the folder the site lives in:
     GitHub Pages project site ->  /owrusalka-pl
     company server, domain root -> leave it unset */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
