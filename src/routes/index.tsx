import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Highlights } from "@/components/portfolio/Highlights";
import { About } from "@/components/portfolio/About";
import { HowIBuild } from "@/components/portfolio/HowIBuild";
import { Experience } from "@/components/portfolio/Experience";
import { Skills } from "@/components/portfolio/Skills";
import { Work } from "@/components/portfolio/Work";
import { EducationLanguages } from "@/components/portfolio/EducationLanguages";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdelrahman Shehata — Senior Flutter Engineer" },
      {
        name: "description",
        content:
          "Senior Flutter engineer building production mobile & AI-powered apps — including iStoria, serving 5M+ users. 6+ years of clean architecture, performance, and personalization.",
      },
      { property: "og:title", content: "Abdelrahman Shehata — Senior Flutter Engineer" },
      {
        property: "og:description",
        content:
          "Mobile & AI-Powered Apps. Production Flutter at scale — iStoria (5M+ users), clean architecture, and AI personalization.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Abdelrahman Shehata — Senior Flutter Engineer" },
      {
        name: "twitter:description",
        content: "Senior Flutter engineer — production mobile & AI-powered apps.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <HowIBuild />
        <Experience />
        <Skills />
        <Work />
        <EducationLanguages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
