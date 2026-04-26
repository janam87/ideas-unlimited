export const SITE = {
  name: "Ideas Unlimited Productions",
  shortName: "IU Productions",
  tagline: "35 Years of Fearless Theatre",
  description:
    "Ideas Unlimited Productions — one of India's leading theatre companies, producing powerful drama across languages and cities for over 35 years.",
  url: "https://ideasunlimited.productions",
  founder: "Manoj Shah",
  foundedYear: 1990,
  email: "info@ideasunlimited.productions",
  phone: "+91 91670 06006",
  social: {
    instagram: "https://instagram.com/ideasunlimitedproductions",
    facebook: "https://facebook.com/ideasunlimitedproductions",
    youtube: "https://youtube.com/@ideasunlimitedproductions",
  },
};

// Top-bar primary links (always visible on desktop).
export const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Productions", href: "/productions" },
] as const;

// Full-screen menu overlay — grouped. Home/About in top bar; Upcoming + Blog shown as visual cards.
export const NAV_GROUPS = [
  {
    title: "Theatre",
    links: [
      { label: "All Productions", href: "/productions" },
      { label: "Upcoming Shows", href: "/upcoming-shows" },
      { label: "Jain Performing Arts", href: "/jain-performing-arts" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "About Us", href: "/about" },
      { label: "About Founder", href: "/manoj-shah" },
      { label: "People", href: "/people" },
      { label: "Stories", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

// Backwards-compat: flat list (used by sitemap, footer, etc.)
export const NAV_LINKS: ReadonlyArray<{ label: string; href: string }> =
  NAV_GROUPS.flatMap((g) => [...g.links]);

export const LEGACY_NUMBERS = [
  { value: 113, suffix: "+", label: "Productions" },
  { value: 2300, suffix: "+", label: "Performances" },
  { value: 35, suffix: "+", label: "Cities Globally" },
] as const;

// YouTube video ID for hero background — change this single value to swap the video
export const HERO_VIDEO_ID = "bhrGLDQZAvU";

export const ENQUIRY_TYPES = [
  "General Enquiry",
  "Ticket Booking",
  "Collaboration / Partnership",
  "Press / Media",
  "Audition / Casting",
  "Workshop / Education",
  "Other",
] as const;
