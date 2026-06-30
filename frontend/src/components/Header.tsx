"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

type HomeTab = "classifier" | "history";

interface HeaderProps {
  homeTab?: HomeTab;
  onHomeTabChange?: (tab: HomeTab) => void;
}

function desktopNavClass(active: boolean) {
  return `nav-link pb-1 text-sm font-medium ${active ? "nav-link-active" : "hover:text-springfield-brown"}`;
}

function mobileNavClass(active: boolean) {
  return `nav-list-link block w-full px-3.5 py-3 text-left font-medium sm:px-4 sm:py-3.5 sm:text-sm ${
    active ? "nav-list-link-active" : ""
  }`;
}

export function Header({ homeTab = "classifier", onHomeTabChange }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const classifierActive = isHome && homeTab === "classifier";
  const historyActive = isHome && homeTab === "history";
  const aboutActive = pathname === "/about";
  const helpActive = pathname === "/help";
  const contactActive = pathname === "/contact";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="glass-header safe-top sticky top-0 z-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 md:py-4">
          <div className="min-w-0 shrink">
            <div className="sm:hidden">
              <Logo size="md" />
            </div>
            <div className="hidden sm:block">
              <Logo size="lg" />
            </div>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              <li>
                {isHome && onHomeTabChange ? (
                  <button
                    type="button"
                    onClick={() => onHomeTabChange("classifier")}
                    className={desktopNavClass(classifierActive)}
                  >
                    Classifier
                  </button>
                ) : (
                  <Link href="/" className={desktopNavClass(classifierActive)}>
                    Classifier
                  </Link>
                )}
              </li>
              <li>
                {isHome && onHomeTabChange ? (
                  <button
                    type="button"
                    onClick={() => onHomeTabChange("history")}
                    className={desktopNavClass(historyActive)}
                  >
                    History
                  </button>
                ) : (
                  <Link href="/?tab=history" className={desktopNavClass(historyActive)}>
                    History
                  </Link>
                )}
              </li>
              <li>
                <Link href="/about" className={desktopNavClass(aboutActive)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className={desktopNavClass(helpActive)}>
                  Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className={desktopNavClass(contactActive)}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="icon-btn flex h-10 w-10 items-center justify-center rounded-full md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <ThemeToggle />
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" className="border-t border-[var(--header-border)] md:hidden" aria-label="Main navigation">
            <ul className="mobile-nav-list">
              <li>
                {isHome && onHomeTabChange ? (
                  <button
                    type="button"
                    onClick={() => {
                      onHomeTabChange("classifier");
                      closeMenu();
                    }}
                    className={mobileNavClass(classifierActive)}
                  >
                    Classifier
                  </button>
                ) : (
                  <Link href="/" onClick={closeMenu} className={mobileNavClass(classifierActive)}>
                    Classifier
                  </Link>
                )}
              </li>
              <li>
                {isHome && onHomeTabChange ? (
                  <button
                    type="button"
                    onClick={() => {
                      onHomeTabChange("history");
                      closeMenu();
                    }}
                    className={mobileNavClass(historyActive)}
                  >
                    History
                  </button>
                ) : (
                  <Link href="/?tab=history" onClick={closeMenu} className={mobileNavClass(historyActive)}>
                    History
                  </Link>
                )}
              </li>
              <li>
                <Link href="/about" onClick={closeMenu} className={mobileNavClass(aboutActive)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" onClick={closeMenu} className={mobileNavClass(helpActive)}>
                  Help
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMenu} className={mobileNavClass(contactActive)}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
