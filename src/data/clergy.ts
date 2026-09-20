export type ClergyProfile = {
  slug: string;
  name: string;
  role: string;
  image: string;
  summary: string;
  facts: { label: string; value: string }[];
  sections: { title: string; body: string[] }[];
};

export const CLERGY: ClergyProfile[] = [
  {
    slug: "dom-eugenios-de-atenas",
    name: "Dom Eugenios de Atenas",
    role: "Santo Sínodo",
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
    image: "/media/card-padre-kelmon.jpg",
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
    image: "/media/joao.webp",
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
    slug: "abade-julio",
    name: "Arquimandrita Abade Júlio",
    role: "Mosteiro de São Basílio",
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
];

export function getClergy(slug: string) {
  return CLERGY.find((person) => person.slug === slug);
}

export const ARCHBISHOPS = CLERGY.filter((person) =>
  /arcebispo|santo sínodo|primazia/i.test(`${person.role} ${person.facts.map((fact) => fact.value).join(" ")}`),
);

export function isArchbishop(slug: string) {
  return ARCHBISHOPS.some((person) => person.slug === slug);
}

export const PARISHES = [
  {
    estado: "RJ",
    cidade: "Nova Iguaçu",
    comunidade: "Mosteiro de São Basílio",
    sacerdote: "Arquimandrita Abade Júlio",
    endereco: "Rua Gomes Freire nº 64, Marapicu, CEP 26295-045",
    contato: "(21) 96483-7295",
    href: "/comunidades/nova-iguacu",
  },
  {
    estado: "SP",
    cidade: "São Paulo",
    comunidade: "Eparquia de São Paulo",
    sacerdote: "Padre Kelmon Luís",
    endereco: "Endereço litúrgico a confirmar com o pároco",
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
