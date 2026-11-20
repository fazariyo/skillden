import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
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
