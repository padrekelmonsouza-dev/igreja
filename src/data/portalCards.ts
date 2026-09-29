import { ECCLESIA_FALLBACK, fetchEcclesiaNews, type EcclesiaArticle } from "../lib/ecclesiaNews";

export type PortalCard = {
  href: string;
  title: string;
  source: string;
  origin: "ecclesia" | "webnode";
  image: string;
  summary: string;
  body: string[];
};

const WEBNODE_HOME =
  "https://54576e8980.cbaul-cdnwnd.com/44c335c9e595720f23ff2fed18106871/200000026-314ad314af/700/cropped-icac.jpeg?ph=54576e8980";
const WEBNODE_SINODO =
  "https://54576e8980.cbaul-cdnwnd.com/44c335c9e595720f23ff2fed18106871/200000058-88b0888b0a/700/WhatsApp%20Image%202026-06-13%20at%2018.22.17.jpeg?ph=54576e8980";

export const WEBNODE_CARDS: PortalCard[] = [
  {
    href: "https://igreja-ortodoxa-ea4fd5.webnode.page/servicos/",
    title: "Santo Sínodo de Eugenios de Atenas",
    source: "Igreja Ortodoxa Grega G.O.C.",
    origin: "webnode",
    image: WEBNODE_SINODO,
    summary: "Autoridade suprema da Igreja Ortodoxa Grega G.O.C., sob Sua Beatitude Eugenios de Atenas.",
    body: [
      "O Santo Sínodo presidido por Sua Beatitude Eugenios de Atenas constitui a autoridade suprema da Igreja Ortodoxa Grega G.O.C., exercendo a responsabilidade de preservar a integridade da fé ortodoxa, a sucessão apostólica e a sagrada tradição recebida dos Santos Apóstolos, dos Santos Padres e dos Santos Concílios da Igreja.",
      "Firmemente enraizado na herança espiritual da Ortodoxia Grega Tradicional Velho Calendarista, o Santo Sínodo tem como missão guardar inalterado o depósito da fé, promover a vida litúrgica e sacramental da Igreja e assegurar a continuidade da autêntica tradição ortodoxa através das gerações.",
      "Entre as responsabilidades do Santo Sínodo encontram-se a consagração de bispos, a supervisão da vida eclesiástica, a proteção da disciplina canônica e a promoção da unidade entre as comunidades sob seu omóforio.",
      "“Permanecei firmes e conservai as tradições que vos foram ensinadas” (2 Ts 2,15).",
    ],
  },
  {
    href: "https://igreja-ortodoxa-ea4fd5.webnode.page/sobre-nos/",
    title: "A Igreja Ortodoxa Grega G.O.C. no Brasil",
    source: "Igreja Ortodoxa Grega G.O.C.",
    origin: "webnode",
    image: WEBNODE_HOME,
    summary: "Comunhão com o Santo Sínodo de Atenas, Tradição Apostólica e Calendário Patrístico.",
    body: [
      "Pela graça de Deus e sob a proteção de Nosso Senhor e Salvador Jesus Cristo, a Igreja Ortodoxa Grega G.O.C. no Brasil prossegue sua sagrada missão como parte integrante do Santo Sínodo presidido por Sua Beatitude Eugenios de Atenas, conservando inalterada a fé dos Santos Apóstolos, dos Santos Padres e dos Santos Concílios da Igreja Ortodoxa.",
      "A presença desta jurisdição eclesiástica em terras brasileiras teve seu início através dos labores apostólicos de Sua Eminência Dom Leontios, de bendita e eterna memória.",
      "Firmada sobre a Tradição Sagrada e sustentada pela sucessão apostólica, a Igreja permanece em plena comunhão com o Santo Sínodo de Atenas, guardando o depósito da fé e perseverando na celebração dos Santos Mistérios.",
      "Nos dias presentes, a administração e o cuidado pastoral da Igreja no Brasil encontram-se confiados ao Reverendíssimo Arquimandrita Abade Júlio, Superior Eclesiástico da missão brasileira.",
    ],
  },
];

function fromEcclesia(article: EcclesiaArticle): PortalCard {
  const text = article.text.trim();
  const body = article.body.filter((paragraph) => paragraph.trim()).length ? article.body : text ? [text] : [];
  return {
    href: article.href,
    title: article.title,
    source: "ECCLESIA NEWS",
    origin: "ecclesia",
    image: article.image,
    summary: text,
    body,
  };
}

export const PORTAL_GRID_FALLBACK: PortalCard[] = [
  fromEcclesia(ECCLESIA_FALLBACK[0]),
  WEBNODE_CARDS[0],
  fromEcclesia(ECCLESIA_FALLBACK[1]),
  WEBNODE_CARDS[1],
];

export const PORTAL_GRID_FALLBACK_SECOND: PortalCard[] = [
  fromEcclesia(ECCLESIA_FALLBACK[2]),
  fromEcclesia(ECCLESIA_FALLBACK[3]),
  fromEcclesia(ECCLESIA_FALLBACK[0]),
  fromEcclesia(ECCLESIA_FALLBACK[1]),
];

export const PORTAL_GRID_FALLBACK_THIRD: PortalCard[] = [
  fromEcclesia(ECCLESIA_FALLBACK[1]),
  fromEcclesia(ECCLESIA_FALLBACK[2]),
  fromEcclesia(ECCLESIA_FALLBACK[3]),
  fromEcclesia(ECCLESIA_FALLBACK[0]),
];

function ecclesiaAt(items: EcclesiaArticle[], index: number) {
  return fromEcclesia(items[index] || ECCLESIA_FALLBACK[index % ECCLESIA_FALLBACK.length]);
}

export async function fetchGridPortalCards(): Promise<PortalCard[]> {
  const { first } = await fetchSacramentGrids();
  return first;
}

export async function fetchSacramentGrids(): Promise<{ first: PortalCard[]; second: PortalCard[]; third: PortalCard[] }> {
  const ecclesia = await fetchEcclesiaNews();
  const news = ecclesia.length ? ecclesia : ECCLESIA_FALLBACK;
  return {
    first: [ecclesiaAt(news, 0), WEBNODE_CARDS[0], ecclesiaAt(news, 1), WEBNODE_CARDS[1]],
    second: [2, 3, 4, 5].map((index) => ecclesiaAt(news, index)),
    third: [6, 7, 8, 9].map((index) => ecclesiaAt(news, index)),
  };
}
