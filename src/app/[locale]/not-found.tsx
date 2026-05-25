import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-[120px] font-syne font-bold leading-none bg-gradient-to-br from-[var(--accent)] to-blue-500 text-transparent bg-clip-text mb-4">
        404
      </h1>
      <h2 className="text-3xl font-syne font-bold text-[var(--text-primary)] mb-4">
        Page Not Found
      </h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md">
          The page you are looking for doesn&rsquo;t exist or has been moved.
        </p>
      <Link
        href="/"
        className="px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bg-base)] font-bold transition-transform hover:scale-105"
      >
        Return Home
      </Link>
    </div>
  );
}
