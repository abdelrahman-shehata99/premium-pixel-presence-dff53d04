export type Recommendation = {
  quote: string;
  name: string;
  title: string;
  /** e.g. "Worked with me on the same team", "Managed me directly" */
  relationship: string;
  linkedinUrl: string;
  /**
   * Optional avatar URL. NOTE: do not paste LinkedIn `media.licdn.com` URLs —
   * they carry a short-lived token and will 404 within weeks. Instead, save
   * each photo into `public/recommendations/<name>.jpg` and set the path here,
   * e.g. avatar: "/recommendations/abdullah-aljaberi.jpg".
   */
  avatar?: string;
};

/**
 * LinkedIn does not expose a recommendations API and scraping their site
 * breaks their terms, so recommendations are stored here as a typed array
 * and rendered from this local file only.
 */
export const RECOMMENDATIONS: Recommendation[] = [
  {
    quote:
      "Abdelrahman stands out as a mobile engineer who consistently exceeds expectations. He combines deep technical expertise with a strong sense of ownership, consistently delivering high-quality solutions that create measurable business impact. At iStoria, he played an important role in building and scaling mobile experiences for millions of users, contributing across architecture, performance optimization, AI-powered features, and product delivery. What distinguishes him is his ability to think beyond implementation and approach challenges with a product and business mindset. He is reliable, proactive, highly collaborative, and someone I could trust with critical initiatives. Abdelrahman consistently raises the bar for quality and execution, and his contributions have had a lasting impact on both our product and engineering culture. I highly recommend him to any organization seeking a senior engineer who can drive results, take ownership, and deliver excellence at scale.",
    name: "Abdullah AlJaberi",
    title: "CEO & Founder at iStoria",
    relationship: "Managed me directly",
    linkedinUrl: "https://www.linkedin.com/in/3jaberi/",
    avatar:
      "https://media.licdn.com/dms/image/v2/C4D03AQGrJxEIFyiSbg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1517529848883?e=1784160000&v=beta&t=WrNj-atmlQ5XsftWsHcRllwncunotETkFXPuR-eUXgI",
  },
  {
    quote:
      "Abdelrahman is a talented Flutter developer and a teammate you can count on. Over the past year at iStoria he's grown into a versatile engineer — delivering features, hardening the app with careful UI and localization work, and tackling tough cross-platform challenges in native Swift and Kotlin. He owns his work, collaborates well, and always raises the bar. Highly recommended.",
    name: "Abdelrahman Saed",
    title: "Lead Mobile Engineer (Flutter) at iStoria",
    relationship: "Managed me directly",
    linkedinUrl:
      "https://media.licdn.com/dms/image/v2/D4D35AQFdTS7WC0qe8g/profile-framedphoto-shrink_100_100/B4DZ5SpJ6yHMAc-/0/1779502981250?e=1783231200&v=beta&t=XO1yWDc1EiyneE-yDchyI_Ogd8axT3fdvjAkPS_MJQw",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D35AQFdTS7WC0qe8g/profile-framedphoto-shrink_100_100/B4DZ5SpJ6yHMAc-/0/1779502981250?e=1783238400&v=beta&t=uSbPIK57tb9HEJ_EKOmHKdzbHgqe57ICM-0_iApTqu4",
  },
  {
    quote:
      "Abdelrahman is the type of engineer every high-performing team hopes to have. He brings a rare blend of deep technical expertise, strategic thinking, and unwavering commitment to excellence. His ability to architect scalable mobile solutions, optimize performance, and translate business objectives into exceptional user experiences consistently sets him apart. Beyond his technical strengths, he is a natural leader who inspires confidence, mentors others, and raises the engineering standards of the entire team. His impact extends well beyond the codebase, making him an invaluable contributor to both product success and organizational growth.",
    name: "Maher Al-Ghannam",
    title: "Senior Software QA Engineer · ISTQB-CTFL",
    relationship: "Reported to me directly",
    linkedinUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQFFV5-dMsdMNA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1675283402176?e=1784160000&v=beta&t=UjW4pYZm9JbXlVTy3_kuUSfsn59XcNJoHHVstrYYJ_8",
  avatar:"https://media.licdn.com/dms/image/v2/D4D03AQFFV5-dMsdMNA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1675283402176?e=1784160000&v=beta&t=UjW4pYZm9JbXlVTy3_kuUSfsn59XcNJoHHVstrYYJ_8"
    },
  {
    quote:
      "I had the pleasure of working closely with Abdelrahman on the iStoria app. As a product designer, I always appreciated his ability to bring complex designs to life exactly as intended, without compromising on functionality or UX. He's collaborative, highly skilled, and a fantastic asset to any product team.",
    name: "Mohammed Hattab",
    title: "Product Designer at iStoria",
    relationship: "Reported to me directly",
    linkedinUrl: "https://www.linkedin.com/in/mohammed-hattab-product-designer/",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQFsQZzxBB9_vQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718634971918?e=1784160000&v=beta&t=fe9RXfx25GZGSzAAo36LEShV3EMSuIBx1v7nsiQLpcI",
  },
  {
    quote:
      "I had the pleasure of working with Abdelrahman on the iStoria Reader feature. Throughout our collaboration, he proved to be a reliable and skilled Flutter developer who consistently delivered high-quality work. He was always supportive, easy to work with, and proactive in solving challenges. His flexibility, strong technical skills, and team-oriented mindset made a real impact on the success of the feature.",
    name: "Saber Son",
    title: "Flutter Developer · YouTuber",
    relationship: "Reported to me directly",
    linkedinUrl:
      "https://media.licdn.com/dms/image/v2/D4D35AQGTfHGUUitIPw/profile-framedphoto-shrink_100_100/B4DZwAoI50JoAo-/0/1769537048466?e=1783231200&v=beta&t=iFuDQdskymmbfrV-HWKRQURC0fFmWFQWOARMMWBD658",
  avatar:"https://media.licdn.com/dms/image/v2/D4D35AQGTfHGUUitIPw/profile-framedphoto-shrink_100_100/B4DZwAoI50JoAo-/0/1769537048466?e=1783238400&v=beta&t=_Cyet-3jRMGzQ988NTncuAP1wqrkV6wL1HKFUCr3ko4"
    },
  {
    quote:
      "Abdelrahman is one of the sharpest Flutter developers I've worked with. He has a great knack for building high-performance cross-platform apps with clean, maintainable code. He's highly dependable, a great team player, and always delivers top-notch quality. Any tech team would be lucky to have him.",
    name: "Rawan N. J. Mushtaha",
    title: "Quality Assurance (QA)",
    relationship: "Worked with me on the same team",
    linkedinUrl: "https://www.linkedin.com/in/rawan-n-j-mushtaha-97325035a/",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D35AQHaTgtpVCtvcA/profile-framedphoto-shrink_100_100/B4DZwDqY8LHEAk-/0/1769587970106?e=1783231200&v=beta&t=fuTXSP42_KLYmqFkffIGyrFOwXRn17WAsvMQ7eizGKE",
  },
];
