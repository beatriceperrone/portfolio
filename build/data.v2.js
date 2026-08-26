// ============================================================
// DATI V2 — Beatrice Perrone (versione con correzioni N1, IT + EN)
// ============================================================

const SITE = {
  name: "Beatrice Perrone",
  intro:
    "Mi occupo di eventi, comunicazione, marketing e progetti diversificati. Coordino la gestione logistica end-to-end e sviluppo strategie di comunicazione in linea con i KPIs. Credo in progetti sostenibili, curati e pensati per l'esperienza delle persone: il dettaglio fa la differenza, e la cura parte dall'ascolto.",
  intro_en:
    "I work on events, communication, marketing and diversified projects. I coordinate end-to-end logistics and develop communication strategies aligned with KPIs. I believe in sustainable, curated projects designed around people's experience: detail makes the difference, and care starts with listening.",
  email: "beatrice.perrone00@gmail.com",
  phone: "+39 346 737 6095",
  phoneHref: "+393467376095",
  location: "Turin, Italy",
  linkedin: "https://www.linkedin.com/in/beatrice-perrone",
  cv: "assets/CV_Beatrice-Perrone_en.pdf",
};

const PROJECTS = [
  {
    slug: "luoghi-comuni",
    num: "01",
    accent: "#8DADF1",
    accentText: "#1B1721",
    cat: "Curatela & fotografia",
    cat_en: "Curating & photography",
    title: "Luoghi Comuni",
    title_en: "Luoghi Comuni",
    pageTitle: "Luoghi Comuni",
    pageTitle_en: "Luoghi Comuni",
    year: "2022",
    year_en: "2022",
    place: "Verona, Italia",
    place_en: "Verona, Italy",
    abstract:
      "Una mostra diffusa dedicata al rapporto tra fotografia e paesaggio, progettata collettivamente: dalla selezione e schedatura delle opere all'allestimento, dal testo curatoriale alla campagna di comunicazione.",
    abstract_en:
      "A widespread exhibition on the relationship between photography and landscape, designed collectively: from selecting and cataloguing the works to the set-up, from the curatorial text to the communication campaign.",
    photo: "assets/foto/luoghi-comuni.jpg",
    body: [
      "<p>Durante i miei studi in web marketing & digital communication, sono stata selezionata per il workshop <strong>Visual Art Collections Management and Curating</strong>, un percorso di alta formazione dedicato alla gestione, valorizzazione e curatela delle opere d'arte.</p>",
      "<p><strong>LUOGHI COMUNI</strong> nasce da un progetto inedito che ha fatto incontrare Fondazione Cariverona, l'Associazione Culturale Urbs Picta e un gruppo di studentesse e studenti di IUSVE, dell'Accademia di Belle Arti di Verona e dell'Università di Verona. L'obiettivo: costruire, nella sua totalità, un progetto curatoriale complesso dedicato al rapporto tra fotografia e paesaggio, attraverso gli sguardi di Gabriele Basilico e Alessandra Chemollo sui cantieri e sui siti monumentali della Verona storica e industriale.</p>",
      "<p>Il workshop ha alternato incontri in aula con tutor e professionisti del settore culturale a sessioni laboratoriali sul campo. Il progetto ha preso forma attraverso visite ai siti, selezione e studio delle opere, stesura del testo curatoriale, progettazione dell'allestimento e redazione del comunicato stampa e della campagna di comunicazione.</p>",
      "<p>Ne è nata una <strong>mostra diffusa</strong> sul territorio di Verona, aperta in tre sedi diverse e arricchita da un programma pubblico di talk, laboratori per diverse fasce d'età e conferenze.</p>",
    ],
    body_en: [
      "<p>During my studies in web marketing & digital communication I was selected for the <strong>Visual Art Collections Management and Curating</strong> workshop, an advanced training programme dedicated to the management, enhancement and curating of artworks.</p>",
      "<p><strong>LUOGHI COMUNI</strong> stems from an unprecedented project that brought together Fondazione Cariverona, the Urbs Picta Cultural Association and a group of students from IUSVE, the Academy of Fine Arts of Verona and the University of Verona. The goal: to build, in its entirety, a complex curatorial project dedicated to the relationship between photography and landscape, through the gazes of Gabriele Basilico and Alessandra Chemollo on the building sites and monumental sites of historic and industrial Verona.</p>",
      "<p>The workshop alternated classroom sessions with tutors and professionals from the cultural sector with hands-on laboratory sessions. The project took shape through site visits, the selection and study of the works, the writing of a curatorial text, the design of the exhibition layout and the drafting of the press release and communication campaign.</p>",
      "<p>The result was a <strong>widespread exhibition</strong> across the city of Verona, opened in three different venues and enriched by a public programme of talks, workshops for different age groups and conferences.</p>",
    ],
    actions: [
      "Selezione, studio e schedatura delle opere fotografiche",
      "Stesura del testo curatoriale e del comunicato stampa",
      "Progettazione dell'allestimento nelle tre sedi",
      "Costruzione della campagna di comunicazione",
      "Coordinamento con tutor, istituzioni e professionisti coinvolti",
    ],
    actions_en: [
      "Selection, study and cataloguing of photographic works",
      "Writing of the curatorial text and press release",
      "Design of the exhibition layout in the three venues",
      "Building the communication campaign",
      "Coordination with tutors, institutions and professionals involved",
    ],
    gallery: [
      {
        src: "../../assets/foto/gallerie/luoghi-comuni/01.jpg",
        alt: "Un gruppo di persone osserva in controluce una suggestiva struttura architettonica circolare con un'installazione sospesa illuminata dalla luce naturale.",
      },
      {
        src: "../../assets/foto/gallerie/luoghi-comuni/02.jpg",
        alt: "Due persone ammirano fotografie in bianco e nero esposte sulla parete di una galleria d'arte contemporanea, accanto a una grande scultura.",
      },
    ],
  },
  {
    slug: "tesi-esperienziale",
    num: "02",
    accent: "#F6A493",
    accentText: "#1B1721",
    cat: "ricerca e marketing",
    cat_en: "Research & marketing",
    title: "Il marketing esperienziale nei musei",
    title_en: "Experiential marketing in museums",
    pageTitle: "Il marketing esperienziale nei musei",
    pageTitle_en: "Experiential marketing in museums",
    year: "2023",
    year_en: "2023",
    place: "IUSVE, Verona",
    place_en: "IUSVE, Verona",
    abstract:
      "Dalla desk analysis alla netnografia, fino alle interviste a chi i musei li vive e li dirige davvero: Rijksmuseum, MAO Torino, London Design Museum, TextielMuseum. Per restituire modelli e step operativi al management culturale.",
    abstract_en:
      "From desk analysis to netnography, up to interviews with those who truly live and run museums: Rijksmuseum, MAO Turin, London Design Museum, TextielMuseum. To give cultural management operative models and steps.",
    photo: "assets/foto/tesi-esperienziale.jpg",
    body: [
      "<p>Al termine del percorso magistrale in Web Marketing & Digital Communication, ho sviluppato una ricerca dal titolo <em>“I musei italiani nel contesto postmoderno: un approccio di marketing esperienziale. Dallo stato dell'arte alle implicazioni manageriali nel processo di implementazione dell'esperienza museale”</em>.</p>",
      "<p>Il punto di partenza sono le criticità del patrimonio museale italiano: i difficili equilibri tra frammentarietà e polarizzazione, pubblico e privato, tutela e valorizzazione, e le sfide legate all'accessibilità, con una stima del 78,4% degli italiani che non frequenta i musei.</p>",
      "<p>Ho condotto una ricerca qualitativa su un campione di <strong>“musei esperienziali”</strong> basata su desk analysis e analisi netnografica, con un focus sull'analisi dell'offerta e dei linguaggi. Il lavoro di campo ha incluso interviste a operatori culturali di importanti istituzioni in Italia e all'estero: il Rijksmuseum di Amsterdam, il London Design Museum, il TextielMuseum di Tilburg e il MAO di Torino.</p>",
      "<p>I risultati disegnano un trend globale di trasformazione: i concetti di “interattivo” e “immersivo” diventano centrali, e il marketing esperienziale incrementa l'autonomia finanziaria, incentiva la partecipazione e valorizza le caratteristiche uniche dei siti. Ho sintetizzato il tutto in <strong>4 modelli di museo</strong> e <strong>7 step operativi</strong>, pensati per supportare operatori culturali e management.</p>",
    ],
    body_en: [
      "<p>At the end of my Master's in Web Marketing & Digital Communication, I developed a research titled <em>“I musei italiani nel contesto postmoderno: un approccio di marketing esperienziale. Dallo stato dell'arte alle implicazioni manageriali nel processo di implementazione dell'esperienza museale”</em>.</p>",
      "<p>The starting point is the critical issues of Italian museum heritage: the difficult balances between fragmentation and polarisation, public and private, conservation and enhancement, and the accessibility challenges, with an estimated 78.4% of Italians not visiting museums.</p>",
      "<p>I conducted qualitative research on a sample of <strong>“experiential museums”</strong> based on desk analysis and netnographic analysis, focusing on the offer and its languages. The fieldwork included interviews with cultural operators from major institutions in Italy and abroad: the Rijksmuseum in Amsterdam, the London Design Museum, the TextielMuseum in Tilburg and the MAO in Turin.</p>",
      "<p>The results outline a global transformation trend: the concepts of “interactive” and “immersive” become central, and experiential marketing increases financial autonomy, encourages participation and enhances the unique features of sites. I summarised everything in <strong>4 museum models</strong> and <strong>7 operative steps</strong>, designed to support cultural operators and management.</p>",
    ],
    download: true,
  },
  {
    slug: "club-silencio",
    num: "03",
    accent: "#2458D4",
    accentText: "#FFFFFF",
    cat: "comunicazione e eventi",
    cat_en: "Communication & events",
    title: "Una Notte al Museo",
    title_en: "A Night at the Museum",
    pageTitle: "Una Notte al Museo",
    pageTitle_en: "A Night at the Museum",
    year: "2022",
    year_en: "2022",
    place: "Torino, Italia",
    place_en: "Turin, Italy",
    abstract:
      "25+ aperture serali di musei e fondazioni in tutto il Nord Italia per un pubblico under 30. Strategia social, contenuti digitali e presenza in loco per il format “Una Notte al Museo”.",
    abstract_en:
      "25+ evening openings of museums and foundations across Northern Italy for an under-30 audience. Social strategy, digital content and on-site presence for the “A Night at the Museum” format.",
    photo: "assets/foto/club-silencio.jpg",
    body: [
      "<p><strong>Club Silencio</strong> è un'organizzazione non-profit nata per rendere la cultura più accessibile ai giovani under 30, attraverso format che trasformano musei ed edifici storici in spazi vivi e contemporanei.</p>",
      "<p>Il format di maggior successo, <strong>“Una Notte al Museo”</strong>, apre al pubblico musei e fondazioni italiane con visite guidate, food &amp; drink, selezioni musicali e intrattenimento a tema culturale.</p>",
      "<p>In qualità di Assistente alla Comunicazione ho preso parte all'organizzazione estiva 2022-2023 del palinsesto eventi.</p>",
      "<p>Il mio lavoro ha spaziato dalla promozione di oltre 25 eventi in musei e fondazioni del Nord Italia alla gestione dei canali social dell'organizzazione, con lo sviluppo di contenuti digitali pensati per massimizzare engagement, visibilità e partecipazione. Durante gli eventi ho fornito supporto operativo e logistico on site.</p>",
    ],
    body_en: [
      "<p><strong>Club Silencio</strong> is a non-profit organisation created to make culture more accessible to the under-30 audience, through formats that turn museums and historic buildings into living, contemporary spaces.</p>",
      "<p>Its most successful format, <strong>“A Night at the Museum”</strong>, opens Italian museums and foundations to the public with guided tours, food &amp; drink, musical selections and culture-themed entertainment.</p>",
      "<p>As Communication Assistant I took part in organising the summer 2022-2023 programme of events.</p>",
      "<p>My work ranged from promoting more than 25 events in museums and foundations across Northern Italy to managing the organisation's social channels, developing digital content designed to maximise engagement, visibility and attendance. During the events I provided on-site operational and logistics support.</p>",
    ],
    actions: [
      "Promozione di 25+ eventi in musei e fondazioni del Nord Italia",
      "Gestione dei canali social e pianificazione del piano editoriale",
      "Creazione di contenuti digitali: video, grafiche e copywriting",
      "Supporto operativo e logistico durante gli eventi",
      "Strategie di engagement per il target under 30",
    ],
    actions_en: [
      "Promotion of 25+ events in museums and foundations across Northern Italy",
      "Social media management and editorial calendar",
      "Digital content creation: videos, graphics and copywriting",
      "On-site operational and logistics support during events",
      "Engagement strategies for the under-30 target",
    ],
    gallery: [
      {
        src: "../../assets/foto/gallerie/club-silencio/01.jpg",
        alt: "Una persona tiene in mano uno smartphone per scattare una foto a un elegante corridoio illuminato da luci scenografiche viola e blu.",
      },
      {
        src: "../../assets/foto/gallerie/club-silencio/02.jpg",
        alt: "Due persone viste di spalle osservano e indicano una serie di piccole fotografie esposte sulla parete bianca di una galleria d'arte.",
      },
    ],
  },
  {
    slug: "villaggio-della-salute",
    num: "04",
    accent: "#EBA140",
    accentText: "#1B1721",
    cat: "Eventi & digital education",
    cat_en: "Events & digital education",
    title: "Villaggio della Salute",
    title_en: "Health Village",
    pageTitle: "Villaggio della Salute: genitori e figli nell'era dei social",
    pageTitle_en: "Health Village: parents and children in the social media era",
    year: "2023",
    year_en: "2023",
    place: "Cuneo, IT",
    place_en: "Cuneo, IT",
    abstract:
      "“Genitori e figli nell'era dei social”: un incontro pubblico con le psicoterapeute di Spazio Ascolto, in cui ho rappresentato Involucra portando il punto di vista della comunicazione digitale.",
    abstract_en:
      "“Parents and children in the social media era”: a public meeting with the psychotherapists of Spazio Ascolto, where I represented Involucra bringing the digital communication perspective.",
    photo: "assets/foto/villaggio-della-salute.jpg",
    body: [
      "<p>L'agenzia Involucra ha curato il <strong>Villaggio della Salute</strong>, un'area tematica della Stracôni di Cuneo, nata nel 2023 dalla collaborazione tra Stracôni e Lilium Spazio Medico e articolata su tre giorni con diversi panel di esperti a tema salute e benessere.</p>",
      "<p><strong>Genitori e figli nell'era dei social</strong>: un incontro pubblico con le psicoterapeute di Spazio Ascolto, in cui ho rappresentato l'agenzia marketing Involucra portando il punto di vista della comunicazione digitale, intervenendo come relatrice ed esperta di digitale.</p>",
    ],
    body_en: [
      "<p>Involucra agency curated the <strong>Health Village</strong>, a themed area of the Stracôni of Cuneo created in 2023 from the collaboration between Stracôni and Lilium Spazio Medico, structured over three days with several expert panels on health and wellbeing.</p>",
      "<p><strong>Parents and children in the social media era</strong>: a public meeting with the psychotherapists of Spazio Ascolto, where I represented the Involucra marketing agency bringing the digital communication perspective, speaking as a digital expert.</p>",
    ],
    actions: [
      "Intervento come relatrice ed esperta di digitale",
      "Supporto logistica evento",
      "Supporto comunicazione",
      "Public speaking",
    ],
    actions_en: [
      "Speaking as a digital expert",
      "Event logistics support",
      "Communication support",
      "Public speaking",
    ],
    gallery: [
      {
        src: "../../assets/foto/gallerie/villaggio-della-salute/01.jpg",
        alt: "Una spettacolare vista aerea della partenza della corsa podistica Stracôni a Cuneo, con una marea di partecipanti schierati lungo l'ampio corso cittadino.",
      },
      {
        src: "../../assets/foto/gallerie/villaggio-della-salute/02.jpg",
        alt: "Una relatrice parla con il microfono davanti al pubblico durante una conferenza dedicata alla salute e al benessere.",
      },
    ],
  },
  {
    slug: "giornata-del-giappone",
    num: "05",
    accent: "#FAE2D8",
    accentText: "#1B1721",
    cat: "Eventi & esperienze immersive",
    cat_en: "Events & immersive experiences",
    title: "Giornata del Giappone",
    title_en: "Japan Day",
    pageTitle: "Giornata del Giappone",
    pageTitle_en: "Japan Day",
    year: "2024 e 2025",
    year_en: "2024 and 2025",
    place: "Forte di Bard, Valle d'Aosta",
    place_en: "Forte di Bard, Aosta Valley",
    abstract:
      "A partire dalla mostra “Eroi, evoluzione di un mito. Dal Giappone antico al contemporaneo”, ho costruito una giornata capace di attivare ogni spazio del Forte. Tutte le attività in sold out.",
    abstract_en:
      "Starting from the exhibition “Eroi, evoluzione di un mito. Dal Giappone antico al contemporaneo”, I built a day able to activate every space of the Forte. Every activity sold out.",
    photo: "assets/foto/giornata-del-giappone.jpg",
    body: [
      "<p>Dalla mostra <strong>“Eroi, evoluzione di un mito. Dal Giappone antico al contemporaneo”</strong> del Forte di Bard è nata l'idea di una <strong>Giornata del Giappone</strong>: un progetto a tutto tondo capace di attivare tutti gli spazi del Forte e tutti i suoi pubblici, con l'obiettivo di creare un'esperienza immersiva che animasse il luogo a 360°.</p>",
      "<p>Ho strutturato un palinsesto di laboratori, workshop, eventi e momenti performativi dedicati alla cultura giapponese.</p>",
      "<p>Gli spazi attivi hanno incluso la mostra con visite guidate, le sale conferenze con performance e talk tematici, le sale private dedicate a workshop e attività e il ristorante con un menu a tema, il tutto coordinato da un allestimento degli spazi a tema giapponese.</p>",
      "<p>Sul fronte <strong>logistico</strong> ho curato le prenotazioni anticipate dei laboratori, una tariffa comprensiva dell'intera giornata e slot orari a incastro per ogni attività. Il risultato: <strong>sold out</strong> per ogni evento in programma.</p>",
    ],
    body_en: [
      "<p>From the Forte di Bard exhibition <strong>“Eroi, evoluzione di un mito. Dal Giappone antico al contemporaneo”</strong> came the idea of a <strong>Japan Day</strong>: an all-round project able to activate every space of the Forte and every audience, with the goal of creating an immersive experience that brought the place to life at 360°.</p>",
      "<p>I structured a programme of labs, workshops, events and performances dedicated to Japanese culture.</p>",
      "<p>The active spaces included the exhibition with guided tours, the conference halls with performances and themed talks, private rooms dedicated to workshops and activities, and the restaurant with a themed menu, all coordinated by a Japanese-themed set-up of the spaces.</p>",
      "<p>On the <strong>logistics</strong> side I handled advance bookings for workshops, a day ticket and interlocking time slots for each activity. The result: <strong>sold out</strong> for every event.</p>",
    ],
    actions: [
      "Relazioni con artisti",
      "Ideazione e strutturazione del palinsesto della giornata",
      "Gestione logistica: prenotazioni, tariffa giornaliera e slot orari",
      "Promozione evento on e offline",
      "Allestimento",
      "Coordinamento on site evento",
    ],
    actions_en: [
      "Relations with artists",
      "Ideation and structuring of the day's programme",
      "Logistics management: bookings, day ticket and time slots",
      "Online and offline event promotion",
      "Set-up",
      "On-site event coordination",
    ],
    gallery: [
      {
        src: "../../assets/foto/gallerie/giornata-del-giappone/01.jpg",
        alt: "Un'esposizione artigianale di ciondoli e collane realizzati con frammenti di ceramica decorata, disposti ordinatamente su piccole cornici di bambù sopra una stuoia.",
      },
      {
        src: "../../assets/foto/gallerie/giornata-del-giappone/02.jpg",
        alt: "Una donna con un kimono floreale tradizionale mostra la tecnica dell'origami ai partecipanti seduti attorno a un tavolo durante un laboratorio.",
      },
    ],
  },
  {
    slug: "gianna-nannini",
    num: "06",
    accent: "#FF6E52",
    accentText: "#1B1721",
    cat: "live music e logistica",
    cat_en: "Live music & logistics",
    title: "Gianna Nannini · Sei Nell'Anima Tour",
    title_en: "Gianna Nannini · Sei Nell'Anima Tour",
    pageTitle: "Gianna Nannini · Sei Nell'Anima Tour",
    pageTitle_en: "Gianna Nannini · Sei Nell'Anima Tour",
    year: "2025",
    year_en: "2025",
    place: "Forte di Bard, Valle d'Aosta",
    place_en: "Forte di Bard, Aosta Valley",
    abstract:
      "Coordinamento on site e gestione completa del rider hospitality per la data valdostana del tour di Gianna Nannini: catering, ristorante, backstage, camerini e assistenza durante l'evento.",
    abstract_en:
      "On-site coordination and full management of the hospitality rider for the Aosta Valley date of Gianna Nannini's tour: catering, restaurant, backstage, dressing rooms and assistance during the event.",
    photo: "assets/foto/gianna-nannini.jpg",
    body: [
      "<p>Il <strong>“Sei nell'anima · Festival European Leg 2025”</strong> è il tour estivo nei festival che ha portato Gianna Nannini, tra luglio e settembre 2025, in Italia e in Europa. Una produzione importante, con esigenze organizzative e di ospitalità elevate.</p>",
      "<p>Per la data del Forte di Bard ho seguito la <strong>logistica dell'evento</strong>, il <strong>coordinamento on site</strong> e la gestione delle richieste del <strong>rider hospitality</strong>.</p>",
      "<p>Un lavoro fatto di precisione e tempestività, in cui ogni dettaglio ha contribuito alla riuscita di una serata live.</p>",
    ],
    body_en: [
      "<p>The <strong>“Sei nell'anima · Festival European Leg 2025”</strong> is the summer festival tour that brought Gianna Nannini across Italy and Europe between July and September 2025. A major production with high organisational and hospitality demands.</p>",
      "<p>For the Forte di Bard date I handled <strong>event logistics</strong>, <strong>on-site coordination</strong> and the management of the <strong>hospitality rider</strong> requests.</p>",
      "<p>A job of precision and timeliness, where every detail contributed to the success of a live evening.</p>",
    ],
    actions: [
      "Logistica dell'evento e coordinamento on site",
      "Gestione delle richieste del rider hospitality",
      "Coordinamento di catering e ristorante",
      "Allestimento di backstage e camerini",
      "Assistenza durante l'evento",
    ],
    actions_en: [
      "Event logistics and on-site coordination",
      "Management of hospitality rider requests",
      "Catering and restaurant coordination",
      "Backstage and dressing room setup",
      "On-site assistance during the event",
    ],
    gallery: [
      {
        src: "../../assets/foto/gallerie/gianna-nannini/01.jpg",
        alt: "La cantante Gianna Nannini sorride con energia sul palco indossando un completo rosso acceso, illuminata da un intenso fascio di luce scenico.",
      },
      {
        src: "../../assets/foto/gallerie/gianna-nannini/02.jpg",
        alt: "Una cantante si esibisce con passione sul palco impugnando un microfono, indossando un completo rosso acceso su uno sfondo illuminato da luci ed effetti scenici.",
      },
    ],
  },
  {
    slug: "compay-segundo",
    num: "07",
    accent: "#8DADF1",
    accentText: "#1B1721",
    cat: "Live & logistica eventi",
    cat_en: "Live & event logistics",
    title: "Grupo Compay Segundo",
    title_en: "Grupo Compay Segundo",
    pageTitle: "Grupo Compay Segundo",
    pageTitle_en: "Grupo Compay Segundo",
    year: "2026",
    year_en: "2026",
    place: "Forte di Bard, Valle d'Aosta",
    place_en: "Forte di Bard, Aosta Valley",
    abstract:
      "L'autentico son cubano del Buena Vista Social Club, oggi guidato da Salvador Repilado Labrada. Per il Vívelo International Tour ho seguito logistica, on site e ospitalità della band.",
    abstract_en:
      "The authentic son cubano of the Buena Vista Social Club, now led by Salvador Repilado Labrada. For the Vívelo International Tour I handled logistics, on-site work and the band's hospitality.",
    photo: "assets/foto/compay-segundo.jpg",
    body: [
      "<p>L'autentico <em>son cubano</em> del Buena Vista Social Club torna in Italia nell'estate 2026 con il <strong>“Vívelo International Tour”</strong> del <strong>Grupo Compay Segundo</strong>, una tournée estiva di 14 date che porta sui palchi italiani l'eredità musicale del leggendario artista, oggi guidato dal figlio Salvador Repilado Labrada.</p>",
      "<p>Per la tappa al Forte di Bard ho curato la logistica dell'evento, il coordinamento on site e la gestione delle richieste del rider hospitality: catering, ristorante, backstage, camerini e assistenza durante l'evento.</p>",
    ],
    body_en: [
      "<p>The authentic <em>son cubano</em> of the Buena Vista Social Club returned to Italy in summer 2026 with the <strong>“Vívelo International Tour”</strong> of <strong>Grupo Compay Segundo</strong>, a 14-date summer tour that brings the musical legacy of the legendary artist, now led by his son Salvador Repilado Labrada, to Italian stages.</p>",
      "<p>For the Forte di Bard date I handled event logistics, on-site coordination and the management of hospitality rider requests: catering, restaurant, backstage, dressing rooms and assistance during the event.</p>",
    ],
    actions: [
      "Logistica dell'evento e coordinamento on site",
      "Gestione delle richieste del rider hospitality",
      "Coordinamento di catering e ristorante",
      "Allestimento di backstage e camerini",
      "Assistenza durante l'evento",
    ],
    actions_en: [
      "Event logistics and on-site coordination",
      "Management of hospitality rider requests",
      "Catering and restaurant coordination",
      "Backstage and dressing room setup",
      "On-site assistance during the event",
    ],
    gallery: [
      {
        src: "../../assets/foto/gallerie/compay-segundo/01.jpg",
        alt: "Un gruppo musicale in abiti eleganti si esibisce dal vivo su un palco illuminato da fasci di luce, con il cantante al centro che suona le maracas affiancato da chitarristi e fiati.",
      },
      {
        src: "../../assets/foto/gallerie/compay-segundo/02.jpg",
        alt: "Un musicista suona con grande passione un contrabbasso e canta intensamente davanti a un microfono vintage sul palco.",
      },
    ],
  },
  {
    slug: "cosmo-matinee",
    num: "08",
    accent: "#2458D4",
    accentText: "#FFFFFF",
    cat: "Live & logistica eventi",
    cat_en: "Live & event logistics",
    title: "Cosmo · Matinée Tour",
    title_en: "Cosmo · Matinée Tour",
    pageTitle: "Cosmo · Matinée Tour",
    pageTitle_en: "Cosmo · Matinée Tour",
    year: "2026",
    year_en: "2026",
    place: "Forte di Bard, Valle d'Aosta",
    place_en: "Forte di Bard, Aosta Valley",
    abstract:
      "Concerti alle 6 e 7 del mattino: un format fuori dagli schemi che richiede accoglienza a orari inconsueti e una logistica pensata per trasformare l'alba in un'esperienza unica.",
    abstract_en:
      "Concerts at 6 and 7 in the morning: an out-of-the-box format requiring welcoming at unusual hours and logistics designed to turn sunrise into a unique experience.",
    photo: "assets/foto/cosmo-matinee.jpg",
    body: [
      "<p>Il <strong>Matinée Tour 2026</strong> di Cosmo è un format innovativo: i concerti si tengono alle prime luci dell'alba. L'artista presenta il suo album <strong>“La fonte”</strong>, trasformando il live in un viaggio sonoro dal risveglio all'inizio della giornata.</p>",
      "<p>Un evento fuori dagli schemi che richiede un'organizzazione altrettanto speciale: accoglienza a orari inconsueti, gestione delle luci e dell'atmosfera all'alba e una logistica pensata per accompagnare pubblico e produzione in un'esperienza unica.</p>",
      "<p>Per la data al Forte di Bard ho seguito la logistica dell'evento, il coordinamento on site e la gestione delle richieste del rider hospitality: catering, ristorante, backstage, camerini e assistenza durante l'evento.</p>",
    ],
    body_en: [
      "<p>Cosmo's <strong>Matinée Tour 2026</strong> is an innovative format: concerts take place at the first light of dawn. The artist presents his album <strong>“La fonte”</strong>, turning the live show into a sonic journey from waking to the start of the day.</p>",
      "<p>An out-of-the-ordinary event that demands equally special organisation: welcoming people at unusual hours, managing lights and atmosphere at sunrise, and logistics designed to accompany the audience and the production through a unique experience.</p>",
      "<p>For the Forte di Bard date I handled event logistics, on-site coordination and the management of hospitality rider requests: catering, restaurant, backstage, dressing rooms and assistance during the event.</p>",
    ],
    actions: [
      "Logistica dell'evento e coordinamento on site",
      "Gestione delle richieste del rider hospitality",
      "Coordinamento di catering e ristorante",
      "Allestimento di backstage e camerini",
      "Assistenza durante l'evento",
    ],
    actions_en: [
      "Event logistics and on-site coordination",
      "Management of hospitality rider requests",
      "Catering and restaurant coordination",
      "Backstage and dressing room setup",
      "On-site assistance during the event",
    ],
    gallery: [
      {
        src: "../../assets/foto/gallerie/cosmo-matinee/01.jpg",
        alt: "Un concerto all'aperto con un gruppo musicale che si esibisce su un grande palco all'interno di una corte storica, davanti a un pubblico numeroso.",
      },
      {
        src: "../../assets/foto/gallerie/cosmo-matinee/02.jpg",
        alt: "Un pubblico entusiasta con le braccia alzate assiste a un concerto all'aperto davanti a un grande palco allestito nella corte di una fortezza.",
      },
    ],
  },
];

module.exports = { SITE, PROJECTS };