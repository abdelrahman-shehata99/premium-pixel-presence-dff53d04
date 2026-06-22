import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 Abdelrahman Shehata
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/abdelrahman-shehata99"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/abdelrahman-shehata-9a20b41b1"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:abdelrahman2490@gmail.com"
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 inline-flex items-center gap-1.5 text-xs font-mono-ui text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Top
          </a>
        </div>
      </div>
    </footer>
  );
}
