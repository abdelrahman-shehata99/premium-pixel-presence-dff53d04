import { useState } from "react";
import { ArrowUpRight, Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";
import { RECOMMENDATIONS } from "@/data/recommendations";

const DEFAULT_VISIBLE = 4;

export function Recommendations() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded
    ? RECOMMENDATIONS
    : RECOMMENDATIONS.slice(0, DEFAULT_VISIBLE);
  const hasMore = RECOMMENDATIONS.length > DEFAULT_VISIBLE;

  return (
    <section id="recommendations" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="05 — Recommendations"
          title="What people say"
          description="Endorsements from teammates and managers I've worked with."
        />

        <Stagger className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          {visible.map((r, i) => (
            <StaggerItem
              key={`${r.name}-${i}`}
              className="group rounded-2xl border border-border bg-card p-6 sm:p-7 flex flex-col hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <Quote
                aria-hidden
                className="h-6 w-6 text-primary/60 shrink-0"
              />
              <blockquote className="mt-4 text-base sm:text-[17px] leading-relaxed text-foreground/90">
                "{r.quote}"
              </blockquote>
              <div className="mt-6 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <a
                    href={r.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors break-words"
                  >
                    {r.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                  <p className="mt-0.5 text-sm text-muted-foreground break-words">
                    {r.title}
                  </p>
                  <p className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {r.relationship}
                  </p>
                </div>
                {r.avatar && (
                  <img
                    src={r.avatar}
                    alt=""
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover shrink-0 border border-border"
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {expanded
                ? "Show fewer recommendations"
                : `View all recommendations (${RECOMMENDATIONS.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
