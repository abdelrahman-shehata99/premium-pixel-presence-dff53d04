import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";

const GROUPS = [
  {
    title: "Languages & Frameworks",
    items: ["Flutter", "Dart", "Java", "Swift", "JavaScript", "HTML", "CSS", "PHP", "Laravel"],
  },
  {
    title: "Flutter Architecture & State Management",
    items: [
      "Clean Architecture",
      "MVVM",
      "BLoC / Cubit",
      "Riverpod",
      "Provider",
      "GetX",
      "Dependency injection (get_it)",
      "go_router",
      "Feature-first modularization",
    ],
  },
  {
    title: "Security & Authentication",
    items: [
      "Biometric auth (Face ID / Touch ID / fingerprint)",
      "Secure storage (flutter_secure_storage, Keychain / Keystore)",
      "SSL / certificate pinning",
      "OAuth 2.0 / OpenID Connect",
      "JWT & token refresh",
      "Encryption at rest",
      "Code obfuscation (R8 / ProGuard)",
      "Root / jailbreak detection",
    ],
  },
  {
    title: "Data, Sync & APIs",
    items: [
      "PowerSync (client-side SQLite, server sync)",
      "SQLite",
      "Drift",
      "Hive",
      "REST APIs",
      "Dio / Retrofit",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Firebase",
      "AWS S3",
    ],
  },
  {
    title: "Quality, CI/CD & Observability",
    items: [
      "Automated testing (unit, widget, integration)",
      "Mockito",
      "Golden tests",
      "CI/CD (GitHub Actions, Codemagic, Fastlane)",
      "Performance profiling",
      "Sentry",
      "Crashlytics",
      "Firebase Analytics",
      "Mixpanel",
    ],
  },
  {
    title: "Localization, AI & Features",
    items: [
      "Arabic / English localization (intl)",
      "RTL layout support",
      "Push notifications (FCM)",
      "Deep linking",
      "AI model endpoint integration",
      "Personalization & recommendations",
    ],
  },
  {
    title: "Tools & Collaboration",
    items: [
      "Git (GitHub / GitLab)",
      "Code review",
      "Jira",
      "Agile / Scrum",
      "Figma handoff",
      "Mentoring & technical leadership",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="03 — Skills"
          title="Engineering toolkit"
          description="The stack and practices I rely on to ship reliable mobile software."
        />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {GROUPS.map((g) => (
            <StaggerItem
              key={g.title}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <h3 className="text-base font-semibold tracking-tight">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="font-mono-ui text-[11px] sm:text-xs px-2.5 py-1 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
