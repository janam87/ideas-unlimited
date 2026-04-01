"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="border-t border-grey-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — section title */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.95]">
              Stay<br />Connected
            </h2>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <p className="text-grey-400 mb-8 max-w-xl">
              Join our mailing list for show announcements, behind-the-scenes content,
              and early ticket access.
            </p>
            {submitted ? (
              <p className="text-purple font-medium">
                Thank you for subscribing! We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-grey-800 border border-grey-700 text-cream px-4 py-3 placeholder:text-grey-600 outline-none focus:border-purple transition-colors"
                />
                <button
                  type="submit"
                  className="bg-purple text-background font-medium uppercase tracking-wider text-sm px-6 py-3 hover:bg-purple-light transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
