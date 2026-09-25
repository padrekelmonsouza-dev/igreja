export type ContentCategory = {
  slug: string;
  label: string;
};

export type CatalogItem = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  category: string;
  image?: string;
  date?: string;
  author?: string;
  youtubeId?: string;
};

export const NEWS_CATEGORIES: ContentCategory[] = [
  { slug: "igreja", label: "Igreja" },
  { slug: "liturgia", label: "Liturgia" },
  { slug: "comunidades", label: "Comunidades" },
  { slug: "eventos", label: "Eventos" },
  { slug: "formacao", label: "Formação" },
  { slug: "historia", label: "História" },
  { slug: "santos", label: "Santos" },
  { slug: "cultura", label: "Cultura" },
  { slug: "musica", label: "Música" },
];

export const FORMATION_CATEGORIES: ContentCategory[] = [
  { slug: "introducao", label: "Introdução à Ortodoxia" },
  { slug: "historia", label: "História" },
  { slug: "teologia", label: "Teologia" },
  { slug: "liturgia", label: "Liturgia" },
  { slug: "espiritualidade", label: "Espiritualidade" },
  { slug: "santos", label: "Santos" },
  { slug: "icones", label: "Ícones" },
  { slug: "musica", label: "Música Bizantina" },
  { slug: "catequese", label: "Catequese" },
];

export const LIBRARY_CATEGORIES: ContentCategory[] = [
  { slug: "historia", label: "História" },
  { slug: "teologia", label: "Teologia" },
  { slug: "liturgia", label: "Liturgia" },
  { slug: "padres", label: "Santos Padres" },
  { slug: "espiritualidade", label: "Espiritualidade" },
  { slug: "catequese", label: "Catequese" },
  { slug: "documentos", label: "Documentos" },
  { slug: "santos", label: "Vida dos Santos" },
];

export const VIDEO_CATEGORIES: ContentCategory[] = [
  { slug: "liturgia", label: "Liturgia" },
  { slug: "homilias", label: "Homilias" },
  { slug: "catequese", label: "Catequese" },
  { slug: "historia", label: "História" },
  { slug: "entrevistas", label: "Entrevistas" },
  { slug: "musica", label: "Música Bizantina" },
  { slug: "eventos", label: "Eventos" },
];

/** Sem itens até a Secretaria publicar notícias oficiais. */
export const NEWS_ITEMS: CatalogItem[] = [];

/** Sem PDFs até haver material autorizado. */
export const LIBRARY_ITEMS: CatalogItem[] = [];

/** Sem IDs de YouTube até publicação oficial. */
export const VIDEO_ITEMS: CatalogItem[] = [];

/** Sem eventos datados até divulgação oficial. */
export const EVENT_ITEMS: CatalogItem[] = [];

export const FORMATION_LINKS: (CatalogItem & { category: string })[] = [
  {
    slug: "o-que-e-a-ortodoxia",
    title: "O que é a Igreja Ortodoxa?",
    summary: "Introdução à fé, à Tradição Apostólica e à vida da Igreja.",
    href: "/ortodoxia/o-que-e-a-ortodoxia",
    category: "introducao",
    image: "/media/painel-oficial.webp",
  },
  {
    slug: "primeira-visita",
    title: "Primeira visita",
    summary: "O que vestir, o que esperar e como participar com respeito.",
    href: "/primeira-visita",
    category: "introducao",
  },
  {
    slug: "jesus-cristo",
    title: "Quem é Jesus Cristo?",
    summary: "Verdadeiro Deus e verdadeiro homem: o centro da fé ortodoxa.",
    href: "/formacao/jesus-cristo",
    category: "teologia",
  },
  {
    slug: "o-que-e-a-igreja",
    title: "O que é a Igreja?",
    summary: "Una, santa, católica e apostólica: o Corpo de Cristo.",
    href: "/formacao/igreja",
    category: "teologia",
  },
  {
    slug: "historia",
    title: "História da Igreja Ortodoxa",
    summary: "Dos Apóstolos aos Concílios e à presença no Brasil.",
    href: "/igreja/nossa-historia",
    category: "historia",
  },
  {
    slug: "divina-liturgia",
    title: "Divina Liturgia",
    summary: "O coração da vida ortodoxa e o sentido de cada momento.",
    href: "/liturgia",
    category: "liturgia",
  },
  {
    slug: "sacramentos",
    title: "Os Santos Mistérios",
    summary: "Batismo, Crisma, Eucaristia e os demais Mistérios da Igreja.",
    href: "/ortodoxia/sacramentos",
    category: "liturgia",
  },
  {
    slug: "jejum-e-oracao",
    title: "Jejum e oração",
    summary: "A ascese ortodoxa: oração de Jesus, jejum e misericórdia.",
    href: "/formacao/jejum-e-oracao",
    category: "espiritualidade",
  },
  {
    slug: "oracao",
    title: "Oração de Jesus",
    summary: "A invocação do Nome de Jesus no cotidiano e na Igreja.",
    href: "/ortodoxia/oracao",
    category: "espiritualidade",
  },
  {
    slug: "santos",
    title: "Ícones e Santos",
    summary: "A nuvem de testemunhas e o sentido da veneração.",
    href: "/ortodoxia/santos",
    category: "santos",
  },
  {
    slug: "icones",
    title: "Ícones ortodoxos",
    summary: "Teologia em cor: o ícone como janela para o Reino.",
    href: "/ortodoxia/icones",
    category: "icones",
  },
  {
    slug: "theotokos",
    title: "Theotokos",
    summary: "A Santíssima Mãe de Deus na fé e na liturgia ortodoxas.",
    href: "/ortodoxia/theotokos",
    category: "santos",
  },
  {
    slug: "catequese",
    title: "Catequese",
    summary: "Caminho de iniciação para quem deseja viver na Igreja.",
    href: "/catequese",
    category: "catequese",
  },
  {
    slug: "batismo",
    title: "Batismo ortodoxo",
    summary: "Morrer e ressuscitar com Cristo: o rito e a preparação.",
    href: "/ortodoxia/batismo",
    category: "catequese",
  },
];

export const DONATION_PROJECTS = [
  {
    title: "Manutenção",
    text: "Cuidado dos templos, do mosteiro e das necessidades ordinárias da vida comunitária.",
  },
  {
    title: "Obras",
    text: "Espaço para projetos de construção ou restauro quando forem divulgados oficialmente.",
  },
  {
    title: "Evangelização",
    text: "Apoio às missões ortodoxas e à acolhida de quem chega à fé.",
  },
  {
    title: "Formação",
    text: "Catequese, materiais de estudo e vida litúrgica.",
  },
];
