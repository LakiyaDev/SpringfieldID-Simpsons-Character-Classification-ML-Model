"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

type Tab = "classifier" | "history";

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="glass-header sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-springfield-brown hover:opacity-90">
          Springfield ID
        </Link>

        <nav className="absolute left-1/2 flex -translate-x-1/2 gap-8">
          <button
            type="button"
            onClick={() => onTabChange("classifier")}
            className={`nav-link pb-1 text-sm font-medium ${
              activeTab === "classifier" ? "nav-link-active" : "hover:text-springfield-brown"
            }`}
          >
            Classifier
          </button>
          <button
            type="button"
            onClick={() => onTabChange("history")}
            className={`nav-link pb-1 text-sm font-medium ${
              activeTab === "history" ? "nav-link-active" : "hover:text-springfield-brown"
            }`}
          >
            History
          </button>
          <Link
            href="/help"
            className="nav-link pb-1 text-sm font-medium hover:text-springfield-brown"
          >
            Help
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Profile"
            className="icon-btn flex h-9 w-9 items-center justify-center rounded-full"
          >
            <UserIcon />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" strokeLinecap="round" />
    </svg>
  );
}
