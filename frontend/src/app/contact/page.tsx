import Link from "next/link";
import { InfoPageLayout } from "@/components/InfoPageLayout";
import { SocialIcon } from "@/components/SocialIcon";
import { contactLinks } from "@/lib/contactLinks";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata(
  "Contact Us",
  "Get in touch with Springfield ID creator LakiyaDev and explore the GitHub repository."
);

const socialItems = [
  { platform: "github" as const, ...contactLinks.github },
  { platform: "linkedin" as const, ...contactLinks.linkedin },
  { platform: "instagram" as const, ...contactLinks.instagram },
] as const;

const contactCardClass =
  "group block w-full rounded-lg border border-black/5 bg-white/30 px-3 py-2.5 transition hover:border-springfield-blue/30 hover:bg-white/50 sm:rounded-xl sm:px-3.5 sm:py-3 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10";

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact Us" contentSize="content">
      <p>
        Questions about Springfield ID, collaboration ideas, or feedback on the classifier? Reach out
        through the links below from{" "}
        <strong>{contactLinks.author.name}</strong> ({contactLinks.author.handle}).
      </p>

      <section>
        <h2>Email</h2>
        <a href={`mailto:${contactLinks.email}`} className={contactCardClass}>
          <div className="flex items-center gap-2">
            <MailIcon />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[var(--text-primary)] sm:text-sm">Email</p>
              <p className="truncate text-[0.6875rem] text-springfield-blue group-hover:underline sm:text-xs">
                {contactLinks.email}
              </p>
            </div>
          </div>
        </a>
      </section>

      <section>
        <h2>Repository</h2>
        <a
          href={contactLinks.repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className={contactCardClass}
        >
          <div className="flex items-center gap-2">
            <SocialIcon platform="github" className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                {contactLinks.repository.label}
              </p>
              <p className="truncate text-[0.6875rem] text-springfield-blue group-hover:underline sm:text-xs">
                {contactLinks.repository.url.replace("https://", "")}
              </p>
            </div>
          </div>
        </a>
      </section>

      <section>
        <h2>Social media</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {socialItems.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactCardClass} flex items-center justify-center gap-1.5 px-2 py-2 text-center sm:gap-2 sm:py-2.5`}
            >
              <SocialIcon platform={item.platform} className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span className="text-[0.625rem] font-medium leading-none text-[var(--text-primary)] sm:text-xs">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2>More resources</h2>
        <p>
          Visit the <Link href="/about" className="text-springfield-blue hover:underline">About</Link>{" "}
          page for model details, or check <Link href="/help" className="text-springfield-blue hover:underline">Help</Link>{" "}
          for usage tips and troubleshooting.
        </p>
      </section>
    </InfoPageLayout>
  );
}

function MailIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-springfield-blue sm:h-5 sm:w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
