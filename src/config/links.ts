/**
 * External destination for the "Visit Site" / live-demo CTAs.
 *
 * Centralised so there is a single place to point all product CTAs at the real
 * production application. Override at build time with NEXT_PUBLIC_APP_URL
 * (inlined into the static export at build time).
 *
 * TODO: set NEXT_PUBLIC_APP_URL to the real production URL before launch —
 * the fallback below points at a dev/staging host.
 */
export const EXTERNAL_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://dev.fisdbs.com/OLBRETAIL/';
