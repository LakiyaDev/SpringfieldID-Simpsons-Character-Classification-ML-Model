import { Logo } from "@/components/Logo";
import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/help", label: "Help" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="glass-footer safe-bottom mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-3 py-4 text-center text-[0.6875rem] leading-relaxed sm:flex-row sm:justify-between sm:px-6 sm:text-xs sm:text-left">
        <Logo size="sm" />
        <nav
          className="flex max-w-full flex-wrap justify-center gap-x-3 gap-y-1.5 text-[var(--text-muted)] sm:gap-x-5"
          aria-label="Legal and help"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition hover:text-springfield-brown"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="max-w-[14rem] text-[var(--text-muted)]/80 sm:max-w-none">
          © 2026 Springfield ID
        </span>
      </div>
    </footer>
  );
}
