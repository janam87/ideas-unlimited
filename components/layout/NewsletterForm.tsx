"use client";

export function NewsletterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex">
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 bg-grey-800 border border-grey-700 text-cream text-sm px-3 py-2 placeholder:text-grey-600 outline-none focus:border-gold transition-colors"
      />
      <button
        type="submit"
        className="bg-gold text-background text-sm font-medium px-4 py-2 hover:bg-gold-light transition-colors"
      >
        Join
      </button>
    </form>
  );
}
