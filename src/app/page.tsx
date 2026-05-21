import { redirect } from 'next/navigation';

// For GitHub Pages static export without middleware, we need to redirect the root to the default locale.
// In a standard deployment, this would be handled by next-intl middleware.
export default function RootPage() {
  redirect('/en');
}
