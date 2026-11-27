import type { NavIconName } from "../components/NavIcon";

export type MissionPath = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  image: string;
  imageClass?: string;
  body: string[];
};

export type MissionTopic = {
  slug: string;
  title: string;
  summary: string;
  icon: NavIconName;
  body: string[];
};

export const MISSION_PATHS: MissionPath[] = [
  {
    slug: "sentido",
    kicker: "Ide e fazei discípulos",
    title: "O sentido da missão",
    summary: "Anunciar Cristo, plantar comunidades e formar discípulos na Tradição.",
    image: "/media/missoes-cirilo-metodio.jpg",
    imageClass: "object-cover object-top",
    body: [
      "A missão ortodoxa anuncia Cristo, planta comunidades e forma discípulos na Tradição da Igreja.",
      "Missionar não é propaganda. É testemunho: liturgia celebrada, vida convertida, hospitalidade oferecida e doutrina transmitida com paz.",
      "A Igreja levou o Evangelho aos eslavos, aos árabes cristãos, às diásporas e, no tempo presente, ao Brasil. O mesmo envio permanece: ide e fazei discípulos, batizando e ensinando o que Cristo mandou.",
    ],
  },
  {
    slug: "brasil",
    kicker: "Brasil",
    title: "A missão no Brasil",
    summary: "Alcançar cidades sem paróquia, acompanhar famílias e apoiar a catequese.",
    image: "/media/igreja-ortodoxa-grega-no-brasil.jpg",
    imageClass: "object-cover object-center",
    body: [
      "As missões buscam alcançar cidades sem paróquia estável, acompanhar famílias isoladas e apoiar a catequese a distância quando necessário, sempre sob a bênção da hierarquia.",
      "Este portal apresenta comunidades já publicadas em Nova Iguaçu, São Paulo e Rio de Janeiro. Novos endereços oficiais serão indicados à medida que a Secretaria da Igreja os confirmar.",
      "A expansão da Igreja Ortodoxa no Brasil e na América Latina é apresentada no ministério já publicado do clero. Não se inventam aqui cidades, templos ou estatísticas que a Igreja ainda não divulgou.",
    ],
  },
  {
    slug: "comunidades",
    kicker: "Presença",
    title: "Plantar comunidades",
    summary: "Mosteiro, eparquias e o cuidado de quem ainda não tem templo próximo.",
    image: "/media/hero-iconostase.jpg",
    imageClass: "object-cover object-[center_20%]",
    body: [
      "Plantar uma comunidade é mais do que abrir um endereço. É celebrar a Divina Liturgia, formar catecúmenos, guardar a Tradição e viver a hospitalidade.",
      "O Mosteiro de São Basílio, em Nova Iguaçu, é casa de oração e hospitalidade. A Eparquia de São Paulo e a Eparquia do Rio de Janeiro acompanham o povo já reunido.",
      "Onde ainda não há paróquia estável, a missão visita, reza e espera a hora de constituir vida eclesial plena, sempre em comunhão com o bispo e o Santo Sínodo.",
    ],
  },
  {
    slug: "ajudar",
    kicker: "Colabore",
    title: "Como ajudar",
    summary: "Ore, participe, compartilhe a formação e fale com o sacerdote.",
    image: "/media/missoes-apostolos.jpg",
    imageClass: "object-cover object-[center_22%]",
    body: [
      "Ore, participe, compartilhe os conteúdos de formação e fale com o sacerdote sobre necessidades concretas das comunidades.",
      "A missão se sustenta na liturgia, na caridade e no testemunho silencioso. Quem não pode ir a outra cidade ainda pode rezar, acolher o visitante e apoiar a manutenção da Igreja.",
      "Pedidos de oração, catequese e vocação encontram caminho nas páginas deste portal e, sobretudo, no diálogo com o clero local.",
    ],
  },
];

export const MISSION_TOPICS: MissionTopic[] = [
  {
    slug: "testemunho",
    title: "Testemunho",
    summary: "Liturgia celebrada, vida convertida e doutrina transmitida com paz.",
    icon: "cross",
    body: [
      "Missionar não é propaganda. É testemunho: liturgia celebrada, vida convertida, hospitalidade oferecida e doutrina transmitida com paz.",
      "O visitante reconhece a Igreja quando encontra beleza, verdade e acolhida. Por isso a missão começa no templo e no lar, não apenas em campanhas.",
    ],
  },
  {
    slug: "cidades",
    title: "Cidades sem paróquia",
    summary: "Alcançar quem ainda não tem comunidade estável por perto.",
    icon: "parish",
    body: [
      "As missões buscam alcançar cidades sem paróquia estável e acompanhar famílias isoladas, sempre sob a bênção da hierarquia.",
      "Quem vive longe de um templo publicado pode escrever, pedir oração e iniciar a catequese a distância, até que a Igreja local indique o caminho presencial.",
    ],
  },
  {
    slug: "catequese-missao",
    title: "Catequese missionária",
    summary: "Formar discípulos onde a Igreja ainda está chegando.",
    icon: "catechesis",
    body: [
      "A catequese a distância apoia quem ainda não tem paróquia próxima. O portal oferece os primeiros passos; o sacerdote completa o acompanhamento.",
      "Sem catequese, a missão vira curiosidade. Com catequese, ela se torna iniciação: oração, doutrina, liturgia e pertencimento.",
    ],
  },
  {
    slug: "comunidades-brasil",
    title: "Comunidades no Brasil",
    summary: "Nova Iguaçu, São Paulo e Rio de Janeiro, com os dados já publicados.",
    icon: "church",
    body: [
      "O Mosteiro de São Basílio, em Nova Iguaçu, pede contato prévio. A Eparquia de São Paulo celebra com Padre Kelmon. A Eparquia do Rio de Janeiro é acompanhada por Padre João Damasceno.",
      "Endereços, telefones e horários só entram neste portal quando oficiais. O que ainda falta será publicado pela Secretaria da Igreja.",
    ],
  },
  {
    slug: "vocacao",
    title: "Vocação missionária",
    summary: "Levar o Evangelho a quem ainda não encontrou a Igreja.",
    icon: "mission",
    body: [
      "Há quem seja chamado a ir: celebrar, catequizar, visitar e permanecer. Há quem seja chamado a enviar: orar, sustentar e acolher.",
      "A Pastoral Vocacional deste portal escuta quem pensa em servir como missionário ortodoxo, monge ou padre. Não é preciso ter todas as respostas. A Igreja discerne.",
    ],
  },
  {
    slug: "orar-sustentar",
    title: "Orar e sustentar",
    summary: "A missão se mantém pela oração, pela caridade e pelo testemunho.",
    icon: "prayer",
    body: [
      "Ore pelas comunidades, pelos sacerdotes e por quem ainda não ouviu a fé ortodoxa em português.",
      "Participe da liturgia, compartilhe a formação e fale com o sacerdote sobre necessidades concretas. O apoio institucional tem espaço na página de doações, com dados oficiais quando publicados.",
    ],
  },
];
