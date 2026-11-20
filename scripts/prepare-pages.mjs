// Prepares a CI checkout for the static GitHub Pages export (see .github/workflows/deploy-pages.yml).
// Never run this in your working copy: it deletes and rewrites source files.
import { rmSync, writeFileSync } from "node:fs";

// Server-only routes: the enquiry API needs a server (the form falls back to a pre-filled email),
// and robots.txt / sitemap.xml only count at a domain root, not under /<repo>/.
for (const path of ["src/app/api", "src/app/robots.ts", "src/app/sitemap.ts"]) {
  rmSync(path, { recursive: true, force: true });
}

// "use cache" needs Cache Components, which static export can't use: the year is fixed at build time.
writeFileSync(
  "src/components/layout/CurrentYear.tsx",
  `export default function CurrentYear() {\n  return <>{new Date().getFullYear()}</>;\n}\n`,
);

console.log("Prepared source for GitHub Pages static export.");
