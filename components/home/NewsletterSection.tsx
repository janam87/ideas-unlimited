"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 bg-grey-900">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <Mail size={32} className="text-gold mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
            Never Miss a Show
          </h2>
          <p className="text-grey-400 mb-8">
            Join our mailing list for show announcements, behind-the-scenes content,
            and early ticket access.
          </p>
          {submitted ? (
            <p className="text-gold font-medium">
              Thank you for subscribing! We&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-grey-800 border border-grey-700 text-cream px-4 py-3 placeholder:text-grey-600 outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold text-background font-medium uppercase tracking-wider text-sm px-6 py-3 hover:bg-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
