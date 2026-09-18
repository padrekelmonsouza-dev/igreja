/**
 * Calendário litúrgico — apenas nomes e descrições já presentes no projeto.
 * Nenhuma data civil específica é inventada.
 */
export type LiturgicalFast = {
  name: string;
  description: string;
};

export type MajorFeast = {
  name: string;
  description: string;
};

export const LITURGICAL_NOTE =
  "A Igreja Ortodoxa Grega G.O.C. neste portal segue o calendário patrístico (velho calendário). Datas civis específicas de cada festa e os horários das celebrações devem ser confirmados com a comunidade local.";

export const MAJOR_FEASTS: MajorFeast[] = [
  {
    name: "Páscoa",
    description: "A Festa das festas. Data móvel segundo o calendário patrístico.",
  },
  {
    name: "Teofania",
    description: "A manifestação do Senhor no Jordão, no ciclo das grandes festas.",
  },
  {
    name: "Anunciação",
    description: "A Anunciação à Santíssima Theotokos.",
  },
  {
    name: "Transfiguração",
    description: "A Transfiguração do Senhor no Monte Tabor.",
  },
  {
    name: "Dormição",
    description: "A Dormição da Santíssima Mãe de Deus.",
  },
  {
    name: "Natividade",
    description: "A Natividade de Nosso Senhor Jesus Cristo.",
  },
];

export const LITURGICAL_FASTS: LiturgicalFast[] = [
  {
    name: "Grande Quaresma",
    description: "O grande jejum que prepara a Páscoa.",
  },
  {
    name: "Jejum dos Apóstolos",
    description: "Um dos grandes jejuns do ano litúrgico.",
  },
  {
    name: "Jejum da Dormição",
    description: "Jejum que prepara a festa da Dormição da Theotokos.",
  },
  {
    name: "Jejum da Natividade",
    description: "Jejum que prepara a Natividade do Senhor.",
  },
  {
    name: "Quartas e sextas-feiras",
    description: "Dias habituais de abstinência, salvo indicações do calendário e orientação do confessor.",
  },
];

export const WEEKDAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
export const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
