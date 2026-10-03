export type ProductCategory = "livros" | "oracao";

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  badge?: string;
  image: string;
  /** Preço em reais. Sem preço, o valor é combinado no atendimento. */
  price?: number;
  summary: string;
  description: string[];
  details: { label: string; value: string }[];
};

export const STORE_CATEGORIES: { id: ProductCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "livros", label: "Livros" },
  { id: "oracao", label: "Oração" },
];

/** Número que recebe os pedidos da loja pelo WhatsApp (só dígitos, com DDI). */
export const STORE_WHATSAPP = "5511917202110";

export const PRODUCTS: Product[] = [
  {
    slug: "respeita-o-padre",
    name: "Respeita o Padre",
    subtitle: "O ‘fazer política’ no sentido verdadeiro",
    category: "livros",
    badge: "Lançamento",
    image: "/media/loja/respeita-o-padre.jpg",
    summary: "O novo livro do Padre Kelmon sobre o Cristocentrismo Político: Cristo no centro da vida pública.",
    description: [
      "Em Respeita o Padre, o Padre Kelmon apresenta o Cristocentrismo Político: a convicção de que a política só reencontra a sua verdadeira natureza, que é servir o povo, quando Cristo está no centro.",
      "Um livro para quem deseja viver a fé também nas decisões que afetam a sociedade, com a firmeza do Evangelho e a caridade dos Santos Padres.",
    ],
    details: [
      { label: "Autor", value: "Padre Kelmon" },
      { label: "Tema", value: "Cristocentrismo Político" },
      { label: "Formato", value: "Livro impresso" },
    ],
  },
  {
    slug: "fe-e-politica-de-maos-dadas",
    name: "Fé e Política de mãos dadas",
    subtitle: "Breves e essenciais orientações para o Jovem Político",
    category: "livros",
    badge: "Mais procurado",
    image: "/media/loja/fe-e-politica.jpg",
    summary: "Orientações do Padre Kelmon para jovens que querem servir o Brasil com fé e responsabilidade.",
    description: [
      "Fé e Política de mãos dadas reúne breves e essenciais orientações para o jovem que sente o chamado à vida pública: caráter, serviço, verdade e compromisso com o bem comum.",
      "Fruto da Pastoral Política, o livro ajuda a unir aquilo que muitos separam: a vida de oração e a responsabilidade com o país.",
    ],
    details: [
      { label: "Autor", value: "Padre Kelmon" },
      { label: "Editora", value: "DDM Editora" },
      { label: "Formato", value: "Livro impresso" },
    ],
  },
  {
    slug: "komboskini",
    name: "Komboskini",
    subtitle: "Corda de oração ortodoxa",
    category: "oracao",
    badge: "Feito à mão",
    image: "/media/loja/komboskini.jpg",
    summary: "A corda de nós dos monges ortodoxos, para rezar a Oração de Jesus ao longo do dia.",
    description: [
      "O komboskini é a corda de oração da tradição ortodoxa. Cada nó é trançado em forma de pequenas cruzes e acompanha uma invocação da Oração de Jesus: «Senhor Jesus Cristo, Filho de Deus, tem piedade de mim, pecador».",
      "Nasceu entre os monges do deserto e do Monte Athos e hoje acompanha fiéis do mundo inteiro: no bolso, no pulso ou entre os dedos, é um lembrete de rezar sem cessar (1Ts 5,17).",
    ],
    details: [
      { label: "Marca", value: "Komboskini Brasil (@komboskinibr)" },
      { label: "Acabamento", value: "Nós trançados, cruz e borla" },
      { label: "Acompanha", value: "Cartão com a Oração de Jesus" },
    ],
  },
];

export function formatPrice(price?: number) {
  if (price === undefined) return "Valor sob consulta";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProduct(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
