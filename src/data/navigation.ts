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
  { id: "quem-somos", label: "Quem Somos", href: "/igreja/quem-somos", icon: "church" },
  { id: "igreja", label: "Igreja", href: "/igreja", icon: "church" },
  { id: "arcebispos", label: "Arcebispos", href: "/arcebispos", icon: "bishop" },
  { id: "clero", label: "Clero", href: "/clero", icon: "clergy" },
  { id: "mosteiros", label: "Mosteiros", href: "/mosteiro", icon: "monastery" },
  { id: "paroquias", label: "Paróquias", href: "/paroquias", icon: "parish" },
  { id: "sacramentos", label: "Sacramentos", href: "/sacramentos", icon: "liturgy" },
  { id: "pastorais", label: "Pastorais", href: "/pastorais", icon: "pastoral" },
  { id: "ordem-de-sao-jose", label: "Ordem de São José", href: "/ordem-de-sao-jose", icon: "joseph" },
  { id: "liturgia", label: "Liturgia", href: "/liturgia", icon: "liturgy" },
  { id: "catequese", label: "Catequese", href: "/catequese", icon: "catechesis" },
  { id: "missoes", label: "Missões", href: "/missoes", icon: "mission" },
];

export const SUPPORT_LINK: NavLink = { href: "/doacoes", label: "Apoie a Igreja" };
export const FIND_CHURCH_LINK: NavLink = { href: "/paroquias", label: "Encontre uma Igreja" };
export const START_HERE_LINK: NavLink = { href: "/primeira-visita", label: "Comece aqui" };

export const FOOTER_INSTITUTIONAL: NavLink[] = [
  { href: "/arcebispos", label: "Arcebispos" },
  { href: "/mosteiro", label: "Mosteiros" },
  { href: "/paroquias", label: "Paróquias" },
  { href: "/sacramentos", label: "Sacramentos" },
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
];
