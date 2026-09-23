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
};

export const CLERGY: ClergyProfile[] = [
  {
    slug: "dom-eugenios-de-atenas",
    name: "Dom Eugenios de Atenas",
    role: "Santo Sínodo",
    category: "arcebispo",
    image: "/media/card-dom-eugenios.jpg",
    summary:
      "O Santo Sínodo presidido por Sua Beatitude Eugenios de Atenas constitui a autoridade suprema da Igreja Ortodoxa Grega G.O.C.",
    facts: [
      { label: "Ministério", value: "Primazia sinodal" },
      { label: "Sede", value: "Atenas" },
      { label: "Referência", value: "Santo Sínodo de Eugenio de Atenas" },
    ],
    sections: [
      {
        title: "Perfil",
        body: [
          "O Santo Sínodo presidido por Sua Beatitude Eugenios de Atenas constitui a autoridade suprema da Igreja Ortodoxa Grega G.O.C., exercendo a responsabilidade de preservar a integridade da fé ortodoxa, a sucessão apostólica e a sagrada tradição recebida dos Santos Apóstolos, dos Santos Padres e dos Santos Concílios da Igreja.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Cabe ao primaz convocar, presidir e confirmar a vida sinodal, guardar os cânones e pastorear com os irmãos no episcopado. A Igreja no Brasil se apresenta em referência a este sínodo.",
        ],
      },
      {
        title: "Comunicados",
        body: [
          "Documentos, cartas e orientações oficiais serão publicados na página do Santo Sínodo e nesta biografia à medida que forem disponibilizados.",
        ],
      },
    ],
  },
  {
    slug: "dom-leontios",
    name: "Dom Leontios de Noronha e Valdigem",
    role: "Arcebispo Metropolita da América do Sul",
    category: "arcebispo",
    image: "/media/card-dom-leontios.jpg",
    summary:
      "De bendita e eterna memória, Sua Eminência Dom Leontios ocupou lugar de destaque na história da Ortodoxia Tradicional no Brasil.",
    facts: [
      { label: "Título", value: "Arcebispo Metropolita da América do Sul" },
      { label: "Atuação", value: "América do Sul e Brasil" },
      { label: "Página", value: "Hierarquia e memória pastoral" },
    ],
    sections: [
      {
        title: "Perfil histórico e pastoral",
        body: [
          "De bendita e eterna memória, Sua Eminência Dom Leontios ocupou lugar de destaque na história da Ortodoxia Tradicional no Brasil. Como Arcebispo Metropolita da América do Sul, dedicou sua vida ao serviço da Santa Igreja, ao anúncio do Santo Evangelho e à preservação da fé ortodoxa recebida dos Santos Apóstolos e transmitida ao longo dos séculos pelos Santos Padres.",
        ],
      },
      {
        title: "Atuação na América do Sul",
        body: [
          "O cuidado metropolitano abrange o acompanhamento das comunidades, a ordenação e a orientação do clero, a fundação de missões e a guarda da tradição litúrgica em terras sul-americanas.",
        ],
      },
      {
        title: "Legado no Brasil",
        body: [
          "O portal reserva a esta página o relato de visitas, fundações, homilias e registros históricos. A distinção entre memória editorial e documento oficial será sempre observada.",
        ],
      },
    ],
  },
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
          "Fundou a Pastoral Política, difundindo que o Cristocentrismo é a política que se deve praticar a fim de resgatar a natureza da política, que é servir o povo verdadeiramente. Fundou o Foro do Brasil a fim de preparar novos políticos com visão e prática cristocêntrica. Dedica-se à expansão da Igreja Ortodoxa no Brasil e na América Latina.",
        ],
      },
      {
        title: "Homilias, catequese e publicações",
        body: [
          "Homilias, catequeses, vídeos e textos serão reunidos nesta página conforme a Secretaria e o próprio presbítero os disponibilizarem.",
        ],
      },
    ],
  },
  {
    slug: "padre-joao-damasceno",
    name: "Padre João Damasceno",
    role: "Eparquia do Rio de Janeiro",
    category: "presbitero",
    image: "/media/padre-joao-damasceno.jpg",
    summary: "Presbítero da Eparquia do Rio de Janeiro.",
    facts: [
      { label: "Nome civil", value: "Lucas Soares Chagas" },
      { label: "Nascimento", value: "25/07/1992" },
      { label: "Eparquia", value: "Rio de Janeiro" },
    ],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre João Damasceno, no século Lucas Soares Chagas, nasceu em 25 de julho de 1992. Serve na Eparquia do Rio de Janeiro, sob o nome eclesiástico que evoca o grande doutor São João Damasceno, defensor dos Santos Ícones.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "O presbítero dedica-se à vida litúrgica, à formação dos fiéis e ao cuidado das comunidades fluminenses, em comunhão com a hierarquia da Igreja.",
        ],
      },
      {
        title: "Homilias e catequese",
        body: [
          "Registros de homilias, encontros de formação e materiais audiovisuais serão publicados nesta página.",
        ],
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
    summary: "Padre da Igreja Ortodoxa Grega G.O.C. no Brasil.",
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
    summary: "Padre da Igreja Ortodoxa Grega G.O.C. no Brasil.",
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
    slug: "dom-jose-vicente-garcia-aguila",
    name: "Dom José Vicente Garcia Aguila",
    role: "Sacerdote Monge",
    category: "sacerdote-monge",
    image: "/media/dom-jose-vicente-garcia-aguila.jpg",
    summary: "Sacerdote monge incardinado na Eparquia de São Paulo.",
    facts: [
      { label: "Nascimento", value: "17/03/1957" },
      { label: "Natural", value: "Equador" },
      { label: "Sagração Episcopal", value: "02/08/2026" },
      { label: "Incardinado", value: "Eparquia de São Paulo" },
    ],
    sections: [
      {
        title: "Perfil",
        body: [
          "Dom José Vicente Garcia Aguila nasceu em 17 de março de 1957, no Equador. É sacerdote monge, incardinado na Eparquia de São Paulo. A sagração episcopal ocorreu em 2 de agosto de 2026.",
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
    slug: "abade-julio",
    name: "Arquimandrita Abade Júlio",
    role: "Mosteiro de São Basílio",
    category: "monastico",
    image: "/media/brasao-goc.webp",
    summary: "Vida monástica e paternidade espiritual no Mosteiro de São Basílio.",
    facts: [
      { label: "Ministério", value: "Abade" },
      { label: "Casa", value: "Mosteiro de São Basílio" },
      { label: "Cidade", value: "Nova Iguaçu / RJ" },
    ],
    sections: [
      {
        title: "Ministério",
        body: [
          "O Arquimandrita Abade Júlio é apresentado na hierarquia da Igreja em relação à vida monástica. O abade é pai espiritual da comunidade: guarda a regra, preside a oração e acolhe os que buscam o silêncio de Deus.",
        ],
      },
      {
        title: "Mosteiro",
        body: [
          "O Mosteiro de São Basílio, em Marapicu, Nova Iguaçu, é o endereço de referência da vida monástica neste portal. Visitas devem ser combinadas com antecedência.",
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
    summary: "Seminarista da Igreja Ortodoxa Grega G.O.C. no Brasil.",
    facts: [{ label: "Nascimento", value: "01/10/1977" }],
    sections: [
      {
        title: "Formação",
        body: [
          "Crispim Souza Silva nasceu em 1º de outubro de 1977. É seminarista da Igreja Ortodoxa Grega G.O.C. no Brasil.",
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
    summary: "Seminarista da Igreja Ortodoxa Grega G.O.C. no Brasil.",
    facts: [{ label: "Nascimento", value: "21/02/1984" }],
    sections: [
      {
        title: "Formação",
        body: [
          "Max Yuri Faé Silva nasceu em 21 de fevereiro de 1984. É seminarista da Igreja Ortodoxa Grega G.O.C. no Brasil.",
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
    summary: "Seminarista da Igreja Ortodoxa Grega G.O.C. no Brasil, no Rio de Janeiro.",
    facts: [
      { label: "Nascimento", value: "22/01/2008" },
      { label: "Cidade", value: "Rio de Janeiro" },
    ],
    sections: [
      {
        title: "Formação",
        body: [
          "Mateus Alves de Oliveira nasceu em 22 de janeiro de 2008. É seminarista da Igreja Ortodoxa Grega G.O.C. no Brasil, no Rio de Janeiro.",
        ],
      },
    ],
  },
];

export function getClergy(slug: string) {
  return CLERGY.find((person) => person.slug === slug);
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
    estado: "RJ",
    cidade: "Nova Iguaçu",
    comunidade: "Mosteiro de São Basílio",
    sacerdote: "Arquimandrita Abade Júlio",
    endereco: "R. Gomes Freire, 64 - Marapicu, Nova Iguaçu - RJ, 26295-045",
    contato: "(21) 96483-7295",
    href: "/comunidades/nova-iguacu",
  },
  {
    estado: "SP",
    cidade: "São Paulo",
    comunidade: "Eparquia de São Paulo",
    sacerdote: "Padre Kelmon Luís",
    endereco: "Rua Oscar Bressane, 311 - Bosque da Saúde, São Paulo - SP",
    contato: "Ver perfil do clero",
    href: "/igreja/hierarquia/padre-kelmon-luis",
  },
  {
    estado: "RJ",
    cidade: "Rio de Janeiro",
    comunidade: "Eparquia do Rio de Janeiro",
    sacerdote: "Padre João Damasceno",
    endereco: "Endereço litúrgico a confirmar com o pároco",
    contato: "Ver perfil do clero",
    href: "/igreja/hierarquia/padre-joao-damasceno",
  },
];
