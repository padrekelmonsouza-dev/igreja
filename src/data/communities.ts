import { SITE_CONTACT } from "./site";

export type Community = {
  slug: string;
  name: string;
  city: string;
  state: string;
  stateName: string;
  address?: string;
  cep?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  clergy?: string;
  clergyHref?: string;
  patron?: string;
  scheduleNote?: string;
  photos?: string[];
  mapsQuery?: string;
  href: string;
  summary: string;
  pendingOfficial?: string[];
};

export const COMMUNITIES: Community[] = [
  {
    slug: "nova-iguacu",
    name: "Mosteiro de São Basílio",
    city: "Nova Iguaçu",
    state: "RJ",
    stateName: "Rio de Janeiro",
    address: SITE_CONTACT.monasteryAddress,
    cep: "26295-045",
    phone: SITE_CONTACT.monasteryPhone,
    whatsapp: SITE_CONTACT.monasteryWhatsapp,
    clergy: "Arquimandrita Abade Júlio",
    clergyHref: "/igreja/hierarquia/abade-julio",
    patron: "São Basílio",
    scheduleNote:
      "Horários de celebração e normas de visita podem variar segundo o calendário litúrgico. Recomenda-se contato prévio antes da primeira visita.",
    photos: ["/media/hero-proto.webp"],
    mapsQuery: SITE_CONTACT.monasteryAddress,
    href: "/comunidades/nova-iguacu",
    summary: "Casa de vida monástica, oração e hospitalidade em Marapicu, Nova Iguaçu.",
  },
  {
    slug: "sao-paulo",
    name: "Eparquia de São Paulo",
    city: "São Paulo",
    state: "SP",
    stateName: "São Paulo",
    address: "Rua Oscar Bressane, 311 - Bosque da Saúde, São Paulo - SP",
    clergy: "Padre Kelmon Luís",
    clergyHref: "/igreja/hierarquia/padre-kelmon-luis",
    scheduleNote: "Divina Liturgia diária às 9h. Aos domingos, às 10h.",
    mapsQuery: "Rua Oscar Bressane, 311 - Bosque da Saúde, São Paulo - SP",
    href: "/comunidades/sao-paulo",
    summary: "Núcleo pastoral da Eparquia de São Paulo.",
    pendingOfficial: ["telefone", "e-mail", "fotos do templo"],
  },
  {
    slug: "rio-de-janeiro",
    name: "Eparquia do Rio de Janeiro",
    city: "Rio de Janeiro",
    state: "RJ",
    stateName: "Rio de Janeiro",
    clergy: "Padre João Damasceno",
    clergyHref: "/igreja/hierarquia/padre-joao-damasceno",
    href: "/comunidades/rio-de-janeiro",
    summary: "Núcleo pastoral da Eparquia do Rio de Janeiro.",
    pendingOfficial: [
      "endereço litúrgico",
      "telefone",
      "e-mail",
      "horários da Divina Liturgia",
      "fotos do templo",
    ],
  },
];

export function getCommunity(slug: string) {
  return COMMUNITIES.find((item) => item.slug === slug);
}

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}

export function whatsappUrl(phone: string, message?: string) {
  const text = message ? `&text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${phone}${text}`;
}
