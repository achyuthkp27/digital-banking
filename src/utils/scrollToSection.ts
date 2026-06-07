import type { MouseEvent } from 'react';

/** Height of the fixed navbar, so scrolled-to sections aren't hidden beneath it. */
const NAV_OFFSET = 72;

/**
 * Smooth-scroll to an in-page section by id, accounting for the fixed navbar.
 *
 * Returns `true` if it handled the scroll (the target exists on the current
 * page) — in which case the click's default navigation was prevented.
 * Returns `false` if the target isn't on this page, so the caller should let a
 * `/#section` link navigate to the home page (where the browser resolves the
 * hash after load). Honours `prefers-reduced-motion`.
 */
export function scrollToSection(e: MouseEvent<HTMLAnchorElement>, id: string): boolean {
  if (typeof document === 'undefined') return false;
  const el = document.getElementById(id);
  if (!el) return false;

  e.preventDefault();
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
  return true;
}
