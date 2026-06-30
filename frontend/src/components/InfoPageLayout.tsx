import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

interface InfoPageLayoutProps {
  title: string;
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

      <main className={`page-main mx-auto w-full ${maxWidth} flex-1 lg:px-8`}>
        <article className="page-card glass-panel info-page-panel">
          <h1 className="page-title">{title}</h1>
          <div className="prose-info mt-4 space-y-3 sm:mt-5 sm:space-y-4">{children}</div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
