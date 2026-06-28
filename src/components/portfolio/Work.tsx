import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import screenJourney from "@/assets/screen-journey.png.asset.json";

type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  image?: string;
  featured?: boolean;
  placeholder?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "iStoria",
    tagline: "Consumer learning platform at multi-million-user scale",
    description:
      "Led Flutter delivery, built a reusable component & animation system, and integrated AI-powered personalization and recommendations. Serving 5M+ users with strong engagement across Saudi Arabia.",
    tags: ["Flutter", "iOS", "Android", "AI Personalization", "Clean Architecture"],
    liveUrl:
      "https://apps.apple.com/us/app/learn-english-easily-istoria/id1527544903",
    image: screenJourney.url,
    featured: true,
  },
  {
    title: "REPLACE ME — Project name",
    tagline: "REPLACE ME — One-line problem this project solves",
    description:
      "REPLACE ME — Two to three sentences describing your role, the stack choices that mattered, and the outcome (users, performance, retention, release cadence).",
    tags: ["Flutter", "Dart", "REPLACE ME"],
    liveUrl: "#",
    sourceUrl: "#",
    placeholder: true,
  },
  {
    title: "REPLACE ME — Project name",
    tagline: "REPLACE ME — One-line problem this project solves",
    description:
      "REPLACE ME — Two to three sentences describing your role, the stack choices that mattered, and the outcome.",
    tags: ["Flutter", "REPLACE ME", "REPLACE ME"],
    liveUrl: "#",
    sourceUrl: "#",
    placeholder: true,
  },
];

export function Work() {
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="work" className="py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="04 — Selected work"
          title="Projects"
          description="A featured spotlight plus a growing grid of shipped work."
        />

        {featured && (
          <article className="rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-6 sm:p-12 flex flex-col">
                <div className="inline-flex w-fit items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-primary border border-primary/30 rounded-full px-3 py-1">
                  <Sparkles className="h-3 w-3" /> Featured project
                </div>
                <h3 className="mt-6 text-2xl sm:text-4xl font-bold tracking-tight break-words">
                  {featured.title} — at multi-million-user scale
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {featured.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono-ui text-xs px-2.5 py-1 rounded-md border border-border text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-11 px-4 rounded-lg border border-border text-sm hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all"
                    >
                      Visit <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Phone mockup with real iStoria screenshot */}
              <div className="relative min-h-[320px] lg:min-h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 flex items-center justify-center p-8 sm:p-12 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, hsl(174 72% 50% / 0.4), transparent 60%)",
                  }}
                />
                <div className="relative w-[180px] sm:w-[230px] aspect-[9/19] rounded-[2.2rem] border border-border bg-background shadow-2xl shadow-primary/10 p-2">
                  <div className="h-full w-full rounded-[1.8rem] overflow-hidden relative bg-black">
                    {featured.image && (
                      <img
                        src={featured.image}
                        alt="iStoria app screenshot"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-black/80 z-10" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        <Stagger className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2">
          {others.map((p) => (
            <StaggerItem
              key={p.title}
              className={`group rounded-2xl border bg-card p-6 sm:p-7 flex flex-col hover:-translate-y-0.5 hover:shadow-lg transition-all ${
                p.placeholder
                  ? "border-dashed border-border/70"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {p.placeholder && (
                <span className="self-start font-mono-ui text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-full px-2 py-0.5">
                  Placeholder · replace me
                </span>
              )}
              <h3 className="mt-3 text-xl font-semibold tracking-tight break-words">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-primary font-medium break-words">
                {p.tagline}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {p.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="font-mono-ui text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-md border border-border text-xs hover:border-primary hover:text-primary transition-colors"
                  >
                    Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {p.sourceUrl && (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-md border border-border text-xs hover:border-primary hover:text-primary transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" /> Source
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/*
          ───────────────────────────────────────────────────────────────────────
          Optional "Writing / Articles" section — re-enable when you publish.
          Uses the same card pattern as Projects. To turn on:
            1. Uncomment the block below.
            2. Add a corresponding nav entry in src/components/portfolio/Navbar.tsx
               (e.g. { id: "writing", label: "Writing" }).
          ───────────────────────────────────────────────────────────────────────

          <div className="mt-20">
            <SectionHeader
              eyebrow="05 — Writing"
              title="Articles"
              description="Notes on Flutter architecture, performance, and shipping at scale."
            />
            <Stagger className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              {ARTICLES.map((a) => (
                <StaggerItem
                  key={a.title}
                  className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-all"
                >
                  <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {a.publication} · {a.date}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.summary}</p>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        */}
      </div>
    </section>
  );
}
