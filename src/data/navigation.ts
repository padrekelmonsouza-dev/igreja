export type NavLink = {
  href: string;
  label: string;
  icon?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  href: string;
  icon: string;
  children?: NavLink[];
};

export const MAIN_NAV: NavGroup[] = [
  { id: "inicio", label: "Início", href: "/", icon: "home" },
  {
    id: "igreja",
    label: "Igreja",
    href: "/igreja",
    icon: "church",
    children: [
      { href: "/igreja/arcebispos", label: "Arcebispos", icon: "bishop" },
      { href: "/mosteiro", label: "Mosteiros", icon: "monastery" },
      { href: "/paroquias", label: "Paróquias", icon: "parish" },
      { href: "/pastorais", label: "Pastorais", icon: "pastoral" },
      { href: "/ordem-de-sao-jose", label: "Ordem de São José", icon: "joseph" },
    ],
  },
  { id: "clero", label: "Clero", href: "/clero", icon: "clergy" },
  { id: "liturgia", label: "Liturgia", href: "/liturgia", icon: "liturgy" },
  { id: "catequese", label: "Catequese", href: "/catequese", icon: "catechesis" },
  { id: "missoes", label: "Missões", href: "/missoes", icon: "mission" },
];

export const SUPPORT_LINK: NavLink = { href: "/doacoes", label: "Apoie a Igreja" };
export const FIND_CHURCH_LINK: NavLink = { href: "/paroquias", label: "Encontre uma Igreja" };
export const START_HERE_LINK: NavLink = { href: "/primeira-visita", label: "Comece aqui" };

export const FOOTER_INSTITUTIONAL: NavLink[] = [
  { href: "/igreja/arcebispos", label: "Arcebispos" },
  { href: "/mosteiro", label: "Mosteiros" },
  { href: "/paroquias", label: "Paróquias" },
  { href: "/pastorais", label: "Pastorais" },
  { href: "/ordem-de-sao-jose", label: "Ordem de São José" },
  { href: "/pedido-de-oracao", label: "Pedidos de oração" },
];

export const FOOTER_LEARN: NavLink[] = [
  { href: "/clero", label: "Clero" },
  { href: "/liturgia", label: "Liturgia" },
  { href: "/catequese", label: "Catequese" },
  { href: "/missoes", label: "Missões" },
  { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
  { href: "/glossario", label: "Glossário" },
];

export const FOOTER_LEGAL: NavLink[] = [
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/termos-de-uso", label: "Termos de uso" },
  { href: "/contato", label: "Contato" },
  { href: "/doacoes", label: "Apoie a Igreja" },
];

export const DESKTOP_NAV_IDS = ["inicio", "igreja", "clero", "liturgia", "catequese", "missoes"] as const;
