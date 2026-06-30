"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

type HomeTab = "classifier" | "history";

interface HeaderProps {
  homeTab?: HomeTab;
  onHomeTabChange?: (tab: HomeTab) => void;
}

function navClass(active: boolean) {
  return `nav-link pb-1 text-sm font-medium ${active ? "nav-link-active" : "hover:text-springfield-brown"}`;
}

export function Header({ homeTab = "classifier", onHomeTabChange }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const classifierActive = isHome && homeTab === "classifier";
  const historyActive = isHome && homeTab === "history";
  const aboutActive = pathname === "/about";
  const helpActive = pathname === "/help";
  const contactActive = pathname === "/contact";

  return (
    <header className="glass-header sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo size="lg" />

        <nav className="absolute left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-x-5 gap-y-1 md:gap-x-6">
          {isHome && onHomeTabChange ? (
            <button
              type="button"
              onClick={() => onHomeTabChange("classifier")}
              className={navClass(classifierActive)}
            >
              Classifier
            </button>
          ) : (
            <Link href="/" className={navClass(classifierActive)}>
              Classifier
            </Link>
          )}

          {isHome && onHomeTabChange ? (
            <button
              type="button"
              onClick={() => onHomeTabChange("history")}
              className={navClass(historyActive)}
            >
              History
            </button>
          ) : (
            <Link href="/?tab=history" className={navClass(historyActive)}>
              History
            </Link>
          )}

          <Link href="/about" className={navClass(aboutActive)}>
            About
          </Link>

          <Link href="/help" className={navClass(helpActive)}>
            Help
          </Link>

          <Link href="/contact" className={navClass(contactActive)}>
            Contact
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
