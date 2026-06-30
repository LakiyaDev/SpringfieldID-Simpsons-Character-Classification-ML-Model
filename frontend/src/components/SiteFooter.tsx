import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="glass-footer mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs sm:flex-row">
        <Link href="/" className="font-serif font-semibold text-springfield-brown hover:opacity-80">
          Springfield ID
        </Link>
        <nav className="flex gap-6 text-[var(--text-muted)]" aria-label="Legal and help">
          <Link href="/about" className="transition hover:text-springfield-brown">
            About
          </Link>
          <Link href="/privacy" className="transition hover:text-springfield-brown">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-springfield-brown">
            Terms
          </Link>
          <Link href="/help" className="transition hover:text-springfield-brown">
            Help
          </Link>
        </nav>
        <span className="text-[var(--text-muted)]/80">© 2026 Springfield ID. Unauthorized use is prohibited.</span>
      </div>
    </footer>
  );
}
