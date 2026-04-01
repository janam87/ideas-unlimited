export const SITE = {
  name: "Ideas Unlimited Productions",
  shortName: "IU Productions",
  tagline: "35 Years of Fearless Theatre",
  description:
    "Ideas Unlimited Productions — one of India's leading theatre companies, producing powerful drama across languages and cities for over 35 years.",
  url: "https://ideasunlimited.in",
  founder: "Manoj Shah",
  foundedYear: 1990,
  email: "info@ideasunlimited.in",
  phone: "+91 98200 00000",
  social: {
    instagram: "https://instagram.com/ideasunlimitedproductions",
    facebook: "https://facebook.com/ideasunlimitedproductions",
    youtube: "https://youtube.com/@ideasunlimitedproductions",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Productions", href: "/productions" },
  { label: "People", href: "/people" },
  { label: "Blog", href: "/blog" },
  { label: "Manoj Shah", href: "/manoj-shah" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGACY_NUMBERS = [
  { value: 35, suffix: "+", label: "Years" },
  { value: 90, suffix: "+", label: "Productions" },
  { value: 3, suffix: "", label: "Languages" },
  { value: 20, suffix: "+", label: "Cities" },
] as const;

// YouTube video ID for hero background — change this single value to swap the video
export const HERO_VIDEO_ID = "PLQsJFMpENg";

export const ENQUIRY_TYPES = [
  "General Enquiry",
  "Ticket Booking",
  "Collaboration / Partnership",
  "Press / Media",
  "Audition / Casting",
  "Workshop / Education",
  "Other",
] as const;
