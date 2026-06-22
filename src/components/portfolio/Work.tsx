import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { ArrowUpRight, Sparkles } from "lucide-react";

const TAGS = ["Flutter", "iOS", "Android", "AI Personalization", "Clean Architecture"];

export function Work() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="04 — Selected work"
          title="iStoria"
          description="A consumer platform serving 5M+ users with strong engagement across Saudi Arabia."
        />

        <Reveal>
          <article className="rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12 flex flex-col">
                <div className="inline-flex w-fit items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-primary border border-primary/30 rounded-full px-3 py-1">
                  <Sparkles className="h-3 w-3" /> Featured project
                </div>
                <h3 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">
                  iStoria — at multi-million-user scale
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Led Flutter delivery, built a reusable component &amp; animation
                  system, and integrated AI-powered personalization and
                  recommendations. Standardized the UI across the app and shipped
                  features with measurable retention impact.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <li
                      key={t}
                      className="font-mono-ui text-xs px-2.5 py-1 rounded-md border border-border text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex">
                  <button
                    disabled
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-border text-sm text-muted-foreground cursor-not-allowed"
                    aria-disabled="true"
                    title="Link coming soon"
                  >
                    Visit <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stylized phone mockup */}
              <div className="relative min-h-[360px] lg:min-h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 flex items-center justify-center p-8 sm:p-12 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, hsl(174 72% 50% / 0.4), transparent 60%)",
                  }}
                />
                <div className="relative w-[200px] sm:w-[230px] aspect-[9/19] rounded-[2.2rem] border border-border bg-background shadow-2xl shadow-primary/10 p-2">
                  <div className="h-full w-full rounded-[1.8rem] overflow-hidden relative bg-gradient-to-br from-primary/20 to-card">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-foreground/80" />
                    <div className="absolute inset-0 p-5 pt-10 flex flex-col gap-3">
                      <div className="h-3 w-20 rounded-full bg-foreground/20" />
                      <div className="h-5 w-32 rounded-full bg-foreground/40" />
                      <div className="mt-4 h-24 rounded-xl bg-primary/30 border border-primary/40" />
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="h-16 rounded-lg bg-foreground/10" />
                        <div className="h-16 rounded-lg bg-foreground/10" />
                      </div>
                      <div className="h-3 w-24 rounded-full bg-foreground/20 mt-2" />
                      <div className="h-3 w-16 rounded-full bg-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
