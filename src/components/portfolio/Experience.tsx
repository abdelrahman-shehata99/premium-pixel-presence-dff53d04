import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";

const ROLES = [
  {
    role: "Mobile Application Developer",
    company: "iStoria",
    type: "Full-time",
    dates: "Jan 2025 – Present",
    location: "Riyadh, Saudi Arabia (Remote)",
    bullets: [
      "Build and maintain high-performance Flutter applications serving 5+ million users across iOS and Android, keeping interactions smooth and responsive at scale.",
      "Designed a reusable component and animation system that standardized the UI across the app and accelerated delivery of new features.",
      "Integrated AI model endpoints powering personalization and recommendation features that increased user retention.",
      "Established a rigorous testing approach (unit, widget, integration) and a structured bug-triage process, reducing user-reported issues by 30%.",
      "Led multiple Flutter projects end-to-end — from architecture and state-management design through App Store and Play Store release — with an emphasis on scalability and maintainability.",
      "Mentored junior developers through structured code reviews and pair programming, raising team code quality and delivery speed.",
    ],
  },
  {
    role: "Mobile Application Developer (Flutter)",
    company: "Drop Idea Company",
    type: "Full-time",
    dates: "May 2022 – Nov 2024",
    location: "Istanbul, Turkey (Remote)",
    bullets: [
      "Built complex animations and interactive UI components that elevated the look and usability of client products.",
      "Managed client relationships and scope across concurrent engagements, earning repeat business and successful project renewals.",
    ],
  },
  {
    role: "Mobile Application Developer",
    company: "B.TECH",
    type: "Full-time",
    dates: "May 2020 – Feb 2022",
    location: "Cairo, Egypt",
    bullets: [
      "Built and maintained the logistics and internal-operations app, integrating with backend inventory and order-management systems.",
      "Designed offline-capable flows with efficient API sync, reducing friction for warehouse and field staff.",
      "Improved performance and stability across modules to deliver a more reliable internal logistics tool.",
      "Set up CI/CD pipelines and code-quality standards to streamline releases and ongoing maintenance.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="02 — Experience"
          title="Where I've worked"
          description="Six years of Flutter — from internal logistics tools to consumer platforms at multi-million-user scale."
        />

        <Stagger className="relative">
          {/* timeline line */}
          <div
            aria-hidden
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-border"
          />
          <ol className="space-y-8 sm:space-y-10">
            {ROLES.map((r) => (
              <StaggerItem as="li" key={r.company} className="relative pl-10 sm:pl-14">
                <span
                  aria-hidden
                  className="absolute left-2 sm:left-3 top-7 h-3 w-3 rounded-full bg-primary ring-4 ring-background"
                />
                <article className="group rounded-2xl border border-border bg-card p-6 sm:p-8 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                        {r.role}
                      </h3>
                      <p className="mt-1 text-base text-primary font-medium">
                        {r.company} <span className="text-muted-foreground font-normal">· {r.type}</span>
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono-ui text-xs text-muted-foreground">{r.dates}</p>
                      <p className="font-mono-ui text-xs text-muted-foreground mt-1">{r.location}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {r.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="relative pl-5 text-sm sm:text-base text-muted-foreground leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-primary/70"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </ol>
        </Stagger>
      </div>
    </section>
  );
}
