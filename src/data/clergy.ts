export type ClergyCategory = "arcebispo" | "presbitero" | "sacerdote-monge" | "sacerdote-casado" | "monastico" | "seminarista";

export type ClergyProfile = {
  slug: string;
  name: string;
  role: string;
  category: ClergyCategory;
  image: string;
  gallery?: string[];
  summary: string;
  facts: { label: string; value: string }[];
  sections: { title: string; body: string[] }[];
  timeline?: TimelineEra[];
};

export type TimelineEra = {
  period: string;
  title: string;
  text: string;
  photos: string[];
};

function kelmonPhotos(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => `/media/kelmon/historia-${String(from + i).padStart(3, "0")}.jpg`);
}

export const CLERGY: ClergyProfile[] = [
  {
    slug: "padre-kelmon-luis",
    name: "Padre Kelmon Luís",
    role: "Eparquia de São Paulo · SP",
    category: "presbitero",
    image: "/media/padre-kelmon-luis.jpg",
    summary: "Presbítero da Eparquia de São Paulo. Nasceu em Salvador, na Bahia, em 1976.",
    facts: [
      { label: "Nascimento", value: "21/10/1976" },
      { label: "Ordenação", value: "02/08/2015" },
      { label: "Eparquia", value: "São Paulo / SP" },
    ],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre Kelmon nasceu em Salvador, na Bahia, em 21 de outubro de 1976. Foi ordenado em 2 de agosto de 2015 e serve na Eparquia de São Paulo. Há mais de 30 anos vive a fé no dia a dia: formação, pastoral e o debate público.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Começou na juventude, na Legião de Maria. Depois estudou Filosofia, Teologia e Pedagogia e atuou em missões e ações humanitárias. Seu ministério presbiteral inclui a celebração da Divina Liturgia, a catequese e o acompanhamento dos fiéis na eparquia paulista.",
          "Fundou a Pastoral Política, difundindo que o Cristocentrismo é a política que se deve praticar a fim de resgatar a natureza da política, que é servir o povo verdadeiramente. Fundou o Foro do Brasil a fim de preparar novos políticos com visão e prática cristocêntrica.",
          "É responsável pela Pastoral Política no Brasil e pela implantação do Foro do Brasil em toda a América Latina. Organiza a Pastoral da Juventude Ortodoxa do Brasil e a expansão da Igreja Ortodoxa no Brasil e em toda a América Latina. É professor e formador responsável pela Pastoral do Encontro.",
        ],
      },
      {
        title: "Homilias, catequese e publicações",
        body: [
          "Homilias, catequeses, vídeos e textos serão reunidos nesta página conforme a Secretaria e o próprio presbítero os disponibilizarem.",
        ],
      },
    ],
    timeline: [
      {
        period: "Anos 1970 e 1980",
        title: "Infância em Salvador",
        text: "Os primeiros anos em família, a escola e a Primeira Comunhão.",
        photos: kelmonPhotos(1, 9),
      },
      {
        period: "Juventude",
        title: "Os primeiros passos na fé",
        text: "A juventude vivida na Igreja, com os grupos e os amigos que despertaram a vocação.",
        photos: kelmonPhotos(10, 13),
      },
      {
        period: "Formação",
        title: "Seminário e estudos",
        text: "Os anos de seminário, a vida em comunidade com os colegas de turma e a formação em Filosofia e Teologia.",
        photos: kelmonPhotos(14, 30),
      },
      {
        period: "Caminhada",
        title: "Igreja, encontros e defesa da vida",
        text: "Encontros com pastores e irmãos na fé, a liturgia oriental e o engajamento na defesa da vida.",
        photos: kelmonPhotos(31, 43),
      },
      {
        period: "2015",
        title: "Ordenação e vida sinodal",
        text: "Encontros com os bispos e a ordenação presbiteral, em 2 de agosto de 2015.",
        photos: kelmonPhotos(44, 55),
      },
      {
        period: "Missões",
        title: "Construindo comunidades",
        text: "A construção de igrejas, as primeiras liturgias à luz de velas e a catequese com as crianças.",
        photos: kelmonPhotos(56, 66),
      },
      {
        period: "Bahia",
        title: "Missão junto ao povo",
        text: "O trabalho com as comunidades ribeirinhas e da ilha: mutirões, visitas, encontros, liturgias e o cuidado com as famílias.",
        photos: kelmonPhotos(67, 96),
      },
      {
        period: "Hoje",
        title: "Vida pública",
        text: "Encontros e diálogos na vida pública do Brasil.",
        photos: [...kelmonPhotos(97, 100), ...kelmonPhotos(108, 118)],
      },
      {
        period: "Publicação",
        title: "Meu livro",
        text: "Fé e Política de mãos dadas: breves e essenciais orientações para o jovem político. Momentos de lançamento e divulgação do livro.",
        photos: kelmonPhotos(101, 107),
      },
    ],
  },
  {
    slug: "padre-jose-sergio-da-silva",
    name: "Padre José Sérgio da Silva",
    role: "Padre",
    category: "presbitero",
    image: "/media/padre-jose-sergio.jpg",
    gallery: ["/media/padre-jose-sergio.png"],
    summary: "Padre da Missão Theotokos.",
    facts: [
      { label: "Nascimento", value: "22/10/1970" },
      { label: "Ordenação", value: "21/11/2016" },
    ],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre José Sérgio da Silva nasceu em 22 de outubro de 1970 e foi ordenado em 21 de novembro de 2016.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Dados de eparquia, comunidade e demais registros pastorais serão publicados nesta página quando oficiais.",
        ],
      },
    ],
  },
  {
    slug: "padre-riuler-silva-de-jesus",
    name: "Padre Riuler Silva de Jesus",
    role: "Padre",
    category: "presbitero",
    image: "/media/padre-riuler-silva-de-jesus.jpg",
    summary: "Padre da Missão Theotokos.",
    facts: [
      { label: "Nascimento", value: "17/03/1965" },
      { label: "Ordenação", value: "2000" },
    ],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre Riuler Silva de Jesus nasceu em 17 de março de 1965 e foi ordenado no ano 2000.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Dados de eparquia, comunidade e demais registros pastorais serão publicados nesta página quando oficiais.",
        ],
      },
    ],
  },
  {
    slug: "padre-aquila",
    name: "Padre Aquila Peroba",
    role: "Padre Diretor Vocacional",
    category: "presbitero",
    image: "/media/padre-aquila.jpg",
    summary: "Padre Diretor Vocacional da Missão Theotokos.",
    facts: [{ label: "Ministério", value: "Diretor Vocacional" }],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre Aquila Peroba é Padre Diretor Vocacional da Missão Theotokos.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Dados de nascimento, ordenação, eparquia e demais registros pastorais serão publicados nesta página quando oficiais.",
        ],
      },
    ],
  },
  {
    slug: "padre-pedro",
    name: "Padre Pedro",
    role: "Padre",
    category: "presbitero",
    image: "/media/padre-pedro.jpg",
    summary: "Padre da Missão Theotokos.",
    facts: [
      { label: "Nascimento", value: "28/05/1971" },
      { label: "Ordenação", value: "05/09/2022" },
    ],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre Pedro nasceu em 28 de maio de 1971 e foi ordenado em 5 de setembro de 2022.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Dados de eparquia, comunidade e demais registros pastorais serão publicados nesta página quando oficiais.",
        ],
      },
    ],
  },
  {
    slug: "padre-fausto",
    name: "Padre Fausto Wilmo Báez Soxo",
    role: "Vicaria Pastoral · República do Equador",
    category: "presbitero",
    image: "/media/padre-fausto.jpg",
    summary:
      "Sacerdote Dr. Fausto Wilmo Báez Soxo, Vicaria Pastoral na República do Equador, habilitado para o exercício do ministério sacerdotal.",
    facts: [
      { label: "Ministério", value: "Vicaria Pastoral" },
      { label: "País", value: "República do Equador" },
      { label: "Registro", value: "Ecuador 0011-2026" },
      { label: "Nascimento", value: "08/06/1967" },
      { label: "Natural", value: "Guayaquil, Equador" },
      { label: "Ordenação", value: "02/02/2025" },
    ],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre Dr. Fausto Wilmo Báez Soxo nasceu em 8 de junho de 1967, na cidade de Guayaquil, Equador. Foi ordenado em 2 de fevereiro de 2025.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Serve na Vicaria Pastoral da República do Equador e está habilitado para o exercício do ministério sacerdotal. Também é apresentado como Presidente da Federação Internacional de Advogados Ortodoxos, sede Equador.",
        ],
      },
      {
        title: "Documento pastoral",
        body: [
          "O documento de identificação pastoral apresentado registra o sacerdote Dr. Fausto Wilmo Báez Soxo — primeiro apelido Báez, segundo apelido Soxo — na Vicaria Pastoral da República do Equador, com registro internacional Ecuador 0011-2026, habilitado para o exercício do ministério sacerdotal.",
          "O mesmo documento indica a Arquidiocese Metropolitana da América, a Igreja Católica Apostólica Ortodoxa do Peru, o Internationalen Bischofs Conclave (IBC) e o Colégio Episcopal Peruano / Latino-americano.",
        ],
      },
    ],
  },
  {
    slug: "jose-augusto-maciel-torres",
    name: "José Augusto Maciel Torres",
    role: "Sacerdote Casado",
    category: "sacerdote-casado",
    image: "/media/jose-augusto-maciel-torres.jpg",
    summary: "Sacerdote casado incardinado na Eparquia de São Paulo.",
    facts: [
      { label: "Nascimento", value: "20/02/1964" },
      { label: "Ordenação", value: "20/01/2010" },
      { label: "Incardinado", value: "Eparquia de São Paulo" },
    ],
    sections: [
      {
        title: "Perfil",
        body: [
          "José Augusto Maciel Torres nasceu em 20 de fevereiro de 1964. É sacerdote casado, incardinado na Eparquia de São Paulo. Foi ordenado em 20 de janeiro de 2010.",
        ],
      },
    ],
  },
  {
    slug: "crispim-souza-silva",
    name: "Crispim Souza Silva",
    role: "Seminarista",
    category: "seminarista",
    image: "/media/crispim-souza-silva.jpg",
    summary: "Seminarista da Missão Theotokos.",
    facts: [{ label: "Nascimento", value: "01/10/1977" }],
    sections: [
      {
        title: "Formação",
        body: [
          "Crispim Souza Silva nasceu em 1º de outubro de 1977. É seminarista da Missão Theotokos.",
        ],
      },
    ],
  },
  {
    slug: "max-yuri-fae-silva",
    name: "Max Yuri Faé Silva",
    role: "Seminarista",
    category: "seminarista",
    image: "/media/max-yuri-fae-silva.jpg",
    summary: "Seminarista da Missão Theotokos.",
    facts: [{ label: "Nascimento", value: "21/02/1984" }],
    sections: [
      {
        title: "Formação",
        body: [
          "Max Yuri Faé Silva nasceu em 21 de fevereiro de 1984. É seminarista da Missão Theotokos.",
        ],
      },
    ],
  },
  {
    slug: "mateus-alves-de-oliveira",
    name: "Mateus Alves de Oliveira",
    role: "Seminarista",
    category: "seminarista",
    image: "/media/mateus-alves-de-oliveira.jpg",
    summary: "Seminarista da Missão Theotokos, no Rio de Janeiro.",
    facts: [
      { label: "Nascimento", value: "22/01/2008" },
      { label: "Cidade", value: "Rio de Janeiro" },
    ],
    sections: [
      {
        title: "Formação",
        body: [
          "Mateus Alves de Oliveira nasceu em 22 de janeiro de 2008. É seminarista da Missão Theotokos, no Rio de Janeiro.",
        ],
      },
    ],
  },
  {
    slug: "andradiano",
    name: "Andradiano",
    role: "Seminarista",
    category: "seminarista",
    image: "/media/andradiano.jpg",
    summary: "Seminarista da Missão Theotokos, natural de Angola.",
    facts: [{ label: "Origem", value: "Angola (África)" }],
    sections: [
      {
        title: "Formação",
        body: ["Andradiano é natural de Angola, na África. É seminarista da Missão Theotokos."],
      },
    ],
  },
  {
    slug: "zinho-joao-uiquissone",
    name: "Zinho João Uiquissone",
    role: "Seminarista",
    category: "seminarista",
    image: "/media/zinho-joao-uiquissone.jpg",
    summary: "Seminarista da Missão Theotokos, natural de Namarroi, na Zambézia, Moçambique.",
    facts: [
      { label: "Nascimento", value: "01/08/1995" },
      { label: "Naturalidade", value: "Namarroi, Zambézia" },
      { label: "País", value: "Moçambique" },
    ],
    sections: [
      {
        title: "Formação",
        body: [
          "Zinho João Uiquissone nasceu em 1º de agosto de 1995, no distrito de Namarroi, província da Zambézia, em Moçambique. É seminarista da Missão Theotokos",
        ],
      },
    ],
  },
];

const CLERGY_ALIASES: Record<string, string> = {
  "padre-francisco-angel-e-moran-vida": "padre-fausto",
};

export function getClergy(slug: string) {
  const canonical = CLERGY_ALIASES[slug] || slug;
  return CLERGY.find((person) => person.slug === canonical);
}

export function clergyByCategory(category: ClergyCategory) {
  return CLERGY.filter((person) => person.category === category);
}

export const ARCHBISHOPS = clergyByCategory("arcebispo");

export function isArchbishop(slug: string) {
  return ARCHBISHOPS.some((person) => person.slug === slug);
}

export const PARISHES = [
  {
    estado: "SP",
    cidade: "São Paulo",
    comunidade: "Eparquia de São Paulo",
    sacerdote: "Padre Kelmon Luís",
    contato: "Ver perfil do clero",
    href: "/igreja/hierarquia/padre-kelmon-luis",
  },
  {
    estado: "RJ",
    cidade: "Rio de Janeiro",
    comunidade: "Eparquia do Rio de Janeiro",
    sacerdote: "A confirmar",
    contato: "Ver perfil do clero",
    href: "/comunidades/rio-de-janeiro",
  },
];
