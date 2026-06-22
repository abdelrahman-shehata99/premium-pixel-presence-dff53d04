import { Reveal } from "./Reveal";
import { GraduationCap, Award, Languages as LangIcon } from "lucide-react";

export function EducationLanguages() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 grid gap-6 lg:grid-cols-3">
        <Reveal className="rounded-2xl border border-border bg-card p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </span>
            <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Education
            </p>
          </div>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">
            Bachelor of Engineering — Computer Science
          </h3>
          <p className="text-muted-foreground mt-1">El Shorouk Academy</p>
          <p className="font-mono-ui text-xs text-muted-foreground mt-2">2018 – 2022</p>
        </Reveal>

        <Reveal delay={0.05} className="rounded-2xl border border-border bg-card p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </span>
            <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Certification
            </p>
          </div>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">
            Oracle Certified Professional, Java Programmer
          </h3>
          <p className="text-muted-foreground mt-1">Oracle</p>
          <p className="font-mono-ui text-xs text-muted-foreground mt-2">Issued 2020</p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
              <LangIcon className="h-5 w-5" />
            </span>
            <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Languages
            </p>
          </div>
          <ul className="mt-5 space-y-3">
            <li className="flex items-baseline justify-between">
              <span className="font-medium">Arabic</span>
              <span className="font-mono-ui text-xs text-muted-foreground">Native</span>
            </li>
            <li className="flex items-baseline justify-between">
              <span className="font-medium">English</span>
              <span className="font-mono-ui text-xs text-muted-foreground">Professional Working</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
