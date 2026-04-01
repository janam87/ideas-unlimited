"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE, ENQUIRY_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              {submitted ? (
                <div className="bg-grey-900 border border-purple/30 p-12 text-center">
                  <p className="font-serif text-2xl text-cream mb-4">
                    Thank you for reaching out
                  </p>
                  <p className="text-grey-400">
                    We&apos;ve received your message and will get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-grey-900 border border-grey-700 text-cream pl-4 pr-10 py-3 outline-none focus:border-purple transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-grey-900 border border-grey-700 text-cream pl-4 pr-10 py-3 outline-none focus:border-purple transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full bg-grey-900 border border-grey-700 text-cream pl-4 pr-10 py-3 outline-none focus:border-purple transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                        Enquiry Type *
                      </label>
                      <select
                        required
                        className="w-full bg-grey-900 border border-grey-700 text-cream pl-4 pr-10 py-3 outline-none focus:border-purple transition-colors"
                      >
                        <option value="">Select...</option>
                        {ENQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="w-full bg-grey-900 border border-grey-700 text-cream pl-4 pr-10 py-3 outline-none focus:border-purple transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
