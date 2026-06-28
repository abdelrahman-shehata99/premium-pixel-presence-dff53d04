import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Mail, Phone, Github, Linkedin, ArrowUpRight, Download } from "lucide-react";
import cv from "@/assets/cv.pdf.asset.json";

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "abdelrahman2490@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=abdelrahman2490@gmail.com",
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
    <section id="contact" className="py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <SectionHeader
          eyebrow="06 — Contact"
          title="Let's build something."
          description="Open to senior mobile engineering opportunities — let's talk."
        />

        <Reveal>
          <div className="mb-6 flex flex-wrap gap-3">
            <a
              href={cv.url}
              target="_blank"
              rel="noopener noreferrer"
              download="Abdelrahman_Shehata_CV.pdf"
              className="cta-sheen inline-flex items-center gap-2 min-h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=abdelrahman2490@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-11 px-5 rounded-lg border border-border font-medium text-sm hover:-translate-y-0.5 hover:border-primary hover:text-primary transition-all"
            >
              <Mail className="h-4 w-4" /> Send an email
            </a>
          </div>
        </Reveal>

        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {LINKS.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg transition-all min-h-[68px]"
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
