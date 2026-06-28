import { RECOMMENDATIONS } from "@/data/recommendations";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";
import { Linkedin, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Recommendations() {
  return (
    <section id="recommendations" className="py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="05 — Recommendations"
          title="Kind words from colleagues"
          description="Testimonials and feedback from managers, leads, product designers, and peers."
        />

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {RECOMMENDATIONS.map((r, i) => {
            const initials = r.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);

            return (
              <StaggerItem key={i} className="flex">
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg transition-all duration-300 w-full">
                  {/* Subtle quote icon */}
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic relative z-10">
                      "{r.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        {r.avatar && (
                          <AvatarImage src={r.avatar} alt={`${r.name}'s recommendation avatar`} />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold font-mono-ui">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base tracking-tight truncate">
                          {r.name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {r.title}
                        </p>
                        <p className="text-[10px] text-primary/80 font-mono-ui mt-0.5 tracking-wider truncate">
                          {r.relationship}
                        </p>
                      </div>
                    </div>

                    <a
                      href={r.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-secondary transition-all"
                      aria-label={`${r.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
export default Recommendations;
