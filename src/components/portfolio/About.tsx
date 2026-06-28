import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import headshot from "@/assets/headshot.jpg.asset.json";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader eyebrow="01 — About" title="About" />
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-3 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <div className="flex items-center gap-4 mb-2">
              <img
                src={headshot.url}
                srcSet={`${headshot.url} 2x`}
                alt="Abdelrahman Shehata — Senior Flutter Engineer"
                loading="lazy"
                decoding="async"
                width={88}
                height={88}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border border-border shadow-md shrink-0"
              />
              <div className="min-w-0">
                <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-primary">
                  Abdelrahman Shehata
                </p>
                <p className="mt-1 text-foreground font-medium">
                  Senior Flutter Engineer · Cairo, Egypt
                </p>
              </div>
            </div>
            <p>
              Senior mobile engineer with{" "}
              <span className="text-foreground font-medium">6+ years</span>{" "}
              building and scaling production Flutter applications, including{" "}
              <span className="text-foreground font-medium">iStoria</span> — a
              platform serving 5+ million users with strong engagement across
              Saudi Arabia.
            </p>
            <p>
              Deep expertise in Flutter, Dart, and Java, with a focus on
              performance optimization, clean architecture, and reliable
              release engineering. Experienced integrating AI model endpoints
              to power personalization and recommendation features in live
              apps, and partnering closely with product, design, and backend
              teams to ship user-focused features with measurable impact.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
              <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Currently
              </p>
              <p className="mt-3 text-lg font-medium">
                Mobile Application Developer
              </p>
              <p className="text-muted-foreground">
                iStoria · Riyadh (Remote)
              </p>
              <div className="my-6 h-px bg-border" />
              <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Focus
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>— Production-grade Flutter at scale</li>
                <li>— Clean architecture &amp; release engineering</li>
                <li>— AI personalization &amp; recommendations</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
