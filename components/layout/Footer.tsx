import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="border-t border-grey-700 bg-background">
      <Container>
        {/* Main footer grid — newspaper column style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-b border-grey-700">
          {/* About */}
          <div className="py-10 lg:border-r lg:border-grey-700 lg:pr-8">
            <h3 className="font-serif text-xl text-cream mb-4">Ideas Unlimited</h3>
            <p className="text-grey-400 text-sm leading-relaxed">
              {SITE.tagline}. Producing powerful drama across languages
              and cities since {SITE.foundedYear}.
            </p>
          </div>

          {/* Quick Links */}
          <div className="py-10 lg:border-r lg:border-grey-700 lg:px-8 border-t md:border-t-0 border-grey-700">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">Links</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-grey-400 hover:text-cream text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="py-10 lg:border-r lg:border-grey-700 lg:px-8 border-t lg:border-t-0 border-grey-700">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-grey-400">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-cream transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-cream transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li>Mumbai, India</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="py-10 lg:pl-8 border-t lg:border-t-0 border-grey-700">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">Stay Updated</p>
            <p className="text-grey-400 text-sm mb-4">Show announcements and news.</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-grey-600 text-xs">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(SITE.social).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-600 hover:text-cream transition-colors font-mono text-xs uppercase tracking-wider"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
