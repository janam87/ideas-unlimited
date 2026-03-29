"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SITE, ENQUIRY_TYPES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20">
      <Container>
        <SectionHeading
          label="Get in Touch"
          title="Contact Us"
          description="For bookings, collaborations, press enquiries, or just to say hello."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-grey-900 border border-gold/30 p-12 text-center">
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
                      className="w-full bg-grey-900 border border-grey-700 text-cream px-4 py-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-grey-900 border border-grey-700 text-cream px-4 py-3 outline-none focus:border-gold transition-colors"
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
                      className="w-full bg-grey-900 border border-grey-700 text-cream px-4 py-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                      Enquiry Type *
                    </label>
                    <select
                      required
                      className="w-full bg-grey-900 border border-grey-700 text-cream px-4 py-3 outline-none focus:border-gold transition-colors"
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
                    className="w-full bg-grey-900 border border-grey-700 text-cream px-4 py-3 outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <Button type="submit" size="lg">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Company Info
              </h3>
              <ul className="space-y-4 text-grey-300">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-grey-400 mt-1 shrink-0" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-cream transition-colors">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-grey-400 mt-1 shrink-0" />
                  <a href={`tel:${SITE.phone}`} className="hover:text-cream transition-colors">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-grey-400 mt-1 shrink-0" />
                  <span>Mumbai, Maharashtra, India</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Social
              </h3>
              <ul className="space-y-3">
                {Object.entries(SITE.social).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-grey-300 hover:text-cream transition-colors capitalize"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-grey-900 border border-grey-800 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-gold" />
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                  Response Time
                </h3>
              </div>
              <p className="text-grey-400 text-sm">
                We typically respond within 24-48 hours during business days.
                For urgent ticket enquiries, please call directly.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
