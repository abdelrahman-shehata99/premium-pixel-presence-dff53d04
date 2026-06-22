import { CountUp } from "./CountUp";
import { Stagger, StaggerItem } from "./Reveal";

const STATS = [
  { value: 6, suffix: "+", label: "Years building Flutter apps" },
  { value: 5, suffix: "M+", label: "Users served (iStoria)" },
  { value: 30, suffix: "%", label: "Fewer user-reported issues" },
  { value: 0, label: "Oracle Certified Java Programmer", literal: "OCP" },
];

export function Highlights() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s, i) => (
            <StaggerItem
              key={i}
              className="group rounded-2xl border border-border bg-card p-6 sm:p-7 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-primary">
                {s.literal ? s.literal : <CountUp end={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
