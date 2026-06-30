import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

interface InfoPageLayoutProps {
  title: string;
  /** Shared width for About, Help, and Contact pages */
  contentSize?: "default" | "content";
  children: React.ReactNode;
}

const widthClasses = {
  default: "max-w-3xl",
  content: "max-w-5xl",
} as const;

export function InfoPageLayout({
  title,
  contentSize = "default",
  children,
}: InfoPageLayoutProps) {
  const maxWidth = widthClasses[contentSize];

  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedBackground />
      <Header />

      <main className={`mx-auto w-full ${maxWidth} flex-1 px-4 py-8 sm:px-6 lg:px-8`}>
        <article className="glass-panel info-page-panel rounded-3xl p-8 md:p-10">
          <h1 className="font-serif text-3xl font-bold text-[var(--text-primary)]">{title}</h1>
          <div className="prose-info mt-6 space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">
            {children}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
