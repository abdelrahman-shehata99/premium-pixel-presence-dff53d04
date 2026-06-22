import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "abdelrahman2490@gmail.com",
    href: "mailto:abdelrahman2490@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+20 112 107 0429",
    href: "tel:+201121070429",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "abdelrahman-shehata99",
    href: "https://github.com/abdelrahman-shehata99",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "abdelrahman-shehata",
    href: "https://www.linkedin.com/in/abdelrahman-shehata-9a20b41b1",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="05 — Contact"
          title="Let's build something."
          description="Open to senior mobile engineering opportunities — let's talk."
        />

        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {LINKS.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <span className="h-11 w-11 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block mt-0.5 font-medium truncate">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
