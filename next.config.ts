import type { NextConfig } from "next";

/**
 * GitHub Pages build (set GITHUB_PAGES=true, done by .github/workflows/deploy-pages.yml):
 * a fully static export served from https://<user>.github.io/<repo>/, so every URL needs the repo
 * name as a base path. Run scripts/prepare-pages.mjs first (removes server-only files).
 * Normal `next dev` / `next build` are unaffected.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? process.env.PAGES_BASE_PATH ?? "/skillden" : "";

const nextConfig: NextConfig = {
  // Both imply Partial Prerendering, which a static export can't use.
  cacheComponents: !isPages,
  partialPrefetching: !isPages,
  ...(isPages && {
    output: "export",
    basePath,
    // next/image doesn't add basePath to `src`, and Pages has no image optimizer: the loader adds it.
    images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isPages ? "true" : "",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Scope URLs have no trailing slash, e.g. /services/bookkeepers.
  // 301s from existing skillden.co.uk URLs go in `redirects()` once the owner lists them.
};

export default nextConfig;
