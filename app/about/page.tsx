import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VideoEmbed } from "@/components/shared/VideoEmbed";

export const metadata: Metadata = {
  title: "About Us — Ideas Unlimited Productions",
  description:
    "Since 1999, Ideas Unlimited Productions has been pushing the boundaries of Indian theatre across Hindi, Gujarati, and English — 113+ productions and counting.",
};

const PRODUCTIONS: { name: string; year: number; details: string }[] = [
  { name: "Master Phoolmani", year: 1999, details: "1st performed in Prithvi Festival 1999. Longest running production till 2015." },
  { name: "Akho Akha Bolo", year: 2000, details: "Writer Kanti Patel. A play based on Akho — a saint, philosopher and poet." },
  { name: "Savita", year: 2000, details: "Monologue by Bhupen Khakhar. For MG Production." },
  { name: "System", year: 2000, details: "Monologue by Uttam Gada. For MG Production." },
  { name: "Maganlal No Gundar", year: 2000, details: "Story by Bhupen Khakhar. Dramatised reading for Mohile Parikh Centre, NCPA." },
  { name: "Foreign Soap", year: 2000, details: "Story by Bhupen Khakhar. Dramatised reading by Rupa Divetiya & others." },
  { name: "Briel", year: 2000, details: "Monologue by C.C. Mehta. For Forbes Gujarati Sabha." },
  { name: "Medea", year: 2000, details: "Monologue by C.C. Mehta. For Forbes Gujarati Sabha." },
  { name: "Mukund Rai", year: 2000, details: "Story by R.V. Phatak. Dramatised by Raju Dave." },
  { name: "Jakshni", year: 2000, details: "Story by R.V. Phatak. Dramatised by Raju Dave." },
  { name: "Idli Orchid Ne Hu", year: 2001, details: "Story by Vitthal Kamat. Dramatised reading." },
  { name: "Parpota Na Desh Ma", year: 2001, details: "Poems by Panna Niak. Dramatised by Raju Dave, Ankit Trivedi." },
  { name: "Varta Kaho Ne — Thigadu", year: 2001, details: "Story by Suresh Joshi. Dramatised by Bharat Naik." },
  { name: "Parshchad Bhumika", year: 2001, details: "Story by Fanishwarnath Renu. Dramatised reading for National Book Trust, Delhi." },
  { name: "Trasyo Sangam", year: 2001, details: "Monologue by Raju Dave. Based on Harkishan Mehta\u2019s novel." },
  { name: "Jagga Dakku", year: 2001, details: "Monologue by Raju Dave. Based on Harkishan Mehta\u2019s novel." },
  { name: "Bhedbharam", year: 2001, details: "Monologue by Shishir Ramawat. Based on Harkishan Mehta\u2019s novel." },
  { name: "Sansari Sadhu", year: 2002, details: "Monologue by Shrikant Gautam. Based on Harkishan Mehta\u2019s novel." },
  { name: "Jad Chetan", year: 2002, details: "Monologue by Shishir Ramawat. Based on Harkishan Mehta\u2019s novel." },
  { name: "Orange Juice", year: 2002, details: "Play by Uttam Gada. In Hindi." },
  { name: "Mano Mel Te Maitri", year: 2002, details: "Play by Aleksi Arubzov. Adapted by Raju Dave." },
  { name: "Giras Ma Ek Dungri", year: 2002, details: "Story by Meria Shresh Mitsakaben. Dramatised reading." },
  { name: "Raman Bhaman", year: 2003, details: "Play by Ashvini Bhatt. Dramatised reading for Coffee Mates." },
  { name: "Gujarat Ni Asmita", year: 2003, details: "Inauguration of a book by Shri Narendra Modi. For Mahuva Education Trust." },
  { name: "Te He Na Devaso", year: 2003, details: "Story by Hari Vallabh Bhayani. Dramatised by Raju Dave." },
  { name: "Swajan Utsav", year: 2003, details: "A collage of poetry in dramatised presentation. Multiple poets." },
  { name: "Agantuk", year: 2003, details: "Story by Dhiruben Patel. Dramatised by Vipul Bhargav." },
  { name: "Vanechand No Varghodo", year: 2003, details: "Play by Prakash Kapadia. Based on work of Shabuddin Rathod." },
  { name: "Monji Ruder", year: 2003, details: "Work of Swami Anand. Play by Vinit Shukla." },
  { name: "Runa Nu Bandh", year: 2003, details: "Story by Pravin Sinh Chawda. Dramatised by Raju Dave." },
  { name: "Tribute to Bhupen Khakhar", year: 2004, details: "Plays by Bhupen Khakhar. For Tao Art Gallery." },
  { name: "Mareez", year: 2004, details: "Dramatised by Vinit Shukla. Based on work and life of poet Mareez. Prithvi Festival 2004." },
  { name: "Kshemraj Ne Sadhvi", year: 2004, details: "By G.M. Tripathi. Celebrating 150 years of G.M. Tripathi at Nadiad." },
  { name: "Chalte Chalte", year: 2004, details: "Festival of Theatre for Change. At Kitab Mahal Mumbai & JSW Foundation." },
  { name: "Gujarat No Nath", year: 2004, details: "By Kanhaiyalal Munshi. Dramatised by Suren Thaker Mehul. For Coffee Mates." },
  { name: "Meera", year: 2004, details: "Based on poetries of Ramesh Parekh. Dramatised by Mihir Bhutta." },
  { name: "Blue Jeans", year: 2004, details: "A dramatised poem by Chandrakant Shah." },
  { name: "Bharelo Agani", year: 2004, details: "Story by R.V. Desai. Dramatised by Manoj Shah." },
  { name: "Mestro Masters Swami", year: 2005, details: "Prithvi Theatre Mania, Prithvi Festival 2005. Collection of plays by Tardieu, Beckett, Handke, Chekhov and others." },
  { name: "Boom Rang", year: 2005, details: "Story by Nilesh Rana. Dramatised by Raju Dave." },
  { name: "Nami Gaya Te Gami Gaya", year: 2005, details: "By Pankaj Trivedi." },
  { name: "Gamta No Kariea Gulal", year: 2005, details: "For Gujarati Sahitya Parishad, Mumbai. Works by Narshin Mehta, Meera, Akho, Narmad and others." },
  { name: "Janoi Vadh Ghha", year: 2005, details: "Based on poetry of Ramesh Parekh. Dramatised by Raju Dave, Satya Mehta." },
  { name: "Varsad Bhinj Ve", year: 2006, details: "Based on poetry of Ramesh Parekh. Dramatised by Raju Dave, Satya Mehta, Ankit Trivedi, Manoj Shah." },
  { name: "Lata Shu Bole", year: 2006, details: "Story reading of Gulabdas Broker. For Kelavni Mandal." },
  { name: "Rajputani", year: 2006, details: "Story by Dhumketu. Dramatisation by Prakash Kapadia." },
  { name: "Jher To Pidha Jaani Jaani", year: 2006, details: "Story by Drashak. Dramatised by Upendra Trivedi." },
  { name: "Socrates", year: 2006, details: "Story by Darshak. Dramatised by Kanti Patel." },
  { name: "Ame Baraf Na Pankhi", year: 2006, details: "For Shemaroo Video." },
  { name: "Lajo", year: 2007, details: "By Ismat Chugtaie. Dramatised & directed by Paresh Vyas." },
  { name: "Apurva Avsar", year: 2007, details: "Biopic on Shrimad Rajchandra. Dramatised by Raju Dave & Manoj Shah." },
  { name: "Little Bit Gamvanu", year: 2007, details: "Written by Chandrakant Shah." },
  { name: "Jite Hai Shaan Se", year: 2008, details: "Written by Shishir Ramawat. Play on cruelty towards animals. For JIDCO." },
  { name: "Achlayatan", year: 2008, details: "Written by Rabindranath Tagore. Adapted by Acharya Kriplani, Mahadevbhai Desai. For Tagore Festival." },
  { name: "Atma Gynani", year: 2008, details: "Dramatised by Raju Dave. Biopic of Dada Bhagwan. For Dada Bhagwan Foundation." },
  { name: "Siddha Hem", year: 2008, details: "Writer Jonhy Shah. For JAINA USA, 2008." },
  { name: "Jal Jal Mare Patang", year: 2009, details: "Written by Mihir Bhuta. Based on work of Manilal Nabhubhai Dwivedi. For Prithvi Festival." },
  { name: "Amarfal", year: 2010, details: "Written by Bharat Naik. Based on the eternal story of Raja Bharathari." },
  { name: "Hello Gujarati", year: 2010, details: "Written by Raju Dave and Satya Mehta." },
  { name: "Mahajan Darshan", year: 2010, details: "Written by Raghuveer Chaudhry, Jayesh Mehta. Story on Mahajans of Mahuva. For Pidilite Parivar." },
  { name: "Firewall", year: 2010, details: "A short play by Uttam Gada. For Prithvi Carnival." },
  { name: "Red Sea", year: 2010, details: "A short play by Uttam Gada. For Prithvi Carnival." },
  { name: "Mummy Tu Aavi Kevi", year: 2010, details: "Written by Dhiruben Patel. For Summer Festival for children at Prithvi." },
  { name: "Kasper", year: 2011, details: "A monologue written by Chandrakant Shah." },
  { name: "New York New York", year: 2011, details: "A monologue written by Chandrakant Shah." },
  { name: "Apurav Khela", year: 2011, details: "Written by Dr. Dhanvant Shah. For Mumbai Jain Yuvak Sangh & Pavapuri Ashram, Rajasthan." },
  { name: "Karl Marx In Kalbadevi", year: 2012, details: "Written by Uttam Gada. For Vasant Utsav, NCPA." },
  { name: "Hu Chandrakant Baxi", year: 2012, details: "Written by Shishir Ramavat." },
  { name: "Bhamashah", year: 2013, details: "Story by Bipin Doshi. Written by Mihir Bhuta. Based on Rana Pratap and Bhamashah. In Hindi." },
  { name: "Master Madam", year: 2013, details: "Written by Bodhayana. Adapted by Will Johnson, Dr. Vijay Pandya, Abhishek Khelkar, Satya Mehta. For Prithvi Festival." },
  { name: "Lakshmi Poojan", year: 2013, details: "Written by Uttam Gada. For Center Stage, NCPA." },
  { name: "Pappa, No Problem", year: 2014, details: "Written by Hemant Kariya. For Prithvi Children Festival." },
  { name: "Bhavprapanch", year: 2014, details: "Written by Siddharshi Gani. For Diksha Mahotsav, Surat." },
  { name: "Popcorn with Parsai", year: 2014, details: "Written by Nilay Upadhyay. Based on work of Harishankar Parsai. For Vasant Utsav, NCPA." },
  { name: "BKP Ni Duniya Rang Rangili", year: 2014, details: "Written by Prayag Dave and Raju Dave. For Pidilite Parivar at Mahuva." },
  { name: "Mohan No Masalo", year: 2015, details: "Written by Ishan Doshi & Satya Mehta. On young Mohandas K. Gandhi. For Vasant Utsav, NCPA." },
  { name: "Pai Pai", year: 2015, details: "Written by Dhiruben Patel. For NCPA Summer Fest & Children Fest at Prithvi." },
  { name: "Karl Marx in Kalbadevi (Hinglish)", year: 2015, details: "Written by Uttam Gada. For Wilson College, celebrating 150 years of Das Kapital." },
  { name: "Whats Up?", year: 2015, details: "Written by Uttam Gada. For Center Stage, NCPA." },
  { name: "Mohan\u2019s Masala (English)", year: 2016, details: "Written by Ishan Doshi & Satya Mehta. On young Mohandas K. Gandhi. For Dubai Community Theatre & Arts Centre." },
  { name: "Gathariya", year: 2016, details: "Written by Shanti Patel. Dramatised by Satya Mehta. For Vasant Utsav, NCPA." },
  { name: "Mohan Ka Masala", year: 2016, details: "Written by Ishan Doshi & Satya Mehta. For Kamla Saklecha School, Madhya Pradesh." },
  { name: "Kamra Bhabhi No Barabpo", year: 2016, details: "Written by Adhir Amdavadi. For Image Publication." },
  { name: "Margdarshan", year: 2016, details: "Written by Sitanshu Yashaschandra. For Image Publication." },
  { name: "Vrudhshatak", year: 2016, details: "Poems by Kamal Vora. For Image Publication." },
  { name: "Khichadi", year: 2016, details: "A tribute to Labhshankar Thaker. Written by Labhshankar Thaker." },
  { name: "Sikkani Triji Baju", year: 2016, details: "Written by Naushil Mehta. For Prithvi Festival." },
  { name: "Dr. Anandibai (Gujarati)", year: 2017, details: "Written by Gita Manek. India\u2019s first lady doctor." },
  { name: "Rang Gurjari", year: 2018, details: "Written by Satya Mehta. History of Gujarati theatre from Bhangwadi to Aadhunik Rangbhoomi." },
  { name: "Dr. Anandibai (Hindi)", year: 2018, details: "Written by Gita Manek. For Bhavan\u2019s College." },
  { name: "Dr. Anandibai (Marathi)", year: 2018, details: "Written by Gita Manek. For Damu Kenkre Festival." },
  { name: "Kaagdo", year: 2019, details: "Written by Gita Manek. For Prithvi Festival." },
  { name: "Adbhut", year: 2021, details: "Written by Satchit Puranik. Play on mental wellbeing." },
  { name: "Mr. Apple", year: 2022, details: "Written by Shishir Ramavat. Play on Steve Jobs." },
  { name: "Bombay Flower", year: 2023, details: "Play by Geeta Manek. Play on Mr. and Mrs. Jinnah." },
  { name: "Lagan Ma Magan", year: 2023, details: "Play by Bakul Tailor. Play on dialect and languages of Gujarat." },
  { name: "Third Bell", year: 2024, details: "Play by Ishan Doshi. Play on the 3rd bell of theatre." },
  { name: "Tabiyat", year: 2025, details: "Play by Satchit Puranik. Play on body organs." },
  { name: "Clean Bold", year: 2025, details: "Written by Babu Suthar and Khevna Desai. Play about SCUM Manifesto." },
];

const VENUES_FESTIVALS = [
  "Prithvi Theatre Festivals, Mumbai",
  "NCPA Festivals, Mumbai",
  "Nehru Centre Festivals, Mumbai",
  "NSD Theatre Olympics, Kamani Auditorium, Delhi",
  "Kalaghoda Festival, Mumbai",
  "Sabarmati Festival, Ahmedabad",
  "Tifli International Festival, Mumbai",
  "Bhau Daji Laad Museum, Mumbai",
  "DUCTAC, Dubai",
  "American School, Kuwait",
  "Esplanade Theatre, Singapore",
  "JAINA Convention, USA",
];

const VENUES_UNCONVENTIONAL = [
  "Indian Military, Rinchen Auditorium, Leh",
  "Indian Military, Siachen Base Camp",
  "Indian Navy, Kochi",
  "Indian Navy, INHS Ashwini, Mumbai",
  "Sabarmati Jail, Ahmedabad",
  "Navjivan Trust, Ahmedabad",
  "G5A Foundation, Mumbai",
  "Ouroboros, Ahmedabad",
  "Harkat Studio, Mumbai",
  "Brewbot Cafe, Mumbai",
  "Classic Rock Coffee Co., Pune",
  "The Hungry Monkey Bar & Cafe, Delhi",
];

export default function AboutPage() {
  return (
    <>
      {/* Opening — hero with vertically centered text */}
      <section className="min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1]">
            Since 1999, Ideas Unlimited Productions has pushed the figurative fourth wall — creating theatre that celebrates stories, literature, and India&apos;s rich cultural heritage across languages, cities, and stages of every kind.
          </h1>
        </div>
      </section>

      {/* Our Vision — 5/7 split */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                Our Vision
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-grey-200 text-lg leading-relaxed mb-6">
                We strive to push our literary boundaries — through theatre, prose, and poetry. Our focus lies in celebrating stories and literature using theatre as a medium. The purpose of our activities, be it plays, poetry recitation, an event, or a theatre festival, is to showcase our rich cultural heritage to the rasikjanas.
              </p>
              <p className="text-grey-200 text-lg leading-relaxed mb-6">
                Through various art forms we create an appreciation and awakening of our rich cultural heritage among our people and especially our younger generation.
              </p>
              <p className="text-grey-200 text-lg leading-relaxed">
                The most influential philosophies that have shaped our sense of art are those by Socrates, Karl Marx, Bhamasha, Mahatma Gandhi, and Shrimad Rajchandra. Over the years we have adapted the works of Rabindranath Tagore, Bhartuhari, Siddharshi Gani, and many other luminaries — always striving to encompass values that pertain to both the classes and the masses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Travelling Theatre — 5/7 split */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                The Travelling<br className="hidden lg:block" /> Theatre
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-grey-200 text-lg leading-relaxed mb-6">
                Our theatre model revolves around minimalism. We call it the Travelling Theatre — bare minimum setting with powerful performances is our USP.
              </p>
              <p className="text-grey-200 text-lg leading-relaxed mb-6">
                We have performed hugely successful monologues in restaurants, small alternate venues like G5A, Ouroboros, Studio Tamaasha, and even the Sabarmati Ashram, jails, and the Siachen valley. This vast coverage is a testament to our belief that interesting ideas can be scaled into economically viable productions.
              </p>
              <p className="text-grey-200 text-lg leading-relaxed">
                In a world where the audience is spoilt for choice in digital entertainment, new venues and small intimate audiences drive us. We aim to reach all such places with our ideas and plays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Founder — 5/7 split */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                The Founder
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-grey-200 text-lg leading-relaxed mb-6">
                Manoj Shah is an Indian theatre director, actor, and producer known for his works in Gujarati theatre. He has directed over 113 plays — from one-person shows to sweeping biographical dramas — in Hindi, Gujarati, and English.
              </p>
              <p className="text-grey-200 text-lg leading-relaxed mb-6">
                He is known primarily for his quirky biographical plays: Hu Chandrakant Bakshi, Mohan No Masalo (on Mahatma Gandhi), Apurva Avsar (on Shrimad Rajchandra), Mareez (on the poet), Jal Jal Mare Patang (on Manilal Dwivedi), Karl Marx In Kalbadevi, and Dr. Anandibai (on India&apos;s first female doctor).
              </p>
              <p className="text-grey-200 text-lg leading-relaxed mb-8">
                His style has been considered innovative, and his subjects contributed to bringing a cultural renaissance in Gujarati theatre. His plays dwell on literary and spiritual themes, often featuring solo actors. Stagecraft is at a minimum, with the key technique consisting of an actor interpreting his character role.
              </p>
              <Link
                href="/manoj-shah"
                className="font-mono text-sm uppercase tracking-wider text-purple hover:text-purple-light transition-colors"
              >
                Read the full story &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Team — 5/7 split */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                The People
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-grey-200 text-lg leading-relaxed mb-8">
                Ideas Unlimited has always been a collaborative endeavour. Over 25 years, the company has brought together some of the finest talent in Indian theatre — actors who inhabit characters with startling truth, writers who find the extraordinary in the everyday, and designers who transform bare stages into worlds.
              </p>

              {/* Team video */}
              <div className="mb-8">
                <VideoEmbed
                  url="https://youtu.be/_PIoYhz6In8"
                  title="Ideas Unlimited — The People"
                />
              </div>

              <p className="text-grey-200 text-lg leading-relaxed mb-8">
                Many of these artists are freelancers who return production after production — drawn by the creative freedom and the uncompromising standard that defines the company. From seasoned veterans to emerging voices, the Ideas Unlimited family continues to grow, united by a shared belief in the power of live storytelling.
              </p>

              <Link
                href="/people"
                className="font-mono text-sm uppercase tracking-wider text-purple hover:text-purple-light transition-colors"
              >
                View all people &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Production List — 5/7 split */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                {PRODUCTIONS.length}<br className="hidden lg:block" /> Productions
              </h2>
              <p className="text-grey-400 text-lg mt-4">1999 &ndash; 2025</p>
            </div>
            <div className="lg:col-span-7">
              <div className="border-t border-grey-700">
                {PRODUCTIONS.map((prod, i) => (
                  <div key={i} className="py-4 border-b border-grey-700">
                    <div className="flex items-baseline justify-between">
                      <span className="text-cream font-medium">{prod.name}</span>
                      <span className="font-mono text-xs text-grey-400 ml-4 shrink-0">{prod.year}</span>
                    </div>
                    <p className="text-grey-400 text-sm mt-1">{prod.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues — 5/7 split */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                Where We&apos;ve<br className="hidden lg:block" /> Performed
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-grey-200 text-lg leading-relaxed mb-8">
                Our plays have been welcomed by theatre groups, corporates, event companies, individuals, and theatre festivals — not only in India but internationally.
              </p>

              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">Festivals &amp; International</h3>
              <div className="border-t border-grey-700 mb-10">
                {VENUES_FESTIVALS.map((venue, i) => (
                  <div key={i} className="py-3 border-b border-grey-700 text-grey-300 text-sm">
                    {venue}
                  </div>
                ))}
              </div>

              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">Unconventional Stages</h3>
              <div className="border-t border-grey-700">
                {VENUES_UNCONVENTIONAL.map((venue, i) => (
                  <div key={i} className="py-3 border-b border-grey-700 text-grey-300 text-sm">
                    {venue}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
