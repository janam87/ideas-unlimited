import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl md:text-3xl text-cream mt-16 mb-6 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl md:text-2xl text-cream mt-12 mb-4">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-grey-300 text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-purple pl-6 my-10 text-xl md:text-2xl font-serif italic text-cream/80">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="text-cream font-semibold">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="space-y-3 mb-8 ml-4">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="text-grey-300 text-lg leading-relaxed pl-2 border-l border-grey-700">
        {children}
      </li>
    ),
    hr: () => (
      <hr className="border-grey-800 my-16" />
    ),
    ...components,
  };
}
