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
    image: "/media/eugenios.png",
    summary:
      "Autoridade eclesiástica apresentada pelo projeto como referência central do Santo Sínodo de Eugenio de Atenas.",
    facts: [
      { label: "Ministério", value: "Primazia sinodal" },
      { label: "Sede", value: "Atenas" },
      { label: "Referência", value: "Santo Sínodo de Eugenio de Atenas" },
    ],
    sections: [
      {
        title: "Perfil",
        body: [
          "Dom Eugenios de Atenas é apresentado neste portal como referência de autoridade do Santo Sínodo. A primazia, na tradição ortodoxa, é serviço à unidade da fé e à comunhão dos bispos.",
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
    image: "/media/leontios.png",
    summary:
      "Perfil histórico e pastoral, atuação na América do Sul e legado no Brasil.",
    facts: [
      { label: "Título", value: "Arcebispo Metropolita da América do Sul" },
      { label: "Atuação", value: "América do Sul e Brasil" },
      { label: "Página", value: "Hierarquia e memória pastoral" },
    ],
    sections: [
      {
        title: "Perfil histórico e pastoral",
        body: [
          "Dom Leontios de Noronha e Valdigem é apresentado como Arcebispo Metropolita da América do Sul. Sua página reúne o ministério episcopal, a memória histórica e o legado pastoral no Brasil.",
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
    image: "/media/kelmon.png",
    summary: "Presbítero da Eparquia de São Paulo.",
    facts: [
      { label: "Nascimento", value: "21/10/1976" },
      { label: "Ordenação", value: "02/08/2015" },
      { label: "Eparquia", value: "São Paulo / SP" },
    ],
    sections: [
      {
        title: "Biografia",
        body: [
          "Padre Kelmon Luís nasceu em 21 de outubro de 1976. Foi ordenado em 2 de agosto de 2015 e serve na Eparquia de São Paulo.",
        ],
      },
      {
        title: "Ministério",
        body: [
          "Seu ministério presbiteral inclui a celebração da Divina Liturgia, a catequese, o acompanhamento dos fiéis e a presença pastoral na eparquia paulista.",
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
    image: "/media/joao.png",
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
    image: "/media/brasao-goc.png",
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

export const PARISHES = [
  {
    estado: "RJ",
    cidade: "Nova Iguaçu",
    comunidade: "Mosteiro de São Basílio",
    sacerdote: "Arquimandrita Abade Júlio",
    endereco: "Rua Gomes Freire nº 64, Marapicu, CEP 26295-045",
    contato: "(21) 96483-7295",
    href: "/mosteiro",
  },
  {
    estado: "SP",
    cidade: "São Paulo",
    comunidade: "Eparquia de São Paulo",
    sacerdote: "Padre Kelmon Luís",
    endereco: "Endereço litúrgico a confirmar com o pároco",
    contato: "Ver perfil do clero",
    href: "/hierarquia/padre-kelmon-luis",
  },
  {
    estado: "RJ",
    cidade: "Rio de Janeiro",
    comunidade: "Eparquia do Rio de Janeiro",
    sacerdote: "Padre João Damasceno",
    endereco: "Endereço litúrgico a confirmar com o pároco",
    contato: "Ver perfil do clero",
    href: "/hierarquia/padre-joao-damasceno",
  },
];
