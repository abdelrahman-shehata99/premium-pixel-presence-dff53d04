import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AuraCursor } from "./AuraCursor";
import { scrollToId } from "@/lib/smooth-scroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.1 } },
  };

  return (
    <section
      id="top"
      className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden"
    >
      {/* Cursor-following aura — lives behind the headline, above the bg */}
      <AuraCursor />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center top, black 30%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-[1140px] px-5 sm:px-8"
        variants={container}
        initial={reduced ? "show" : "hidden"}
        animate="show"
      >
        <motion.p
          variants={item}
          className="font-mono-ui text-xs sm:text-sm uppercase tracking-[0.18em] text-primary"
        >
          Senior Flutter Engineer
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.02]"
        >
          Abdelrahman
          <br />
          Shehata
        </motion.h1>

        <motion.h2
          variants={item}
          className="mt-6 text-2xl sm:text-3xl font-medium text-muted-foreground"
        >
          Mobile &amp; AI-Powered Apps
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
        >
          I build and scale production Flutter apps — including iStoria, serving 5M+
          users — with a focus on performance, clean architecture, and AI-powered
          personalization.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            className="cta-sheen cta-breath inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get in touch <ArrowRight className="cta-arrow h-4 w-4" />
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("experience");
            }}
            className="inline-flex items-center h-11 px-5 rounded-lg border border-border font-medium text-sm hover:-translate-y-0.5 hover:border-primary hover:text-primary transition-all"
          >
            View experience
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-5">
          <a
            href="https://github.com/abdelrahman-shehata99"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/abdelrahman-shehata-9a20b41b1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=abdelrahman2490@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
          <span
            className="ml-2 inline-flex items-center gap-1.5 text-xs font-mono-ui text-muted-foreground border border-border rounded-full px-3 py-1"
          >
            <MapPin className="h-3 w-3" /> Cairo, Egypt
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
