export type NavLink = {
  href: string;
  label: string;
};

export type NavGroup = {
  id: string;
  label: string;
  href: string;
  children?: NavLink[];
};

export const MAIN_NAV: NavGroup[] = [
  { id: "inicio", label: "Início", href: "/" },
  {
    id: "igreja",
    label: "A Igreja",
    href: "/igreja",
    children: [
      { href: "/igreja/quem-somos", label: "Quem Somos" },
      { href: "/igreja/nossa-historia", label: "Nossa História" },
      { href: "/igreja/nossa-fe", label: "Nossa Fé" },
      { href: "/igreja/hierarquia", label: "Hierarquia" },
      { href: "/igreja/sucessao-apostolica", label: "Sucessão Apostólica" },
    ],
  },
  {
    id: "ortodoxia",
    label: "Ortodoxia",
    href: "/ortodoxia",
    children: [
      { href: "/ortodoxia/o-que-e-a-ortodoxia", label: "O que é a Ortodoxia?" },
      { href: "/ortodoxia/divina-liturgia", label: "Divina Liturgia" },
      { href: "/ortodoxia/icones", label: "Ícones" },
      { href: "/ortodoxia/sacramentos", label: "Sacramentos / Mistérios" },
      { href: "/ortodoxia/santos", label: "Santos" },
      { href: "/ortodoxia/jejum", label: "Jejum" },
      { href: "/ortodoxia/oracao", label: "Oração" },
    ],
  },
  {
    id: "comunidades",
    label: "Comunidades",
    href: "/comunidades",
    children: [
      { href: "/comunidades", label: "Encontrar uma Igreja" },
      { href: "/comunidades/nova-iguacu", label: "Nova Iguaçu" },
      { href: "/comunidades/sao-paulo", label: "São Paulo" },
      { href: "/comunidades/rio-de-janeiro", label: "Rio de Janeiro" },
    ],
  },
  { id: "calendario", label: "Calendário", href: "/calendario" },
  { id: "noticias", label: "Notícias", href: "/noticias" },
  { id: "formacao", label: "Formação", href: "/formacao" },
  { id: "biblioteca", label: "Biblioteca", href: "/biblioteca" },
  { id: "videos", label: "Vídeos", href: "/videos" },
  { id: "eventos", label: "Eventos", href: "/eventos" },
  { id: "contato", label: "Contato", href: "/contato" },
];

export const SUPPORT_LINK: NavLink = { href: "/doacoes", label: "Apoie a Igreja" };
export const FIND_CHURCH_LINK: NavLink = { href: "/comunidades", label: "Encontre uma Igreja" };
export const START_HERE_LINK: NavLink = { href: "/primeira-visita", label: "Comece aqui" };

export const FOOTER_INSTITUTIONAL: NavLink[] = [
  { href: "/igreja/quem-somos", label: "Quem Somos" },
  { href: "/igreja/nossa-historia", label: "Nossa História" },
  { href: "/igreja/hierarquia", label: "Hierarquia" },
  { href: "/santo-sinodo", label: "Santo Sínodo" },
  { href: "/mosteiro", label: "Mosteiro de São Basílio" },
  { href: "/pedido-de-oracao", label: "Pedidos de oração" },
];

export const FOOTER_LEARN: NavLink[] = [
  { href: "/ortodoxia/o-que-e-a-ortodoxia", label: "O que é a Ortodoxia?" },
  { href: "/primeira-visita", label: "Primeira visita" },
  { href: "/formacao", label: "Formação" },
  { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
  { href: "/glossario", label: "Glossário" },
  { href: "/enciclopedia", label: "Enciclopédia" },
];

export const FOOTER_LEGAL: NavLink[] = [
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/termos-de-uso", label: "Termos de uso" },
  { href: "/contato", label: "Contato" },
  { href: "/doacoes", label: "Apoie a Igreja" },
];

export const DESKTOP_NAV_IDS = [
  "inicio",
  "igreja",
  "ortodoxia",
  "comunidades",
  "calendario",
  "noticias",
  "formacao",
  "contato",
] as const;
