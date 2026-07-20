import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

// lucide-react dropped brand glyphs, so the WhatsApp mark lives here.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.37 9.37 0 0 1-1.44-5.01c0-5.18 4.23-9.4 9.42-9.4a9.35 9.35 0 0 1 6.65 2.76 9.32 9.32 0 0 1 2.76 6.65c0 5.18-4.23 9.41-9.42 9.41zM20.4 3.63A11.75 11.75 0 0 0 12.04 .17C5.5.17.19 5.48.19 12.01c0 2.09.55 4.13 1.59 5.93L.09 24l6.2-1.63a11.83 11.83 0 0 0 5.75 1.47h.01c6.53 0 11.85-5.31 11.85-11.84 0-3.17-1.23-6.14-3.47-8.38z" />
    </svg>
  );
}

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "abdelrahman2490@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=abdelrahman2490@gmail.com",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+20 112 107 0429",
    href: "https://wa.me/201121070429",
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
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <span className="h-11 w-11 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block mt-0.5 font-medium truncate">{value}</span>
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
