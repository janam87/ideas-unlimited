"use client";

import { useState } from "react";
import { ENQUIRY_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-grey-900 border border-purple/30 p-12 text-center">
        <p className="font-serif text-2xl text-cream mb-4">
          Thank you for reaching out
        </p>
        <p className="text-grey-400">
          We&apos;ve received your message and will get back to you within 48 hours.
        </p>
      </div>
    );
  }

  return (
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
  );
}
