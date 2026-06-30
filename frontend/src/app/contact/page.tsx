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
];

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact Us" wide>
      <p className="text-[var(--text-primary)]">
        Questions about Springfield ID, collaboration ideas, or feedback on the classifier? Reach out
        through the links below from{" "}
        <strong>{contactLinks.author.name}</strong> ({contactLinks.author.handle}).
      </p>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">Email</h2>
        <a
          href={`mailto:${contactLinks.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-black/5 bg-white/30 px-4 py-3 text-sm font-medium text-springfield-blue transition hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
        >
          {contactLinks.email}
        </a>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">Repository</h2>
        <a
          href={contactLinks.repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-black/5 bg-white/30 p-5 transition hover:border-springfield-blue/30 hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
        >
          <div className="mb-2 flex items-center gap-2 text-[var(--text-primary)]">
            <SocialIcon platform="github" className="h-5 w-5" />
            <span className="font-medium">{contactLinks.repository.label}</span>
          </div>
          <p className="text-sm">{contactLinks.repository.description}</p>
          <p className="mt-2 truncate text-xs text-springfield-blue group-hover:underline">
            {contactLinks.repository.url.replace("https://", "")}
          </p>
        </a>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">Social media</h2>
        <div className="flex flex-wrap gap-3">
          {socialItems.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-black/5 bg-white/30 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-springfield-blue/30 hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <SocialIcon platform={item.platform} />
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">More resources</h2>
        <p>
          Visit the <Link href="/about" className="text-springfield-blue hover:underline">About</Link>{" "}
          page for model details, or check <Link href="/help" className="text-springfield-blue hover:underline">Help</Link>{" "}
          for usage tips and troubleshooting.
        </p>
      </section>
    </InfoPageLayout>
  );
}
