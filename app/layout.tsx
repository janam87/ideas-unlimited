import type { Metadata } from "next";
import Script from "next/script";
import { playfair, dmSans, jetbrainsMono } from "./fonts";
import { ClientShell } from "@/components/layout/ClientShell";
import { Footer } from "@/components/layout/Footer";
import { getAllProductions, getAllPeople } from "@/lib/data";
import { getNowPerformingProductions, getUpcomingShows } from "@/lib/shows";
import { organizationSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Ideas Unlimited Productions — 35 Years of Fearless Theatre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const productions = getAllProductions();
  const people = getAllPeople();
  const hasNowPerforming = getNowPerformingProductions(productions).length > 0;
  const upcomingShows = productions.flatMap((p) =>
    getUpcomingShows(p).map((show) => ({ production: p, show }))
  ).sort((a, b) => new Date(a.show.date).getTime() - new Date(b.show.date).getTime());

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CN8R6M0K0X"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CN8R6M0K0X');
          `}
        </Script>
        <ClientShell
          productions={productions}
          people={people}
          hasNowPerforming={hasNowPerforming}
          upcomingShows={upcomingShows}
        >
          <main className="relative z-10 min-h-screen">{children}</main>
        </ClientShell>
        <Footer />
      </body>
    </html>
  );
}
