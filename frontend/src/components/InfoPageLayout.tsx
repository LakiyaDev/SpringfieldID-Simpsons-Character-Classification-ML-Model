import Link from "next/link";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { SiteFooter } from "@/components/SiteFooter";

interface InfoPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function InfoPageLayout({ title, children }: InfoPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedBackground />

      <header className="glass-header sticky top-0 z-40">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-xl font-bold text-springfield-brown hover:opacity-80">
            Springfield ID
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-springfield-blue hover:text-springfield-brown"
          >
            ← Back to Classifier
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
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
