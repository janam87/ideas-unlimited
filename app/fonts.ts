import { Playfair_Display, DM_Sans, JetBrains_Mono, Tiro_Devanagari_Hindi, Cormorant_Garamond } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const tiroDevanagari = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-tiro-devanagari",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});
