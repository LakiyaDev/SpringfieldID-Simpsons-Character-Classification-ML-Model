import Link from "next/link";
import { InfoPageLayout } from "@/components/InfoPageLayout";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata(
  "About",
  "Learn about the Springfield ID Simpsons character classifier — Azure Custom Vision model, dataset, and performance metrics."
);

const MODEL_METRICS = [
  { label: "Precision", value: "95.1%", color: "#8b5cf6", description: "How often predictions are correct" },
  { label: "Recall", value: "88.3%", color: "#3b82f6", description: "How many characters are found" },
  { label: "Average Precision", value: "97.1%", color: "#22c55e", description: "Overall model quality score" },
] as const;

const TAG_PERFORMANCE = [
  { tag: "GroundsKeeper Willie", precision: 100, recall: 100, ap: 100, images: 100 },
  { tag: "Edna Krabappel", precision: 100, recall: 100, ap: 100, images: 100 },
  { tag: "Carl Carlson", precision: 100, recall: 100, ap: 100, images: 98 },
  { tag: "Lisa Simpson", precision: 100, recall: 90, ap: 99.3, images: 100 },
  { tag: "Apu Nahasapeemapetilon", precision: 100, recall: 95, ap: 99.3, images: 100 },
  { tag: "Bart Simpson", precision: 100, recall: 90, ap: 98.2, images: 100 },
  { tag: "Milhouse Van Houten", precision: 100, recall: 85, ap: 98.0, images: 100 },
  { tag: "Kent Brockman", precision: 100, recall: 85, ap: 95.2, images: 100 },
  { tag: "Maggie Simpson", precision: 95, recall: 95, ap: 98.4, images: 100 },
  { tag: "Abraham Grampa Simpson", precision: 95, recall: 95, ap: 98.1, images: 101 },
  { tag: "Mayor Quimby", precision: 94.4, recall: 85, ap: 98.1, images: 100 },
  { tag: "Charles Montgomery Burns", precision: 94.4, recall: 85, ap: 97.9, images: 100 },
  { tag: "Homer Simpson", precision: 94.4, recall: 85, ap: 96.6, images: 100 },
  { tag: "Krusty the Clown", precision: 94.7, recall: 90, ap: 95.4, images: 100 },
  { tag: "Marge Simpson", precision: 90.5, recall: 95, ap: 95.7, images: 100 },
  { tag: "Ned Flanders", precision: 93.3, recall: 70, ap: 94.5, images: 100 },
  { tag: "Lenny Leonard", precision: 94.4, recall: 85, ap: 94.1, images: 100 },
  { tag: "Chief Wiggum", precision: 94.1, recall: 80, ap: 93.9, images: 100 },
  { tag: "Moe Szyslak", precision: 89.5, recall: 85, ap: 92.6, images: 100 },
  { tag: "Barney Gumble", precision: 88.9, recall: 80, ap: 95.3, images: 100 },
  { tag: "Comic Book Guy", precision: 80, recall: 80, ap: 90.3, images: 100 },
].sort((a, b) => b.ap - a.ap);

const TECH_STACK = [
  { layer: "Frontend", tools: "Next.js 16, React, Tailwind CSS, Framer Motion" },
  { layer: "Backend", tools: "Node.js, Express, Multer" },
  { layer: "AI / ML", tools: "Azure Custom Vision (Multiclass Classification)" },
  { layer: "Model", tools: "SimpsonMLIteration2 · General [A2] domain" },
  { layer: "Cloud", tools: "Azure Cognitive Services (Training + Prediction)" },
];

export default function AboutPage() {
  return (
    <InfoPageLayout title="About Springfield ID" contentSize="content">
      <p>
        <strong>Springfield ID</strong> is an AI-powered web application that identifies characters
        from <em>The Simpsons</em> using a custom machine learning model trained on Azure. Upload a
        photo and the app predicts which Springfield resident appears in the image — complete with
        confidence scores, character bios, and prediction history.
      </p>

      <section>
        <h2>What this project demonstrates</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>End-to-end ML deployment: dataset → training → published model → production API</li>
          <li>Cloud AI integration with Microsoft Azure Custom Vision Prediction API</li>
          <li>Full-stack development with a modern React frontend and REST backend</li>
          <li>Portfolio-grade UX: glassmorphism UI, dark mode, responsive design, and accessibility</li>
        </ul>
      </section>

      <section>
        <h2>Model performance</h2>
        <p className="mb-5">
          The classifier was trained on <strong>2,141 images</strong> across <strong>21 character tags</strong>{" "}
          (~100 images per character). Published as <strong>SimpsonMLIteration2</strong>, the model achieves
          strong results on Azure&apos;s evaluation metrics:
        </p>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {MODEL_METRICS.map((metric) => (
            <div key={metric.label} className="stat-card rounded-2xl p-5 text-center">
              <div
                className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: metric.color }}
              >
                {metric.value}
              </div>
              <p className="font-semibold text-[var(--text-primary)]">{metric.label}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{metric.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Performance per character</h2>
        <p className="mb-4">
          Eight characters achieved <strong>100% precision</strong>, and three reached perfect scores
          across precision, recall, and average precision. Even the lowest-performing tag (Comic Book Guy)
          maintains <strong>90.3% AP</strong>.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-black/5 dark:border-white/10">
          <table className="w-full min-w-[540px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-white/40 dark:border-white/10 dark:bg-white/5">
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">Character</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">Precision</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">Recall</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">A.P.</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">Images</th>
              </tr>
            </thead>
            <tbody>
              {TAG_PERFORMANCE.map((row) => (
                <tr
                  key={row.tag}
                  className="border-b border-black/5 last:border-0 dark:border-white/5"
                >
                  <td className="px-4 py-2.5 text-[var(--text-primary)]">{row.tag}</td>
                  <td className="px-4 py-2.5 font-mono text-springfield-blue">{row.precision}%</td>
                  <td className="px-4 py-2.5 font-mono text-springfield-blue">{row.recall}%</td>
                  <td className="px-4 py-2.5 font-mono font-medium text-springfield-brown">
                    {row.ap}%
                  </td>
                  <td className="px-4 py-2.5 text-[var(--text-muted)]">{row.images}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>How it works</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>You upload a Simpsons character image through the web interface.</li>
          <li>The Express backend receives the image and forwards it to Azure Custom Vision.</li>
          <li>The published model <code className="rounded bg-black/5 px-1 dark:bg-white/10">SimpsonMLIteration2</code> returns probability scores for all 21 tags.</li>
          <li>The backend enriches the top prediction with character metadata (occupation, quote, family).</li>
          <li>The frontend displays the result with confidence bars and prediction history.</li>
        </ol>
      </section>

      <section>
        <h2>Technology stack</h2>
        <div className="space-y-2">
          {TECH_STACK.map((item) => (
            <div
              key={item.layer}
              className="flex flex-col gap-1 rounded-xl border border-black/5 bg-white/30 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 dark:border-white/10 dark:bg-white/5"
            >
              <span className="w-24 shrink-0 text-sm font-semibold text-springfield-brown">
                {item.layer}
              </span>
              <span className="text-sm text-[var(--text-muted)]">{item.tools}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Dataset &amp; training</h2>
        <p>
          The <strong>SimpsonsML</strong> project on Azure Custom Vision uses multiclass image
          classification with the General [A2] domain. Training images were labeled with character
          names matching the show&apos;s cast — from the Simpson family to recurring Springfield
          residents like Apu, Moe, Chief Wiggum, and Comic Book Guy. The balanced dataset (~100
          images per tag) helps prevent bias toward any single character.
        </p>
      </section>

      <section className="rounded-2xl border border-springfield-blue/20 bg-springfield-blue/5 p-5">
        <p className="text-sm text-[var(--text-primary)]">
          Ready to try it? Head to the{" "}
          <Link href="/" className="font-medium text-springfield-blue hover:underline">
            Classifier
          </Link>{" "}
          and upload a Springfield resident. For setup help, see the{" "}
          <Link href="/help" className="font-medium text-springfield-blue hover:underline">
            Help page
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-[var(--text-muted)]">
        Educational portfolio project. <em>The Simpsons</em> is a trademark of its respective owners.
        This app is not affiliated with or endorsed by Fox or Disney.
      </p>
    </InfoPageLayout>
  );
}
