export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  body: string[];
  inlineImages?: { afterParagraph: number; src: string; alt: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "making-of-saptapadi",
    title: "The Making of Saptapadi: A Director\u2019s Journal",
    category: "Behind the Scenes",
    excerpt: "How a chance encounter with a newspaper article became one of our most powerful productions \u2014 from first rehearsal to opening night at Prithvi Theatre.",
    image: "/images/placeholder-production.svg",
    date: "2023-11-15",
    body: [
      "It started, as so many of our productions do, with a newspaper clipping. A small article about a hijra found murdered in Bangalore, buried in the inside pages where stories of the marginalised always end up. Manoj Shah read it over his morning chai and couldn\u2019t put it down.",
      "\u201CThis is the play,\u201D he said at our next production meeting, placing the clipping on the table. No one asked what he meant. After 90-odd productions together, we\u2019ve learned to trust that instinct.",
      "The next three months were some of the most intense in our company\u2019s history. Research took us into worlds most theatre companies never touch \u2014 transgender communities in Bangalore, academic corridors where gender theory meets Indian reality, and police stations where justice is a flexible concept.",
      "Casting was deliberate. We needed actors who could inhabit characters without judgement, who could find the humanity in every role \u2014 from the university professor to the murdered hijra\u2019s lover. Neha Joshi brought a fierce intelligence to the lead role that grounded the entire production.",
      "Rehearsals were structured but open. Manoj\u2019s method is to give actors a framework and then let them discover the emotional truth within it. \u201CI don\u2019t direct performances,\u201D he often says. \u201CI direct the space between performances.\u201D",
      "Opening night at Prithvi Theatre was electric. The audience sat in absolute silence for the first forty minutes \u2014 not the silence of boredom, but of people who have forgotten they\u2019re watching a play. When the lights came up, there was a long pause before the applause began.",
      "Saptapadi went on to be selected for the META Awards 2023 and has been performed over thirty times across Mumbai, Delhi, and Ahmedabad. But the moment that matters most happened backstage after the third show, when a young transgender woman came to meet the cast and said, simply, \u201CThank you for seeing us.\u201D",
      "That\u2019s why we make theatre.",
    ],
  },
  {
    slug: "35-years-retrospective",
    title: "35 Years of Fearless Theatre: A Retrospective",
    category: "Feature",
    excerpt: "From Master Phoolmani in 1999 to Clean Bold in 2025, a look back at the productions, people, and moments that defined Ideas Unlimited.",
    image: "/images/placeholder-production.svg",
    date: "2024-01-10",
    body: [
      "When Manoj Shah staged Master Phoolmani at the Prithvi Festival in 1999, he had no idea it would become the longest-running production in our repertoire. Sixteen years it ran, from 1999 to 2015. That kind of longevity in Indian theatre is almost unheard of.",
      "But longevity was never the goal. The goal was always the same: make theatre that tells the truth. Make theatre that refuses to look away.",
      "In the early years, we were prolific and experimental. Between 1999 and 2005, we staged nearly forty productions \u2014 monologues, dramatised readings, full-length plays, poetry collages. We performed wherever we could: Prithvi Theatre, NCPA, Forbes Gujarati Sabha, book launches, literary festivals.",
      "The mid-2000s brought a shift toward what would become our signature: biographical plays. Mareez in 2004. Apurva Avsar in 2007. These weren\u2019t conventional biopics. They were explorations of ideas through the lens of extraordinary lives.",
      "Then came Karl Marx In Kalbadevi in 2012, and everything changed. The idea of Karl Marx visiting a chaotic Mumbai neighbourhood was so delightfully absurd, so perfectly Indian, that it became our calling card. It\u2019s been performed in Hindi, Hinglish, and English, at colleges, corporates, and international conferences.",
      "The last decade has seen us push into new territory: Dr. Anandibai performed in three languages, Adbhut exploring mental health, Mr. Apple reimagining Steve Jobs through an Indian lens. Each production is different, but the DNA is the same \u2014 strong writing, minimal staging, maximum truth.",
      "As we look at the 99 productions behind us and the unknown number ahead, one thing is clear: the hunger hasn\u2019t diminished. If anything, it\u2019s sharper than ever.",
    ],
  },
  {
    slug: "why-hindi-theatre-matters",
    title: "Why Hindi Theatre Matters in 2024",
    category: "Opinion",
    excerpt: "In a world dominated by screens, live Hindi theatre remains one of the most powerful ways to hold a mirror to Indian society.",
    image: "/images/placeholder-production.svg",
    date: "2024-03-22",
    body: [
      "There\u2019s a question that comes up at every panel discussion, every theatre festival, every funding meeting: is theatre still relevant?",
      "The question itself reveals a misunderstanding. Theatre isn\u2019t competing with Netflix or Instagram or YouTube. Theatre is doing something none of those platforms can do: putting human beings in the same room, breathing the same air, sharing the same silence.",
      "Hindi theatre, specifically, occupies a unique position in Indian culture. It\u2019s the language of Bollywood, yes, but on stage it becomes something else entirely. Freed from the constraints of commercial cinema, Hindi theatre can be experimental, uncomfortable, political, poetic \u2014 all the things that mainstream entertainment struggles to be.",
      "At Ideas Unlimited, we\u2019ve always believed that language is not a barrier but a bridge. We produce in Hindi, Gujarati, and English not because we\u2019re trying to cover the market, but because each language opens a different door into the human experience.",
      "Consider Popcorn with Parsai, our Hindi adaptation of Harishankar Parsai\u2019s satirical work. Parsai\u2019s Hindi is sharp, colloquial, deeply rooted in North Indian middle-class life. There is no way to translate it into English without losing everything that makes it sing. The play works because the language IS the performance.",
      "Theatre matters because it\u2019s the last truly democratic art form. You don\u2019t need Wi-Fi. You don\u2019t need a subscription. You just need a room, a performer, and an audience willing to listen.",
      "That will always matter.",
    ],
  },
  {
    slug: "travelling-theatre-siachen",
    title: "Performing at Siachen: Theatre at 20,000 Feet",
    category: "Behind the Scenes",
    excerpt: "When the Indian Military invited us to perform at the Siachen base camp, we said yes without hesitation. Here\u2019s what happened next.",
    image: "/images/placeholder-production.svg",
    date: "2023-08-05",
    body: [
      "The call came from the Indian Army\u2019s cultural division. Would Ideas Unlimited be willing to perform for troops stationed at Siachen \u2014 the highest battlefield in the world?",
      "We didn\u2019t hesitate. Our Travelling Theatre philosophy has always been about reaching audiences wherever they are. A restaurant in Bandra? Sure. A jail in Ahmedabad? Absolutely. The Siachen base camp at 20,000 feet? Let\u2019s go.",
      "The logistics were unlike anything we\u2019d faced. At that altitude, you can\u2019t take deep breaths, let alone project your voice across a room. The cold is not the kind you can layer against \u2014 it\u2019s the kind that gets into your bones and stays.",
      "We performed Mohan No Masalo \u2014 our play on young Gandhi. It\u2019s a one-person show, which made it practical for the conditions. But more than that, there was something deeply appropriate about performing a play about courage and conviction for soldiers who embody those qualities every day.",
      "The auditorium was a military hall with metal chairs and concrete walls. The acoustics were terrible. The audience \u2014 about a hundred soldiers \u2014 sat in full winter gear. None of that mattered.",
      "When the performance ended, there was a moment of absolute stillness. Then applause that shook the walls. Several soldiers came up afterward and said they hadn\u2019t seen a live performance in years. One young jawan said it was the first play he\u2019d ever seen.",
      "We\u2019ve performed at Prithvi Theatre, at NCPA, at international festivals. But that performance at Siachen is the one we talk about most. Because it proved something we\u2019ve always believed: theatre doesn\u2019t need a fancy venue. It just needs people.",
    ],
  },
  {
    slug: "karl-marx-kalbadevi-story",
    title: "How Karl Marx Ended Up in Kalbadevi",
    category: "Director\u2019s Note",
    excerpt: "The story behind one of our most popular plays \u2014 imagining what would happen if Karl Marx visited a chaotic Mumbai neighbourhood.",
    image: "/images/placeholder-production.svg",
    date: "2023-05-18",
    body: [
      "The idea was Uttam Gada\u2019s, and it was brilliantly simple: what if Karl Marx \u2014 the philosopher of class struggle \u2014 visited Kalbadevi, one of Mumbai\u2019s most chaotic, commercial, quintessentially capitalist neighbourhoods?",
      "When Uttam first pitched it, I laughed. Then I thought about it for a week. Then I called him back and said, \u201CThis is the most Indian idea anyone has ever had about a German philosopher.\u201D",
      "The play works because it\u2019s not really about Marx. It\u2019s about Mumbai. It\u2019s about how India digests and transforms every idea that comes its way \u2014 communism, capitalism, spirituality, modernity \u2014 into something uniquely, irreducibly Indian.",
      "We first staged it at the Vasant Utsav at NCPA in 2012. The response was immediate and overwhelming. People who had never voluntarily attended a play about political philosophy were quoting lines at dinner parties.",
      "Since then, Karl Marx In Kalbadevi has had more lives than we ever imagined. We\u2019ve done it in Hindi, in Hinglish, at Wilson College for the 150th anniversary of Das Kapital, at the Aligarh Muslim University international theatre conference, and at JAINA conventions in the United States.",
      "The play has been performed by Satchit Puranik, who brings a manic energy to Marx that makes the philosopher feel less like a historical figure and more like your most opinionated uncle at a family wedding.",
      "People ask me why this play works so well. I think it\u2019s because it does what the best theatre does: it takes something you think you know and makes you see it completely differently.",
    ],
  },
  {
    slug: "anandibai-three-languages",
    title: "Dr. Anandibai in Three Languages",
    category: "Behind the Scenes",
    excerpt: "Staging the same play in Gujarati, Hindi, and Marathi taught us more about India\u2019s linguistic soul than any textbook ever could.",
    image: "/images/placeholder-production.svg",
    date: "2023-02-14",
    body: [
      "Dr. Anandibai Joshi was India\u2019s first female doctor. She was Marathi by birth, educated in an English-speaking world, and her story resonates across every linguistic community in India. So when Gita Manek wrote the play for us, we knew from the start that one language wouldn\u2019t be enough.",
      "The Gujarati version came first, in 2017. Manasi Joshi performed it with a ferocity that took everyone by surprise. The play is structured as a social media interaction \u2014 Like, Comment, Share \u2014 which gives it a contemporary edge that makes a 19th-century story feel urgently modern.",
      "The Hindi version followed in 2018, for Bhavan\u2019s College. Here\u2019s what fascinated us: the same lines, translated into Hindi, carried different emotional weight. Hindi\u2019s Urdu-inflected vocabulary gave certain scenes a poetic quality that the Gujarati version expressed through directness.",
      "Then came the Marathi version for the Damu Kenkre Festival. This was the most personal \u2014 Anandibai was Marathi, and performing her story in her own language felt like bringing her home. The audience response was visceral.",
      "What we learned from this experiment is something we\u2019ve always intuited but never proved so clearly: language isn\u2019t just a vehicle for content. Language IS content. The same story told in three languages becomes three different stories \u2014 each true, each complete, each revealing something the others cannot.",
      "This is why Ideas Unlimited will always be a multilingual company. Not because it\u2019s good business \u2014 it\u2019s actually harder and more expensive \u2014 but because India itself is multilingual, and any theatre that claims to reflect India must speak in more than one tongue.",
    ],
  },
  {
    slug: "adbhut-every-brilliant-thing-gujarati",
    title: "Adbhut: How a British Play About Depression Found Its Truest Voice in Gujarati",
    category: "Behind the Scenes",
    excerpt: "Duncan Macmillan and Jonny Donahoe\u2019s Every Brilliant Thing has been performed in over 80 countries. When Satchit Puranik adapted it into Gujarati and RJ Devaki stepped on stage, something shifted.",
    image: "/images/productions/adbhut/06MAR22_Adbhut_TET_208.JPG",
    date: "2022-04-10",
    body: [
      "In 2006, a British playwright named Duncan Macmillan wrote a fifteen-minute monologue called Sleeve Notes for actress Rosie Thomson. It was about a child who, after her mother\u2019s first suicide attempt, begins writing a list of every brilliant thing worth living for. Item 1: ice cream. The monologue caught the attention of director George Perrin, who encouraged Macmillan to expand it. In 2013, working with comedian and performer Jonny Donahoe, Macmillan turned it into a full-length solo show. They called it Every Brilliant Thing.",
      "It premiered at the Ludlow Fringe Festival, transferred to Edinburgh where it sold out three consecutive years, then moved to the Barrow Street Theatre off-Broadway and became an HBO special in 2016 filmed with Donahoe performing to a live audience. The play has since been staged in over 80 countries across six continents. In March 2026, Daniel Radcliffe opened in it on Broadway at the Hudson Theatre. Macmillan \u2014 who also co-adapted 1984 for the stage with Robert Icke, and wrote People, Places and Things (which won Denise Gough an Olivier Award) \u2014 had created something that transcended language and culture. Or so it seemed.",
      "It seemed that way because the play\u2019s power lies in its specificity. The particular texture of childhood memories. The precise shade of an adolescent\u2019s embarrassment. The exact weight of a parent\u2019s silence. These things are not universal. They are deeply, irreducibly local. A straight translation would carry the plot but lose the feeling. Which is why what Satchit Puranik did with Adbhut is not translation. It is transplantation.",
      "Puranik \u2014 an FTII graduate who edited Anand Gandhi\u2019s Ship of Theseus and handled casting for Chaitanya Tamhane\u2019s Court, two of the most acclaimed Indian independent films of the 2010s \u2014 rebuilt the list from scratch. Out went Saturday morning cartoons and school dances. In came Doordarshan evenings, the scent of rain on hot earth, the particular chaos of a Navratri garba, the taste of your grandmother\u2019s thepla. The architecture of Macmillan and Donahoe\u2019s play remained \u2014 the list, the audience participation, the arc from age seven to adulthood \u2014 but the soul became Gujarati.",
      "The format, for those unfamiliar with the original: before the show, audience members find numbered slips on their seats. Each slip contains an item from the list. When the performer calls out a number, the person holding that slip stands and reads it aloud. Other audience members are recruited on the spot to play the father, a school counsellor, a veterinarian, a love interest. The house lights stay on. There is no fourth wall to break because it was never built. Macmillan and Donahoe designed the play so that the thesis \u2014 we need each other, brilliant things are communal, speaking up matters \u2014 is embedded in the form itself.",
      "The question of who would perform the Gujarati version was answered by RJ Devaki. Born into what Ahmedabad calls its \u2018first family of Gujarati theatre,\u2019 Devaki Marks had already performed in over thirty plays, won the Best Actor award at Transmedia three years running, and built a parallel career as one of Gujarat\u2019s most recognised radio voices \u2014 the \u2018Golden Voice of Ahmedabad,\u2019 as the Governor titled her. She is not an obvious choice for a play about depression. She is warm, loud, physical, funny. Which is exactly why it works.",
      "Seventy-five minutes. A chair. A Daffy Duck sweatshirt. String lights. Nothing else. Devaki moves through the room \u2014 sitting next to a stranger, pulling an elderly uncle onto the stage, making a teenager read out a love letter \u2014 and the effect is disarming. You cannot maintain the safe distance of a spectator when the performer is looking you in the eye and asking you to name something brilliant.",
      "The play tracks its protagonist from age seven to womanhood. Her mother\u2019s depression is not dramatised or sensationalised. It is simply present, the way it is present in millions of Indian households \u2014 unspoken, misunderstood, covered up with explanations about tiredness or God\u2019s will. The girl\u2019s list is her private rebellion against this silence. Every item is an argument for being alive. The list grows past a thousand, past ten thousand, past a million. It never stops growing because the point is not to finish it.",
      "The music for Adbhut was composed by Amit Bhavsar, with songs by his son Siddharth Amit Bhavsar \u2014 the Ahmedabad-based composer known as Musicwaala whose work spans Gujarati cinema from Love Ni Bhavai to Sharato Lagu. The singers include Madhubanti Bagchi, whose voice most of India now knows from Aaj Ki Raat in Stree 2, and Yashika Sikka, who has recorded with A.R. Rahman. That this calibre of musical talent anchors a Gujarati theatre production says something about the gravitational pull of the material.",
      "Manoj Shah directed. Janam Shah produced. The NCPA co-produced and hosted the premiere in 2021. Since then, it has been performed at venues across Mumbai and Ahmedabad \u2014 Scrapyard, Prayogshala \u2014 and continues to draw full houses years later. Notably, an English-language Indian production of Every Brilliant Thing already existed, directed by Quasar Thakore Padamsee and performed by Vivek Madan, which was nominated at the META Awards. Adbhut is not competing with that version. It is doing something different: proving that the play\u2019s emotional core survives not just translation but cultural reinvention.",
      "Mental health remains one of Indian theatre\u2019s most underserved subjects. Bollywood has made films about it; stand-up comics joke about it; therapists post about it on Instagram. But the live, communal, inescapable experience of theatre does something none of those forms can: it puts you in a room with a hundred other people who are all feeling the same thing at the same time, and it says, you are not alone in this.",
      "Adbhut means \u2018wonder\u2019 in Gujarati. It is the right title. Not because the play is wonderful \u2014 though it is \u2014 but because it returns you to a state of wonder. The wonder of a seven-year-old who believes that a list of brilliant things can save her mother. The wonder of an audience that discovers, midway through a play about depression, that they are laughing. The wonder of realising, as the lights come up, that the person sitting next to you \u2014 a stranger you will never see again \u2014 is wiping their eyes too.",
    ],
    inlineImages: [
      { afterParagraph: 2, src: "/images/productions/adbhut/06MAR22_Adbhut_TET_83.JPG", alt: "RJ Devaki performing Adbhut — solo on stage" },
      { afterParagraph: 5, src: "/images/productions/adbhut/06MAR22_Adbhut_TET_336.JPG", alt: "Devaki interacting with audience members during Adbhut" },
      { afterParagraph: 8, src: "/images/productions/adbhut/06MAR22_Adbhut_TET_52.JPG", alt: "Audience participation during Adbhut — Devaki among the crowd" },
      { afterParagraph: 10, src: "/images/productions/adbhut/06MAR22_Adbhut_TET_208.JPG", alt: "Devaki seated cross-legged, arms outstretched — the wonder of Adbhut" },
    ],
  },
  {
    slug: "achalayatan-tagore-gujarati-theatre",
    title: "Achalayatan: When Tagore\u2019s Most Radical Play Spoke Gujarati",
    category: "Heritage",
    excerpt: "In 2008, Ideas Unlimited brought Rabindranath Tagore\u2019s fierce allegory of institutional rigidity to Kolkata\u2019s Tagore Festival \u2014 in Gujarati. The story of how a nearly-forgotten adaptation by Gandhian intellectuals found new life on stage.",
    image: "/images/productions/achalayatan/Achalayatan---4.jpg",
    date: "2008-10-15",
    body: [
      "Rabindranath Tagore wrote Achalayatan in 1911, a year before he would win the Nobel Prize for Literature. The title translates roughly as \u2018The Immovable Institution\u2019 \u2014 and the play is exactly about that: a system so petrified by its own rules that it has forgotten why those rules exist.",
      "The setting is an ashram, sealed off from the world. Its windows are shut. Its doors are locked. Even air from outside is considered contamination. The students recite scriptures they do not understand. The elders enforce rituals they cannot explain. Into this airless world steps Panchak, a young student who cannot bring himself to stop asking why.",
      "Panchak\u2019s crime is simple: he opens a window. Through it, he glimpses a world of untouchables living free, unencumbered lives outside the ashram walls. No rules, no hierarchy, no pretence of spiritual superiority \u2014 just people living. This encounter shatters his faith in the institution and sets him on a path toward a truth the ashram has spent centuries trying to wall out: that God does not live inside closed systems.",
      "The play is Tagore at his most allegorically fierce. It is a direct attack on the Hindu orthodoxy of his time \u2014 the rigid caste hierarchies, the empty ritualisms, the educational institutions that teach obedience rather than understanding. When it was first staged in Bengal, conservative audiences were outraged. Over a century later, the play\u2019s critique has only sharpened. Every country, every era, every institution builds its own Achalayatan.",
      "What makes the Ideas Unlimited production historically distinctive is the text itself. The Gujarati adaptation was not a modern commission. It was created decades earlier by a group of Gandhian intellectuals: Giridhar Kripalani adapted the Bengali original under the guidance of Kaka Kalelkar, with the process touched by figures like Mahadevbhai Desai and Swami Anand \u2014 men who moved between Tagore\u2019s Santiniketan and Gandhi\u2019s ashrams, bridging Bengal and Gujarat at the level of ideas.",
      "Mahadev Desai, Gandhi\u2019s personal secretary, was himself a prolific translator of Tagore into Gujarati, having rendered works like Chitrangada and Viday Abhishap in the 1920s. Kaka Kalelkar had studied at Santiniketan and maintained a lifelong connection to Tagore\u2019s vision of education. The Gujarati Achalayatan, then, was not merely a translation. It was a meeting point of two of India\u2019s great intellectual traditions \u2014 the Tagorean and the Gandhian \u2014 expressed in the language of Gujarat.",
      "Manoj Shah discovered this adaptation and recognised its power. \u201CAfter scanning all his work, I finally selected Achalayatan, because it is one of Tagore\u2019s best crafted plays,\u201D Shah wrote in his director\u2019s note. \u201CThe plot which revolves around issues like religion, education and society at large, has a very contemporary feel to it. I went through all the nuances of the play for six months and rehearsed with the actors for two months. In all it took me eight months to get the play ready for the stage.\u201D",
      "The choice carried weight beyond the literary. In 2008, staging a Gujarati-language production that excoriated religious orthodoxy required a particular kind of artistic nerve. As the theatre historian Ananda Lal noted in his survey of Tagore productions in Kolkata, Shah\u2019s choice \u201Cseemed quite brave, for Tagore is at his most scathing about rigid institutional practices in this play.\u201D Kolkata itself had not seen a major Achalayatan production in over a decade.",
      "The production premiered on 10 September 2008 at G. D. Birla Sabhagar in Kolkata, as part of a five-day Tagore Festival. It was the only Gujarati-language play in the programme \u2014 a Mumbaikar troupe performing a Bengali Nobel laureate\u2019s work in Gujarati, in the playwright\u2019s own city. The cast of over twenty performed in white and saffron against minimal sets, with Hussaini Dawavala\u2019s lighting design carving the ashram\u2019s claustrophobia out of darkness.",
      "The Gujarati press took notice. Shishir Ramavat, writing in Gujarat Samachar, described the production\u2019s emotional reach and the significance of bringing a Gujarati Tagore to Kolkata. Shah himself framed the play\u2019s tone not as opposition to systems but as self-discovery \u2014 a distinction that reveals something essential about his directorial philosophy. He does not stage polemics. He stages journeys.",
      "Achalayatan remains one of Tagore\u2019s most neglected major works. It is rarely staged in any language, let alone in Gujarati. Yet its core argument \u2014 that institutions calcify, that rules outlive their meaning, that the divine is not locked behind any door \u2014 is as urgent now as it was in 1911. In an era of hardening identities and shrinking intellectual spaces, Panchak\u2019s simple act of opening a window feels less like allegory and more like instruction.",
      "The production was a tribute, as the programme booklet stated, to India\u2019s first Nobel laureate. But it was also something rarer: proof that a great play does not belong to the language in which it was written. It belongs to whoever has the courage to perform it.",
    ],
    inlineImages: [
      { afterParagraph: 2, src: "/images/productions/achalayatan/Achalayatan-1.jpg", alt: "Ashram students in white — the rigid institution of Achalayatan" },
      { afterParagraph: 5, src: "/images/productions/achalayatan/Achalayatan---3.jpg", alt: "The Guruji arrives — a moment of liberation in Achalayatan" },
      { afterParagraph: 8, src: "/images/productions/achalayatan/Achalayatan---4.jpg", alt: "The walls of the ashram challenged — Achalayatan at G. D. Birla Sabhagar, Kolkata" },
      { afterParagraph: 10, src: "/images/productions/achalayatan/Achalayatan---2.jpg", alt: "Cast of Achalayatan on stage at the Tagore Festival, Kolkata 2008" },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
