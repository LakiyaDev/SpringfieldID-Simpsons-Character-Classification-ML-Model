import Link from "next/link";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";

interface InfoPageLayoutProps {
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}

export function InfoPageLayout({ title, wide, children }: InfoPageLayoutProps) {
  const maxWidth = wide ? "max-w-5xl" : "max-w-3xl";
  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedBackground />

      <header className="glass-header sticky top-0 z-40">
        <div className={`mx-auto flex ${maxWidth} items-center justify-between px-6 py-4`}>
          <Logo size="md" />
          <Link
            href="/"
            className="text-sm font-medium text-springfield-blue hover:text-springfield-brown"
          >
            ← Back to Classifier
          </Link>
        </div>
      </header>

      <main className={`mx-auto w-full ${maxWidth} flex-1 px-4 py-8 sm:px-6`}>
        <article className="glass-panel rounded-3xl p-8 md:p-10">
          <h1 className="font-serif text-3xl font-bold text-[var(--text-primary)]">{title}</h1>
          <div className="prose-info mt-6 space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
            {children}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
