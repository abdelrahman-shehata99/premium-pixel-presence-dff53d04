export type Recommendation = {
  quote: string;
  name: string;
  title: string;
  /** e.g. "Worked with me on the same team", "Managed me directly" */
  relationship: string;
  linkedinUrl: string;
  /** Optional avatar URL */
  avatar?: string;
};

/**
 * LinkedIn does not expose a recommendations API and scraping their site
 * breaks their terms, so recommendations are stored here as a typed array
 * and rendered from this local file only. Paste your real recommendations
 * into this structure to replace the seeded ones.
 */
export const RECOMMENDATIONS: Recommendation[] = [
  {
    quote:
      "REPLACE ME — Paste the recommendation text exactly as it appears on your LinkedIn profile. Two or three sentences works best; the card grows to fit.",
    name: "REPLACE ME — Full name",
    title: "REPLACE ME — Role at Company",
    relationship: "Worked with me on the same team",
    linkedinUrl: "https://www.linkedin.com/in/REPLACE-ME",
  },
  {
    quote:
      "REPLACE ME — Another recommendation goes here. Keep the format consistent so the card grid stays tidy across breakpoints.",
    name: "REPLACE ME — Full name",
    title: "REPLACE ME — Role at Company",
    relationship: "Managed me directly",
    linkedinUrl: "https://www.linkedin.com/in/REPLACE-ME",
  },
];
