import Link from "next/link";
import { InfoPageLayout } from "@/components/InfoPageLayout";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata(
  "Help",
  "How to use Springfield ID, tips for better accuracy, and troubleshooting Azure Custom Vision setup."
);

export default function HelpPage() {
  return (
    <InfoPageLayout title="Help & FAQ">
      <p className="text-[var(--text-primary)]">
        Springfield ID identifies Simpsons characters from uploaded images using Azure Custom Vision
        AI. Here&apos;s how to get the best results.
      </p>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">How to use</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Go to the <Link href="/" className="text-springfield-blue hover:underline">Classifier</Link> page.</li>
          <li>Drag and drop a photo into the upload area, or click <strong>Select from Computer</strong>.</li>
          <li>Wait a moment — analysis runs automatically.</li>
          <li>View the identified character, confidence score, and top predictions on the right.</li>
          <li>Check <strong>History</strong> in the header to revisit past identifications.</li>
        </ol>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Tips for better accuracy</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Use a clear image of a <strong>single character</strong> facing the camera.</li>
          <li>Avoid group shots, heavy blur, or non-Simpsons images.</li>
          <li>Supported formats: JPG, PNG, WEBP (max 10 MB).</li>
          <li>Higher resolution close-ups generally improve confidence.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Supported characters</h2>
        <p>
          The model recognizes characters it was trained on in Azure Custom Vision (21 tags in the
          SimpsonsML project), including Homer, Marge, Bart, Lisa, Maggie, Ned Flanders, Mr. Burns,
          Milhouse, and others from your training set.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Troubleshooting</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-black/5 bg-white/30 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="font-medium text-[var(--text-primary)]">Analysis failed / Invalid Prediction Key</p>
            <p className="mt-1">
              Ensure <code className="rounded bg-black/5 px-1 dark:bg-white/10">backend/.env</code> uses
              the key from <strong>simpsonsml-prediction</strong> (not the Training resource), and restart
              the backend with <code className="rounded bg-black/5 px-1 dark:bg-white/10">npm run dev</code>.
            </p>
          </div>
          <div className="rounded-xl border border-black/5 bg-white/30 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="font-medium text-[var(--text-primary)]">Azure is not configured banner</p>
            <p className="mt-1">
              The backend API is not running or environment variables are missing. Start both frontend
              and backend from the project root.
            </p>
          </div>
          <div className="rounded-xl border border-black/5 bg-white/30 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="font-medium text-[var(--text-primary)]">Low confidence scores</p>
            <p className="mt-1">
              Try a different angle, crop to one character, or use an image similar to your training data.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">Dark mode</h2>
        <p>
          Click the sun/moon button in the top-right corner of the header to switch between light and
          dark themes. Your preference is saved automatically.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[var(--text-primary)]">More information</h2>
        <p>
          See our <Link href="/about" className="text-springfield-blue hover:underline">About</Link> page,{" "}
          <Link href="/privacy" className="text-springfield-blue hover:underline">Privacy Policy</Link>{" "}
          and <Link href="/terms" className="text-springfield-blue hover:underline">Terms of Use</Link> for
          additional details.
        </p>
      </section>
    </InfoPageLayout>
  );
}
