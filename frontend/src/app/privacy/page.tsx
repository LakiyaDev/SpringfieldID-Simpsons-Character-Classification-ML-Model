import type { Metadata } from "next";
import { InfoPageLayout } from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Springfield ID",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy">
      <p className="text-[var(--text-primary)]">
        Springfield ID is an educational portfolio project. This policy explains how your data is
        handled when you use the character classifier.
      </p>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Images you upload</h2>
        <p>
          When you upload a photo, it is sent to our backend server and then to{" "}
          <strong>Azure Custom Vision</strong> for classification. Images are processed in memory
          and are <strong>not stored permanently</strong> on our servers.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Prediction history</h2>
        <p>
          Recent identifications are kept only in your browser session for convenience. Clearing your
          browser data or closing the tab removes this history. We do not sync history to a database.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Third-party services</h2>
        <p>
          Image analysis is performed by Microsoft Azure Custom Vision. Data sent to Azure is subject
          to{" "}
          <a
            href="https://privacy.microsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-springfield-blue hover:underline"
          >
            Microsoft&apos;s privacy policies
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Cookies &amp; analytics</h2>
        <p>
          This app does not use tracking cookies or third-party analytics. Theme preference (light/dark
          mode) is stored locally in your browser via <code className="rounded bg-black/5 px-1 dark:bg-white/10">localStorage</code>.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Contact</h2>
        <p>
          For privacy questions about this project, contact the repository owner via the GitHub project
          page.
        </p>
      </section>

      <p className="text-xs">Last updated: June 2026</p>
    </InfoPageLayout>
  );
}
