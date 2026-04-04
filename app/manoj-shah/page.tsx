import type { Metadata } from "next";
import Image from "next/image";
import { getPersonBySlug, getPressForPerson } from "@/lib/data";
import { personSchema } from "@/lib/schema";
import { PressCard } from "@/components/shared/PressCard";

export const metadata: Metadata = {
  title: "Manoj Shah — Founder & Artistic Director",
  description:
    "Born 1955, Mumbai. Dance teacher turned director. 96+ productions. Bhupen Khakhar's backdrops. Pratik Gandhi before Scam 1992. The story of the man behind Ideas Unlimited.",
  openGraph: {
    title: "Manoj Shah — Founder & Artistic Director",
    description:
      "Born 1955, Mumbai. Dance teacher turned director. 96+ productions. The story of the man behind Ideas Unlimited.",
    images: ["/images/people/manoj-shah.jpg"],
  },
};

export default function ManojShahPage() {
  const person = getPersonBySlug("manoj-shah");
  const pressItems = getPressForPerson("manoj-shah");
  return (
    <>
      {person && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(person)) }}
        />
      )}

      {/* Main layout — sticky photo left, all content right */}
      <div className="pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — Photo (sticky across all content) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 lg:max-w-[320px]">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src="/images/people/manoj-shah.jpg"
                    alt="Manoj Shah"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right — All content */}
            <div className="lg:col-span-7">
              {/* Name block */}
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.85]">
                Manoj
                <br />
                Shah
              </h1>
              <div className="mt-6 space-y-1">
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-purple">Director</p>
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-purple">Actor</p>
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-purple">Producer</p>
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-purple">Founder, Ideas Unlimited</p>
              </div>
              <p className="font-mono text-xs text-grey-400 mt-4">
                Born 5 February 1955 &middot; Mumbai &middot; 96+ productions &middot; 25+ years
              </p>

              {/* The Beginning */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">Before the Stage</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Manoj Sakarchand Shah was born in Mumbai and studied until the ninth grade at schools in Mumbai and Ahmedabad. He began working as a dance teacher. Then he watched a play directed by Mahendra Joshi, and something shifted. He started acting. He studied the work of Badal Sircar, Utpal Dutt, and Vijaya Mehta. He read Jean Tardieu, Samuel Beckett, August Strindberg, Peter Handke, Robert Patrik, Chekhov. He performed in street plays, experimental theatre, cafe productions. He worked as an actor and extra in films, crossing paths with Richard Attenborough, Ketan Mehta, Piyush Shah, and Navroze Contractor.
                </p>
                <p className="text-grey-200 text-lg leading-relaxed">
                  None of it was enough. He wanted to direct. On 15 November 1999, at Horniman Circle Gardens during the Prithvi Theatre Festival, he staged his first production: Master Phoolmani. He was forty-four years old.
                </p>
              </div>

              {/* Master Phoolmani */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">Master Phoolmani and the Bhangwadi Tradition</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Master Phoolmani was adapted from Satish Alekar&apos;s Begum Barve by Chandrakant Shah, localized with Gujarati sensibilities and set against the extinct &apos;Bhangwadi&apos; theatrical tradition — a 19th-century form of Mumbai Gujarati theatre where men performed all roles, including female characters. The play centres on Manilal, a performer who refers to himself by his stage name Phoolmani, losing relevance as the tradition fades around him.
                </p>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  What made the production revolutionary was its collaboration with painter Bhupen Khakhar, who created the backdrops. For the first time in Indian theatre, a major visual artist&apos;s work became not decoration but architecture — the painted backdrop determined the spatial boundaries within which the actors performed. The play featured 29 songs, integrated elements from the life of Jaishankar Bhojak, and ran for over a hundred performances across sixteen years — Shah&apos;s longest-running production, closing only in 2015.
                </p>
              </div>

              {/* The Biographical Plays */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">The Biographical Plays</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  What emerged after Master Phoolmani was a body of work unlike anything in Gujarati theatre. Shah became the foremost practitioner of the biographical solo play — one actor, minimal stagecraft, a life rendered in monologue. His subjects were poets, philosophers, spiritual leaders, political thinkers, doctors, warriors. His method was to find the human being inside the legend.
                </p>
                <div className="border-t border-grey-700 mt-8">
                  <LandmarkRow title="Mareez" year="2004" description="200+ performances. Based on the Gujarati poet, adapted by Vinit Shukla. Influenced by Van Gogh's Dear Theo and Bukowski's Barfly. Sets by painter Ghulam Mohammed Sheikh. Playing continuously at Prithvi Theatre since 2004." />
                  <LandmarkRow title="Apurva Avsar" year="2007" description="Co-written with Raju Dave. About Jain mystic Shrimad Rajchandra, spiritual guide to Mahatma Gandhi. From a remote Gujarat village to renunciation." />
                  <LandmarkRow title="Siddh Hem" year="2008" description="Based on Hemachandra, the Indian Jain scholar. Dharmendra Gohil in the lead." />
                  <LandmarkRow title="Jal Jal Mare Patang" year="2009" description="About 19th-century Gujarati philosopher-writer Manilal Dwivedi. Script by Mihir Bhuta." />
                  <LandmarkRow title="Hu Chandrakant Bakshi" year="2013" description="Written by Shishir Ramavat. Pratik Gandhi as Gujarati writer Chandrakant Bakshi (1932–2006). Helped solidify Gandhi's reputation as an actor." />
                  <LandmarkRow title="Karl Marx In Kalbadevi" year="2013" description="What if Karl Marx arrived in Kalbadevi, a chaotic Mumbai locality? Satchit Puranik as Marx. Later staged in Hinglish." />
                  <LandmarkRow title="Popcorn with Parsai" year="2014" description="Solo act about Hindi writer Harishankar Parsai. Co-written with Nilay Upadhyay. Premiered at NCPA." />
                  <LandmarkRow title="Mohan No Masalo" year="2015" description="Pratik Gandhi as young Mohandas Gandhi — before the Mahatma. Three languages in one day. Atul Dodiya's black-and-white backdrops. Limca Book of Records." />
                  <LandmarkRow title="Dr. Anandibai Joshi" year="2017" description="First woman to lead a Shah one-man play. Written by Geeta Manek. India's first female doctor. Selected for Theatre Olympics." />
                  <LandmarkRow title="Adbhut" year="2021" description="Gujarati adaptation of Every Brilliant Thing. RJ Devaki performing solo. Audience becomes the cast. Written by Satchit Puranik." />
                  <LandmarkRow title="Bombay Flower" year="2023" description="The untold story of Ruttie Petit and Muhammad Ali Jinnah. Bhamini Oza Gandhi as Ruttie. A tribute to Parsi theatre." />
                </div>
              </div>

              {/* The Visual Revolution */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">Painters on Stage</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Shah&apos;s most distinctive contribution to Indian theatre may be his collaborations with visual artists. Where other directors commission set designers, Shah commissions painters — and gives them the authority to shape the entire visual language of the production.
                </p>
                <div className="border-t border-grey-700 mt-8">
                  <LandmarkRow title="Bhupen Khakhar" year="1999" description="Master Phoolmani. The painter's backdrop became the architecture of the performance — actors moved within the painting." />
                  <LandmarkRow title="Ghulam Mohammed Sheikh" year="2004" description="Mareez. The acclaimed painter created the visual world for the poet's biography." />
                  <LandmarkRow title="Atul Dodiya" year="2015" description="Mohan No Masalo. Black-and-white images of a young Gandhi as the backdrop for Pratik Gandhi's monologue." />
                </div>
              </div>

              {/* The Pratik Gandhi Connection */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">Before Scam 1992</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Years before Pratik Gandhi became a household name through Scam 1992: The Harshad Mehta Story, he was a Gujarati theatre actor whom Manoj Shah took a liking to during a touring production. Shah cast him in Hu Chandrakant Bakshi (2013) and then in Mohan No Masalo (2015) — the trilingual one-man Gandhi play that entered the Limca Book of Records. Critics noted that these two collaborations &quot;helped to solidify Gandhi&apos;s reputation as an actor.&quot; The theatrical skills honed under Shah&apos;s direction — the stamina to hold a stage alone for ninety minutes, the ability to inhabit a historical figure without imitation — were precisely the skills that made Scam 1992 possible.
                </p>
              </div>

              {/* Film Career */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">On Screen</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Shah has worked across Indian cinema as an actor, appearing in Anand Gandhi&apos;s Ship of Theseus, Nawazuddin Siddiqui&apos;s Thackeray, and the Gujarati film Kasoombo. He served as cultural consultant on Abhishek Kapoor&apos;s Kai Po Che and Gyan Correa&apos;s Good Road. Earlier in his career, he worked with Richard Attenborough on Gandhi, Ketan Mehta on Mangal Pandey, Ashutosh Gowariker on What&apos;s Your Rashee?, and Pankaj Kapoor on Mausam.
                </p>
              </div>

              {/* The Numbers */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">By the Numbers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                  <Stat number="96+" label="Productions directed" />
                  <Stat number="157+" label="Freelance artists" />
                  <Stat number="25+" label="Years of directing" />
                </div>
              </div>

              {/* Festivals */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">Festivals and International Work</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Ideas Unlimited productions have been selected for and performed at the Prithvi Theatre Festival, NSD Festival, Nehru National Festival, Kalaghoda Festival, Mumbai Theatre Utsav, Sahitya Sangh Mahotsav, Sudarshan Pune Festival, and the Theatre Olympics (2018). The company has toured internationally to the USA, UK, Canada, Dubai, Singapore, and Muscat.
                </p>
              </div>

              {/* Philosophy */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">In His Own Words</h2>
                <blockquote className="border-l-2 border-purple pl-6 my-8 text-xl md:text-2xl font-serif italic text-cream/80">
                  I believe in impromptu. I explore and experiment all the time to look for a new avatar.
                </blockquote>
                <blockquote className="border-l-2 border-purple pl-6 my-8 text-xl md:text-2xl font-serif italic text-cream/80">
                  I don&apos;t believe in giving messages, it&apos;s not my job. There are enough people around whose job it is to instruct and inculcate values. I&apos;m just an entertainer.
                </blockquote>
                <blockquote className="border-l-2 border-purple pl-6 my-8 text-xl md:text-2xl font-serif italic text-cream/80">
                  Lage raho, lage raho.
                </blockquote>
                <p className="text-grey-400 text-sm">
                  — From interviews with Mumbai Theatre Guide, Time Out Mumbai, and Focus On
                </p>
              </div>

              {/* Press & Interviews */}
              {pressItems.length > 0 && (
                <div className="mt-16 pt-16 border-t border-grey-700">
                  <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                    Interviews &amp; Coverage
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pressItems.map((item) => (
                      <PressCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LandmarkRow({ title, year, description }: { title: string; year: string; description: string }) {
  return (
    <div className="py-4 border-b border-grey-700">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-grey-400 w-12 shrink-0">({year})</span>
        <span className="font-serif text-lg text-cream">{title}</span>
      </div>
      <p className="text-grey-400 text-sm mt-1 ml-16">{description}</p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-4xl md:text-5xl text-purple">{number}</p>
      <p className="font-mono text-xs uppercase tracking-wider text-grey-400 mt-1">{label}</p>
    </div>
  );
}
