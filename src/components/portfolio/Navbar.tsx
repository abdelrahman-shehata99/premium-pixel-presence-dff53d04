import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { applyTheme, getInitialTheme } from "@/lib/theme";
import { scrollToId } from "@/lib/smooth-scroll";
import cv from "@/assets/cv.pdf.asset.json";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "h-14 backdrop-blur-xl bg-background/70 border-b border-border"
          : "h-16 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1140px] h-full px-5 sm:px-8 flex items-center justify-between gap-3">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          className="font-display font-bold text-lg tracking-tight shrink-0"
          aria-label="Home"
        >
          Abdelrahman<span className="text-primary">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(link.id);
              }}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                active === link.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="block h-px bg-primary mt-0.5"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-11 w-11 sm:h-9 sm:w-9 grid place-items-center rounded-md border border-border hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={cv.url}
            target="_blank"
            rel="noopener noreferrer"
            download="Abdelrahman_Shehata_CV.pdf"
            className="hidden sm:inline-flex items-center h-9 px-4 text-sm font-medium rounded-md border border-border hover:border-primary hover:text-primary transition-colors"
          >
            Resume
          </a>
          <button
            className="md:hidden h-11 w-11 grid place-items-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-xl border-b border-border max-h-[calc(100svh-3.5rem)] overflow-y-auto"
          >
            <nav className="px-5 py-4 flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    // Defer so the menu close paints first, then scroll.
                    requestAnimationFrame(() => scrollToId(link.id));
                  }}
                  className={`min-h-11 flex items-center px-3 py-3 rounded-md text-base ${
                    active === link.id
                      ? "text-primary bg-secondary"
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={cv.url}
                target="_blank"
                rel="noopener noreferrer"
                download="Abdelrahman_Shehata_CV.pdf"
                onClick={() => setOpen(false)}
                className="mt-2 min-h-11 flex items-center justify-center px-3 py-3 rounded-md text-base border border-border"
              >
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
