import type { Metadata } from "next";
import Script from "next/script";
import { playfair, dmSans, jetbrainsMono, tiroDevanagari, cormorant } from "./fonts";
import { ClientShell } from "@/components/layout/ClientShell";
import { Footer } from "@/components/layout/Footer";
import { getAllProductions, getAllPeople } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
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

  // Menu featured: prefer next upcoming show; else latest featured production; else newest production.
  const fallbackProduction =
    productions.find((p) => p.featured) ??
    productions.slice().sort((a, b) => b.year - a.year)[0];
  const navFeatured = upcomingShows[0]
    ? { production: upcomingShows[0].production, show: upcomingShows[0].show }
    : fallbackProduction
      ? { production: fallbackProduction }
      : undefined;

  const featuredPost = getAllPosts().slice().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${tiroDevanagari.variable} ${cormorant.variable}`}
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
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '512430042433775');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=512430042433775&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <ClientShell
          productions={productions}
          people={people}
          hasNowPerforming={hasNowPerforming}
          upcomingShows={upcomingShows}
          navFeatured={navFeatured}
          featuredPost={featuredPost}
        >
          <main className="relative z-10 min-h-screen">{children}</main>
        </ClientShell>
        <Footer />
      </body>
    </html>
  );
}
