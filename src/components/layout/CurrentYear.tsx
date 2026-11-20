import { cacheLife } from "next/cache";

/**
 * Current year for the copyright line. Cached so pages stay static; refreshed daily,
 * so the footer rolls over to the new year without a redeploy.
 */
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
