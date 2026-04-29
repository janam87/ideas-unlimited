import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ideas Unlimited Productions for bookings, collaborations, press enquiries, and partnerships. Based in Mumbai, India.",
  openGraph: {
    title: "Contact Us — Ideas Unlimited Productions",
    description:
      "Get in touch with Ideas Unlimited Productions for bookings, collaborations, press enquiries, and partnerships.",
    images: ["/images/og-default.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Contact Info — 5/7 split */}
      <section className="pt-28 md:pt-32 border-b border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.9]">
                Get in<br className="hidden lg:block" /> Touch
              </h1>
              <p className="text-grey-400 text-lg mt-4">
                For bookings, collaborations, press enquiries, or just to say hello.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-0">
                <div className="flex items-baseline justify-between py-4 border-b border-grey-700">
                  <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">Email</span>
                  <a href={`mailto:${SITE.email}`} className="text-cream hover:text-purple transition-colors">
                    {SITE.email}
                  </a>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-grey-700">
                  <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">Phone</span>
                  <a href={`tel:${SITE.phone}`} className="text-cream hover:text-purple transition-colors">
                    {SITE.phone}
                  </a>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-grey-700">
                  <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">Location</span>
                  <span className="text-cream">Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-grey-700">
                  <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">Response</span>
                  <span className="text-cream">Within 24–48 hours</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-6 mt-8">
                {Object.entries(SITE.social).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider text-purple hover:text-purple-light transition-colors capitalize"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form — 5/7 split */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                Send a<br className="hidden lg:block" /> Message
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
