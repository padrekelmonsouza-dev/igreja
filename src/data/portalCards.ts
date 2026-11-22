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
  fromEcclesia(ECCLESIA_FALLBACK[1]),
  fromEcclesia(ECCLESIA_FALLBACK[2]),
  fromEcclesia(ECCLESIA_FALLBACK[3]),
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
    first: [0, 1, 10, 11].map((index) => ecclesiaAt(news, index)),
    second: [2, 3, 4, 5].map((index) => ecclesiaAt(news, index)),
    third: [6, 7, 8, 9].map((index) => ecclesiaAt(news, index)),
  };
}
