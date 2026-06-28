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
      "Built and shipped high-performance Flutter features across iOS and Android — keeping interactions smooth for 5M+ users and holding a [ADD METRIC]% crash-free session rate.",
      "Designed and shipped a reusable component & animation system that standardized the UI across [ADD METRIC] feature modules and cut new-screen build time by ~[ADD METRIC]%.",
      "Integrated AI personalization & recommendation endpoints (model APIs + on-device caching) that lifted user retention by [ADD METRIC]% and session depth by [ADD METRIC]%.",
      "Established a rigorous test suite (unit, widget, integration) and a structured bug-triage process, reducing user-reported issues by 30% and raising coverage to [ADD METRIC]%.",
      "Led [ADD METRIC] Flutter projects end-to-end — architecture, state management, App Store & Play Store release — with a focus on scalability and maintainability.",
      "Mentored [ADD METRIC] junior developers through structured code reviews and pair programming, raising team code quality and unblocking delivery week over week.",
    ],
  },
  {
    role: "Mobile Application Developer (Flutter)",
    company: "Drop Idea Company",
    type: "Full-time",
    dates: "May 2022 – Nov 2024",
    location: "Istanbul, Turkey (Remote)",
    bullets: [
      "Shipped complex Flutter animations & interactive UI components for [ADD METRIC] client products, raising visual polish and usability against agreed UX benchmarks.",
      "Owned client relationships and scope across [ADD METRIC] concurrent engagements, earning repeat business and successful project renewals.",
    ],
  },
  {
    role: "Mobile Application Developer",
    company: "B.TECH",
    type: "Full-time",
    dates: "May 2020 – Feb 2022",
    location: "Cairo, Egypt",
    bullets: [
      "Built and maintained the logistics & internal-operations app integrating with backend inventory and order-management systems, used by [ADD METRIC] warehouse and field staff daily.",
      "Designed offline-capable flows with efficient API sync, reducing data-entry errors by [ADD METRIC]% and unblocking work in low-connectivity warehouses.",
      "Improved performance and stability across [ADD METRIC] feature modules, taking app start time from [ADD METRIC]s to [ADD METRIC]s.",
      "Set up CI/CD pipelines and code-quality gates that cut release prep time by [ADD METRIC]% and standardized ongoing maintenance.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 scroll-mt-24">
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
                <article className="group rounded-2xl border border-border bg-card p-5 sm:p-8 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-2xl font-semibold tracking-tight">
                        {r.role}
                      </h3>
                      <p className="mt-1 text-base text-primary font-medium break-words">
                        {r.company} <span className="text-muted-foreground font-normal">· {r.type}</span>
                      </p>
                    </div>
                    <div className="sm:shrink-0 sm:text-right">
                      <p className="font-mono-ui text-xs text-muted-foreground">{r.dates}</p>
                      <p className="font-mono-ui text-xs text-muted-foreground mt-1">{r.location}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {r.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="relative pl-5 text-[15px] sm:text-base text-muted-foreground leading-relaxed"
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
