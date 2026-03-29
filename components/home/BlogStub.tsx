import { Container } from "@/components/ui/Container";

export function BlogStub() {
  return (
    <section className="border-t border-grey-700">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-16 md:py-24">
          <div className="lg:col-span-4 lg:border-r lg:border-grey-700 lg:pr-8 mb-8 lg:mb-0">
            <hr className="editorial-rule-thick w-12 mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl text-cream">
              Stories &<br />Reflections
            </h2>
            <p className="text-grey-400 text-sm mt-4 leading-relaxed">
              Behind-the-scenes stories, directorial notes, and reflections on 35 years of theatre.
            </p>
          </div>
          <div className="lg:col-span-8 lg:pl-8 flex items-center">
            <div className="border border-grey-700 border-dashed p-10 w-full text-center">
              <p className="font-mono text-sm text-grey-400 uppercase tracking-widest">
                Coming Soon
              </p>
              <p className="mt-3 text-grey-600 text-sm">
                Our editorial section is in development.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
