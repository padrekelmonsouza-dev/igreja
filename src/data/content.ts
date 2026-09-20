import { KNOWLEDGE_ARTICLES } from "./knowledge";
export { SITE } from "./site";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const NAV_PRIMARY: NavItem[] = [
  { href: "/", label: "Início", icon: "church" },
  { href: "/igreja", label: "Igreja", icon: "church" },
  { href: "/clero", label: "Clero", icon: "clergy" },
  { href: "/liturgia", label: "Liturgia", icon: "liturgy" },
  { href: "/catequese", label: "Catequese", icon: "catechesis" },
  { href: "/missoes", label: "Missões", icon: "mission" },
];

export const NAV_MORE: NavItem[] = [
  { href: "/igreja/arcebispos", label: "Arcebispos", icon: "bishop" },
  { href: "/mosteiro", label: "Mosteiros", icon: "monastery" },
  { href: "/paroquias", label: "Paróquias", icon: "parish" },
  { href: "/pastorais", label: "Pastorais", icon: "pastoral" },
  { href: "/ordem-de-sao-jose", label: "Ordem de São José", icon: "joseph" },
  { href: "/pedido-de-oracao", label: "Pedidos de oração", icon: "prayer" },
];

export const NAV_KNOWLEDGE: NavItem[] = [
  { href: "/ortodoxia/o-que-e-a-ortodoxia", label: "O que é a Igreja Ortodoxa", icon: "cross" },
  { href: "/ortodoxia/catolica-e-ortodoxa", label: "Católica e Ortodoxa", icon: "scales" },
  { href: "/primeira-visita", label: "Primeira visita", icon: "door" },
  { href: "/enciclopedia", label: "Enciclopédia", icon: "book" },
  { href: "/perguntas-frequentes", label: "Perguntas frequentes", icon: "question" },
  { href: "/glossario", label: "Glossário", icon: "glossary" },
];

export const MENU_LINKS = [...NAV_KNOWLEDGE, ...NAV_PRIMARY, ...NAV_MORE];

const EXTRA_PATH_ICONS: Record<string, string> = {
  "/igreja/nossa-fe": "cross",
  "/ortodoxia/santos": "saints",
  "/ortodoxia/theotokos": "pastoral",
  "/ortodoxia/sacramentos": "liturgy",
  "/ortodoxia/oracao": "prayer",
  "/ortodoxia/jejum": "liturgy",
  "/ortodoxia/icones": "saints",
  "/igreja/sucessao-apostolica": "synod",
  "/calendario": "calendar",
  "/noticias": "news",
  "/videos": "video",
  "/biblioteca": "library",
  "/ortodoxia/batismo": "liturgy",
  "/igreja/nossa-historia": "book",
  "/pesquisa": "search",
  "/igreja/arcebispos": "bishop",
  "/paroquias": "parish",
  "/clero": "clergy",
  "/formacao/jesus-cristo": "cross",
  "/formacao/igreja": "church",
  "/formacao/jejum-e-oracao": "prayer",
};

export function iconForPath(path: string): string {
  return MENU_LINKS.find((link) => link.href === path)?.icon || EXTRA_PATH_ICONS[path] || "book";
}

export type ArticleSection = {
  title: string;
  body: string[];
};

export type ArticlePage = {
  path: string;
  title: string;
  kicker: string;
  intro: string;
  description?: string;
  related?: string[];
  sections: ArticleSection[];
};

const BASE_ARTICLES: ArticlePage[] = [
  {
    path: "/igreja/nossa-fe",
    title: "Nossa Fé",
    kicker: "Fé e tradição",
    intro:
      "Uma introdução à vida, à espiritualidade e à tradição da Igreja Ortodoxa.",
    sections: [
      {
        title: "Tradição Apostólica",
        body: [
          "A Igreja Ortodoxa compreende-se como a continuidade viva da Igreja fundada por Nosso Senhor Jesus Cristo e transmitida pelos Santos Apóstolos. A fé não é uma invenção recente, nem um sistema particular de ideias: é a vida da Igreja, conservada na Escritura, nos Santos Concílios, na liturgia e nos Padres.",
          "No Brasil, a Igreja Ortodoxa Grega G.O.C. apresenta-se como herdeira dessa Tradição Apostólica, na linha do Velho Calendário e em comunhão com o Santo Sínodo de Eugenio de Atenas.",
        ],
      },
      {
        title: "Fé inabalável",
        body: [
          "O Credo Niceno-Constantinopolitano resume a fé ortodoxa: um só Deus, Pai todo-poderoso; um só Senhor, Jesus Cristo, Filho de Deus, consubstancial ao Pai; e o Espírito Santo, Senhor e fonte de vida, que procede do Pai.",
          "Essa fé é confessada, cantada e vivida. Não se reduz a um sentimento privado. Ela se torna caminho de conversão, de oração e de comunhão eclesial.",
        ],
      },
      {
        title: "Vida litúrgica",
        body: [
          "O centro da vida ortodoxa é a Divina Liturgia. Nela, o céu e a terra se encontram: a Palavra é proclamada, os dons são oferecidos, o povo é santificado e o Reino de Deus é antecipado.",
          "Quem chega pela primeira vez é bem-vindo. Não é preciso saber tudo para entrar, ficar em silêncio, observar e, aos poucos, aprender a rezar com a Igreja.",
        ],
      },
      {
        title: "Comunidade e serviço",
        body: [
          "A Ortodoxia não é apenas doutrina. É uma comunidade que ora, jejua, celebra os Santos Mistérios e serve o próximo. A fé se verifica no amor, na hospitalidade e na fidelidade cotidiana.",
        ],
      },
    ],
  },
  {
    path: "/igreja/quem-somos",
    title: "Quem Somos",
    kicker: "Tradição viva",
    intro:
      "Conheça a presença, a história e a missão da Igreja Ortodoxa Grega G.O.C. no Brasil.",
    sections: [
      {
        title: "Quem somos",
        body: [
          "A Igreja Ortodoxa Grega G.O.C. no Brasil é um portal de fé, formação, história e missão. Existe para quem nunca ouviu falar da Ortodoxia e para quem já vive a fé e deseja aprofundá-la.",
          "G.O.C. refere-se aos Cristãos Ortodoxos Genuínos (Genuine Orthodox Christians), na tradição velho-calendarista grega. O projeto apresenta como referência canônica o Santo Sínodo de Eugenio de Atenas.",
        ],
      },
      {
        title: "Nossa história",
        body: [
          "A presença ortodoxa no Brasil cresceu por missões, mosteiros, paróquias e o testemunho de clérigos e fiéis. Este portal reúne memória institucional, formação e caminhos de acolhida para novas comunidades.",
          "A história da Igreja não é apenas um arquivo do passado: é a transmissão da mesma fé, nos mesmos Mistérios, de geração em geração.",
        ],
      },
      {
        title: "Nossa fé",
        body: [
          "Confessamos a fé da Igreja una, santa, católica e apostólica. Honramos os Santos Ícones, invocamos os Santos, guardamos o jejum, celebramos o calendário patrístico e buscamos a vida em Cristo.",
        ],
      },
      {
        title: "Tradição Apostólica",
        body: [
          "A Tradição Apostólica é o rio da vida eclesial: Escritura, liturgia, cânones, Padres e sucessão episcopal. Nada disso existe isolado. A Igreja transmite o que recebeu.",
        ],
      },
      {
        title: "Santo Sínodo",
        body: [
          "O Santo Sínodo é o órgão de autoridade episcopal da Igreja. Neste portal, a referência apresentada é o Santo Sínodo de Eugenio de Atenas, com páginas específicas para a hierarquia, documentos e comunicados.",
        ],
      },
      {
        title: "Presença no Brasil",
        body: [
          "Há comunidades, missões e um mosteiro. A Eparquia de São Paulo e a Eparquia do Rio de Janeiro figuram entre os núcleos pastorais já apresentados, além do Mosteiro de São Basílio, em Nova Iguaçu.",
        ],
      },
      {
        title: "Mosteiro de São Basílio",
        body: [
          "O mosteiro é coração de oração da Igreja. Situado em Marapicu, Nova Iguaçu (RJ), é lugar de silêncio, liturgia e acolhida espiritual.",
        ],
      },
      {
        title: "Missões",
        body: [
          "As missões ortodoxas existem para anunciar o Evangelho, catequizar, formar comunidades e acompanhar quem deseja entrar na vida da Igreja. O convite permanece o mesmo do Evangelho: vinde e vede.",
        ],
      },
    ],
  },
  {
    path: "/mosteiro",
    title: "Mosteiro de São Basílio",
    kicker: "Oração e espiritualidade",
    intro:
      "R. Gomes Freire, 64 - Marapicu, Nova Iguaçu - RJ, 26295-045. Telefone: (21) 96483-7295.",
    sections: [
      {
        title: "História",
        body: [
          "O Mosteiro de São Basílio é apresentado como casa de vida monástica da Igreja Ortodoxa Grega G.O.C. no Brasil. Dedicado ao grande Pai da Igreja, São Basílio, o mosteiro une oração, trabalho e hospitalidade.",
        ],
      },
      {
        title: "Espiritualidade",
        body: [
          "A vida monástica ortodoxa se apoia no Ofício Divino, na regra de oração, no silêncio interior e na obediência evangélica. O mosteiro não é um museu: é um coração que reza pela Igreja e pelo mundo.",
        ],
      },
      {
        title: "Localização",
        body: [
          "Endereço: R. Gomes Freire, 64 - Marapicu, Nova Iguaçu - RJ, 26295-045.",
          "Recomenda-se contato prévio antes da primeira visita, especialmente para refeições, hospedagem ou participação em ofícios.",
        ],
      },
      {
        title: "Contato",
        body: [
          "Telefone / WhatsApp: (21) 96483-7295.",
          "Horários de celebração e normas de visita podem variar segundo o calendário litúrgico e a vida da comunidade monástica.",
        ],
      },
      {
        title: "Celebrações",
        body: [
          "A Divina Liturgia e os ofícios cotidianos seguem o calendário patrístico. Confirme datas de festas, vigílias e períodos de retiro com a comunidade.",
        ],
      },
    ],
  },
  {
    path: "/santo-sinodo",
    title: "Santo Sínodo",
    kicker: "Autoridade da Igreja",
    intro:
      "O Santo Sínodo de Eugenio de Atenas, apresentado como referência canônica do projeto.",
    sections: [
      {
        title: "Apresentação",
        body: [
          "O Santo Sínodo é a reunião dos bispos em concílio permanente. Nele se expressa a unidade da fé, a disciplina canônica e o cuidado pastoral da Igreja.",
          "Este portal apresenta o Santo Sínodo de Eugenio de Atenas como referência de autoridade eclesiástica da Igreja Ortodoxa Grega G.O.C. no Brasil.",
        ],
      },
      {
        title: "Autoridade",
        body: [
          "Na eclesiologia ortodoxa, nenhuma pessoa particular substitui a Igreja. O bispo preside na caridade, em sucessão apostólica, e o sínodo guarda a fé comum.",
          "Dom Eugenios de Atenas é apresentado neste projeto como referência central dessa autoridade sinodal.",
        ],
      },
      {
        title: "Documentos",
        body: [
          "Encíclicas, cartas pastorais, decisões canônicas e comunicados oficiais serão publicados nesta seção à medida que a Secretaria da Igreja os disponibilizar.",
        ],
      },
      {
        title: "Comunicados",
        body: [
          "Notícias institucionais, nomeações, calendário de visitas pastorais e orientações à comunidade fiéis serão reunidas aqui, sempre distinguindo o que é informação oficial do que é conteúdo editorial.",
        ],
      },
    ],
  },
  {
    path: "/ortodoxia/divina-liturgia",
    title: "Divina Liturgia",
    kicker: "O coração da vida ortodoxa",
    intro: "Compreenda a celebração e prepare-se para participar.",
    sections: [
      {
        title: "O que é",
        body: [
          "A Divina Liturgia é o coração da vida ortodoxa. Nela, a Igreja oferece ao Pai o sacrifício eucarístico de Cristo, no Espírito Santo. Não é um espetáculo nem uma reunião meramente simbólica: é a atualização do Mistério pascal.",
        ],
      },
      {
        title: "Como funciona",
        body: [
          "A celebração se desenvolve em cantos, incenso, procissões, leituras e orações. O sacerdote, os diáconos, o coro e o povo formam um só corpo orante. O visitante pode permanecer em pé, acompanhar os sinais da cruz e observar o ritmo da Igreja.",
        ],
      },
      {
        title: "Partes da Liturgia",
        body: [
          "De modo geral, há a Proskomedia (preparação dos dons), a Liturgia da Palavra (antífonas, Triságio, Apostolo e Evangelho) e a Liturgia Eucarística (Querubikon, anáfora, Comunhão e ação de graças).",
          "Cada gesto tem sentido: as Portas Reais, o véu, o ícone, o cálice, o pão e o vinho falam da Encarnação, da Cruz e da Ressurreição.",
        ],
      },
      {
        title: "Como se preparar",
        body: [
          "A preparação inclui oração, jejum segundo a tradição recebida do confessor, reconciliação e, para os fiéis ortodoxos, a Confissão quando conveniente. Visitantes não ortodoxos são acolhidos, mas a Santa Comunhão é reservada aos fiéis da Igreja devidamente preparados.",
        ],
      },
      {
        title: "O que esperar",
        body: [
          "Espere beleza, silêncio, canto e uma duração maior do que muitas celebrações ocidentais. Não é necessário compreender cada palavra na primeira visita. Deixe o coração aprender com os olhos, os ouvidos e o corpo.",
        ],
      },
      {
        title: "Primeira visita",
        body: [
          "Você é bem-vindo. Vista-se com recato, chegue alguns minutos antes, evite conversas durante os ofícios e, ao final, cumprimente o sacerdote. Se quiser, apresente-se: a Igreja gosta de conhecer quem chega.",
        ],
      },
      {
        title: "Perguntas frequentes",
        body: [
          "Posso assistir sem ser ortodoxo? Sim. Posso comungar? A Comunhão é para os fiéis ortodoxos preparados. Preciso saber grego ou eslavo? Não: a fé se aprende também na participação silenciosa, e muitas comunidades no Brasil usam o português.",
        ],
      },
    ],
  },
  {
    path: "/catequese",
    title: "Catequese",
    kicker: "Formação da fé",
    intro:
      "Caminhos para conhecer a fé ortodoxa com clareza, respeito e profundidade.",
    sections: [
      {
        title: "Para quem está chegando",
        body: [
          "A catequese não é um curso acelerado. É iniciação à vida da Igreja: oração, doutrina, liturgia, moral evangélica e pertencimento comunitário.",
        ],
      },
      {
        title: "O que se estuda",
        body: [
          "Quem é Deus, quem é Jesus Cristo, o que é a Igreja, os Santos Mistérios, os ícones, o jejum, a oração de Jesus, o calendário e a preparação para o Batismo ou a recepção na Igreja.",
        ],
      },
      {
        title: "Como participar",
        body: [
          "Procure o sacerdote da comunidade mais próxima. A catequese pode ocorrer em encontros presenciais, acompanhamento espiritual e leitura guiada. O portal oferece os primeiros passos; a Igreja local completa o caminho.",
        ],
      },
    ],
  },
  {
    path: "/arcebispo-primaz",
    title: "Arcebispo Primaz",
    kicker: "Primazia e serviço",
    intro:
      "A primazia na Igreja Ortodoxa é serviço à unidade, não um poder separado da fé comum.",
    sections: [
      {
        title: "O ministério primazial",
        body: [
          "O arcebispo primaz preside o Santo Sínodo, guarda a comunhão entre os bispos e representa a Igreja na caridade. Seu ministério é apostólico: confirmar os irmãos e pastorear com os cânones e o Evangelho.",
        ],
      },
      {
        title: "Dom Eugenios de Atenas",
        body: [
          "Dom Eugenios de Atenas é apresentado por este projeto como referência central do Santo Sínodo de Eugenio de Atenas. Sua autoridade é eclesiástica e sinodal.",
        ],
      },
      {
        title: "Na América do Sul",
        body: [
          "A presença na América do Sul conta com o ministério de Dom Leontios de Noronha e Valdigem, Arcebispo Metropolita, cujo perfil histórico e pastoral é apresentado nas páginas de hierarquia.",
        ],
      },
    ],
  },
  {
    path: "/pastorais",
    title: "Pastorais",
    kicker: "Cuidado da Igreja",
    intro:
      "Ação pastoral da Igreja junto às famílias, aos enfermos, aos jovens e a quem busca a fé.",
    sections: [
      {
        title: "Pastoral familiar",
        body: [
          "Acompanhar casais, pais e filhos na vida sacramental, na oração doméstica e na educação cristã.",
        ],
      },
      {
        title: "Pastoral da acolhida",
        body: [
          "Receber visitantes, catecúmenos e fiéis que retornam. Explicar a liturgia, indicar leituras e ajudar na primeira visita a uma comunidade.",
        ],
      },
      {
        title: "Pastoral dos enfermos",
        body: [
          "Oração pelos doentes, visitas e, quando canonicamente possível, a Unção e a Comunhão aos enfermos.",
        ],
      },
      {
        title: "Pastoral da formação",
        body: [
          "Catequese, grupos de estudo dos Padres, círculos de leitura bíblica e preparação litúrgica.",
        ],
      },
    ],
  },
  {
    path: "/ordem-de-sao-jose",
    title: "Ordem de São José",
    kicker: "Serviço e proteção",
    intro:
      "Uma obra de serviço inspirada em São José, guarda do Menino Jesus e da Santíssima Theotokos.",
    sections: [
      {
        title: "Carisma",
        body: [
          "São José ensina silêncio, trabalho, paternidade espiritual e fidelidade. A Ordem de São José é apresentada neste portal como espaço de leigos e fiéis comprometidos com a proteção da Igreja, da família e dos mais frágeis.",
        ],
      },
      {
        title: "Obras",
        body: [
          "Apoio a missões, cuidado com templos e mosteiros, assistência caritativa e colaboração nas pastorais. O detalhamento oficial de estatutos e graus será publicado pela hierarquia.",
        ],
      },
      {
        title: "Como participar",
        body: [
          "Quem desejar conhecer a Ordem deve procurar o clero da comunidade local. Não se trata de um atalho para ministérios ordenados, mas de um caminho de serviço laical e eclesial.",
        ],
      },
    ],
  },
  {
    path: "/missoes",
    title: "Missões Ortodoxas",
    kicker: "Ide e fazei discípulos",
    intro:
      "A missão ortodoxa anuncia Cristo, planta comunidades e forma discípulos na Tradição da Igreja.",
    sections: [
      {
        title: "O sentido da missão",
        body: [
          "Missionar não é propaganda. É testemunho: liturgia celebrada, vida convertida, hospitalidade oferecida e doutrina transmitida com paz.",
        ],
      },
      {
        title: "No Brasil",
        body: [
          "As missões buscam alcançar cidades sem paróquia estável, acompanhar famílias isoladas e apoiar a catequese a distância quando necessário, sempre sob a bênção da hierarquia.",
        ],
      },
      {
        title: "Como ajudar",
        body: [
          "Ore, participe, compartilhe os conteúdos de formação e fale com o sacerdote sobre necessidades concretas das comunidades.",
        ],
      },
    ],
  },
  {
    path: "/ortodoxia/santos",
    title: "Ícones e Santos",
    kicker: "Nuvem de testemunhas",
    intro:
      "Conheça a veneração dos Santos e o significado espiritual dos ícones.",
    sections: [
      {
        title: "Por que veneramos os Santos",
        body: [
          "Os Santos são amigos de Deus. A Igreja não os adora: adora somente a Santíssima Trindade. Venera os Santos porque neles Cristo se tornou visível. Pedimos sua intercessão como quem pede oração a um irmão que já contempla o Senhor.",
        ],
      },
      {
        title: "O que é um ícone",
        body: [
          "O ícone não é um quadro decorativo. É teologia em cor: janela para o Reino. Ele ensina o Evangelho, guarda a memória da Encarnação e conduz à oração. Por isso é benzido, beijado e colocado no templo e no lar.",
        ],
      },
      {
        title: "A Theotokos",
        body: [
          "A Santíssima Mãe de Deus ocupa lugar ímpar na piedade ortodoxa. Todo ícone verdadeiro da Virgem aponta para o Cristo que Ela carregou. Honrar Maria é confessar que o Verbo se fez carne.",
        ],
      },
      {
        title: "Santos da Igreja",
        body: [
          "Apóstolos, mártires, padres, monges, soberanos justos e fiéis anônimos formam a nuvem de testemunhas. O calendário patrístico nos faz conviver com eles ao longo do ano.",
        ],
      },
    ],
  },
  {
    path: "/calendario",
    title: "Calendário Patrístico",
    kicker: "O tempo da Igreja",
    intro:
      "Explore festas, santos, leituras e períodos de jejum do calendário litúrgico antigo.",
    sections: [
      {
        title: "Calendário antigo",
        body: [
          "A Igreja Ortodoxa Grega G.O.C. neste portal segue o calendário patrístico, também chamado velho calendário. Ele organiza o ano em torno da Páscoa, das grandes festas do Senhor e da Theotokos, e da memória cotidiana dos Santos.",
        ],
      },
      {
        title: "Jejuns",
        body: [
          "Os grandes jejuns incluem a Grande Quaresma, o Jejum dos Apóstolos, o Jejum da Dormição e o Jejum da Natividade, além das quartas e sextas-feiras. O confessor orienta a aplicação pastoral de cada regra.",
        ],
      },
      {
        title: "Festas",
        body: [
          "A Páscoa é a Festa das festas. Com ela, o ciclo inclui a Teofania, a Anunciação, a Transfiguração, a Dormição, a Natividade e as demais solenidades que revelam a economia da salvação.",
        ],
      },
      {
        title: "Como viver o calendário",
        body: [
          "Leia o santo do dia, observe os jejuns possíveis, participe da liturgia e deixe o ano civil ser educado pelo ano da Igreja.",
        ],
      },
    ],
  },
  {
    path: "/formacao",
    title: "Formação",
    kicker: "Aprender e aprofundar",
    intro:
      "Caminhos de estudo para conhecer a fé e a tradição ortodoxas.",
    sections: [
      {
        title: "Catequese",
        body: [
          "O primeiro caminho é pastoral: conversar com um sacerdote, frequentar a liturgia e receber orientação pessoal.",
        ],
      },
      {
        title: "Curso de Introdução",
        body: [
          "Os nove passos deste portal foram pensados para quem chega agora: da pergunta “o que é a Ortodoxia?” até o encontro com uma comunidade.",
        ],
      },
      {
        title: "Santos Padres",
        body: [
          "Atanásio, Basílio, Gregório, João Crisóstomo, Máximo, João Damasceno e tantos outros permanecem mestres vivos. Ler os Padres é beber da mesma fonte da liturgia.",
        ],
      },
      {
        title: "Escrituras",
        body: [
          "A Bíblia é livro da Igreja. Lê-se na liturgia, na homilia e na cela. A interpretação ortodoxa não separa a Palavra da Tradição que a recebeu.",
        ],
      },
      {
        title: "Teologia Ortodoxa",
        body: [
          "A teologia ortodoxa é contemplativa e litúrgica. Fala de Teose, da distinção entre essência e energias, da Encarnacão e da vida sacramental — sempre a serviço da salvação, não da curiosidade vazia.",
        ],
      },
      {
        title: "História",
        body: [
          "Dos Apóstolos aos Concílios, do monaquismo às missões contemporâneas, a história mostra a fidelidade de Deus em meio às feridas do tempo.",
        ],
      },
      {
        title: "Concílios",
        body: [
          "Os Santos Concílios Ecumênicos defenderam a fé contra as heresias e formularam o dogma em serviço à salvação: Cristo verdadeiro Deus e verdadeiro homem.",
        ],
      },
      {
        title: "Perguntas e respostas",
        body: [
          "Use a busca do portal, percorra os nove passos e, para questões pessoais de consciência, fale com o clero. A internet informa; o pastor acompanha.",
        ],
      },
    ],
  },
  {
    path: "/formacao/jesus-cristo",
    title: "Quem é Jesus Cristo?",
    kicker: "02 · Primeiros passos",
    intro:
      "O centro da fé ortodoxa não é uma ideia: é uma Pessoa. Jesus Cristo, Filho de Deus, verdadeiro Deus e verdadeiro homem.",
    sections: [
      {
        title: "O Verbo se fez carne",
        body: [
          "Confessamos que o Filho eterno do Pai se encarnou do Espírito Santo e da Virgem Maria. Ele não é um profeta entre outros, nem um símbolo moral. É o Senhor, o único Salvador.",
        ],
      },
      {
        title: "Cruz e Ressurreição",
        body: [
          "Cristo morreu por nossos pecados e ressuscitou ao terceiro dia. A Páscoa é o critério de toda a teologia ortodoxa: a morte foi vencida, e a vida foi dada ao mundo.",
        ],
      },
      {
        title: "Encontro pessoal e eclesial",
        body: [
          "Conhecer Cristo é entrar na Igreja que é o Seu Corpo. Oração, Evangelho, liturgia e os Santos Mistérios são o caminho ordinário desse encontro.",
        ],
      },
    ],
  },
  {
    path: "/formacao/igreja",
    title: "O que é a Igreja?",
    kicker: "03 · Primeiros passos",
    intro:
      "A Igreja não é uma associação religiosa. É o Corpo de Cristo, a comunidade dos batizados, a arca da salvação e a presença do Reino no mundo.",
    sections: [
      {
        title: "Una, santa, católica e apostólica",
        body: [
          "Estas quatro notas do Credo dizem o que a Igreja é. Unidade na fé; santidade recebida de Cristo; catolicidade da plenitude, não da estatística; apostolicidade da origem e da sucessão.",
        ],
      },
      {
        title: "Hierarquia e povo",
        body: [
          "Bispos, presbíteros, diáconos e fiéis formam um só povo sacerdotal, com ministérios distintos. Sem o povo não há liturgia; sem o bispo não há Igreja local plena.",
        ],
      },
    ],
  },
  {
    path: "/ortodoxia/sacramentos",
    title: "Os Santos Mistérios",
    kicker: "06 · Primeiros passos",
    intro:
      "Os Santos Mistérios são ações de Cristo na Igreja. Por eles, a graça se torna visível e a vida humana é transfigurada.",
    sections: [
      {
        title: "Batismo e Crisma",
        body: [
          "No Batismo, morremos e ressuscitamos com Cristo. Na Crisma, somos selados com o dom do Espírito Santo. Na prática ortodoxa, estes mistérios são dados juntos, inclusive às crianças.",
        ],
      },
      {
        title: "Eucaristia",
        body: [
          "A Divina Eucaristia é o Mistério dos mistérios: o Corpo e o Sangue de Cristo. Nela a Igreja se torna o que já é.",
        ],
      },
      {
        title: "Confissão, Unção, Matrimônio e Ordem",
        body: [
          "A Confissão reconcilia; a Unção cura; o Matrimônio abençoa a união do homem e da mulher à imagem de Cristo e da Igreja; a Ordem constitui diáconos, presbíteros e bispos para o serviço.",
        ],
      },
    ],
  },
  {
    path: "/formacao/jejum-e-oracao",
    title: "Jejum e oração",
    kicker: "07 · Primeiros passos",
    intro:
      "A ascese ortodoxa não é recorde espiritual. É treino do coração para amar a Deus e ao próximo.",
    sections: [
      {
        title: "Oração",
        body: [
          "A oração de Jesus — “Senhor Jesus Cristo, Filho de Deus, tem piedade de mim, pecador” — é tesouro da espiritualidade ortodoxa. Com ela, os salmos, o Ofício e a liturgia educam a respiração da alma.",
        ],
      },
      {
        title: "Jejum",
        body: [
          "Jejuar é aliviar o corpo para despertar o espírito. A Igreja propõe um ritmo comunitário, não um heroísmo isolado. Peça orientação ao confessor, sobretudo em caso de doença, gravidez ou trabalho pesado.",
        ],
      },
      {
        title: "Esmola e vigilância",
        body: [
          "O jejum sem misericórdia resseca. A oração sem vigilância se dispersa. Os três — oração, jejum e esmola — caminham juntos.",
        ],
      },
    ],
  },
  {
    path: "/igreja/sucessao-apostolica",
    title: "Sucessão Apostólica",
    kicker: "Tradição viva",
    intro:
      "A Tradição Apostólica é o rio da vida eclesial: Escritura, liturgia, cânones, Padres e sucessão episcopal. A Igreja transmite o que recebeu.",
    description:
      "Sucessão apostólica na Igreja Ortodoxa: a continuidade da fé, da liturgia e do episcopado desde os Apóstolos.",
    related: ["/igreja/hierarquia", "/igreja/nossa-fe", "/santo-sinodo", "/ortodoxia/o-que-e-a-ortodoxia"],
    sections: [
      {
        title: "O que a Igreja recebeu",
        body: [
          "A Igreja Ortodoxa compreende-se como a continuidade viva da Igreja fundada por Nosso Senhor Jesus Cristo e transmitida pelos Santos Apóstolos. A fé não é uma invenção recente, nem um sistema particular de ideias: é a vida da Igreja, conservada na Escritura, nos Santos Concílios, na liturgia e nos Padres.",
          "A Tradição Apostólica é o rio da vida eclesial: Escritura, liturgia, cânones, Padres e sucessão episcopal. Nada disso existe isolado. A Igreja transmite o que recebeu.",
        ],
      },
      {
        title: "Bispos em sucessão",
        body: [
          "Na eclesiologia ortodoxa, nenhuma pessoa particular substitui a Igreja. O bispo preside na caridade, em sucessão apostólica, e o sínodo guarda a fé comum.",
          "Bispos, presbíteros, diáconos e fiéis formam um só povo sacerdotal, com ministérios distintos. Sem o povo não há liturgia; sem o bispo não há Igreja local plena.",
        ],
      },
      {
        title: "No Santo Sínodo e no Brasil",
        body: [
          "Este portal apresenta o Santo Sínodo de Eugenio de Atenas como referência de autoridade eclesiástica da Igreja Ortodoxa Grega G.O.C. no Brasil. Dom Eugenios de Atenas é apresentado como referência central dessa autoridade sinodal.",
          "A presença na América do Sul conta com o ministério de Dom Leontios de Noronha e Valdigem, Arcebispo Metropolita, cujo perfil histórico e pastoral é apresentado nas páginas de hierarquia.",
        ],
      },
    ],
  },
  {
    path: "/ortodoxia/icones",
    title: "Ícones ortodoxos",
    kicker: "Teologia visível",
    intro:
      "O ícone não é um quadro decorativo. É teologia em cor: janela para o Reino. Ele ensina o Evangelho, guarda a memória da Encarnação e conduz à oração.",
    description:
      "O que são ícones ortodoxos: veneração, Theotokos, Santos e o sentido espiritual da iconografia na Igreja Ortodoxa.",
    related: ["/ortodoxia/santos", "/ortodoxia/theotokos", "/ortodoxia/divina-liturgia", "/ortodoxia/o-que-e-a-ortodoxia"],
    sections: [
      {
        title: "O que é um ícone",
        body: [
          "O ícone não é um quadro decorativo. É teologia em cor: janela para o Reino. Ele ensina o Evangelho, guarda a memória da Encarnação e conduz à oração. Por isso é benzido, beijado e colocado no templo e no lar.",
        ],
      },
      {
        title: "Veneração, não adoração",
        body: [
          "Os Santos são amigos de Deus. A Igreja não os adora: adora somente a Santíssima Trindade. Venera os Santos porque neles Cristo se tornou visível. Pedimos sua intercessão como quem pede oração a um irmão que já contempla o Senhor.",
        ],
      },
      {
        title: "A Theotokos",
        body: [
          "A Santíssima Mãe de Deus ocupa lugar ímpar na piedade ortodoxa. Todo ícone verdadeiro da Virgem aponta para o Cristo que Ela carregou. Honrar Maria é confessar que o Verbo se fez carne.",
        ],
      },
      {
        title: "No templo e no calendário",
        body: [
          "Praticamente todo templo ortodoxo tem o ícone da Mãe de Deus no iconóstase. O calendário celebra a Natividade, a Entrada no Templo, a Anunciação, a Dormição e dezenas de ícones milagrosos. Conhecer Maria é caminhar para Cristo.",
        ],
      },
    ],
  },
  {
    path: "/enciclopedia",
    title: "Enciclopédia Ortodoxa",
    kicker: "Portal de conhecimento",
    intro:
      "Páginas aprofundadas sobre doutrina, história, liturgia, Santos Padres e tradição.",
    sections: [
      {
        title: "Um mapa para estudar",
        body: [
          "A enciclopédia reúne verbetes de formação: Trindade, Encarnação, Theotokos, ícones, cânones, concílios, mosteiros, calendário e vocabulário litúrgico.",
        ],
      },
      {
        title: "Comece por aqui",
        body: [
          "Se está chegando agora, siga os nove passos da formação. Se já vive a fé, use a busca e as páginas de liturgia, santos e calendário como biblioteca de consulta.",
        ],
      },
    ],
  },
  {
    path: "/noticias",
    title: "Notícias e artigos",
    kicker: "Vida da Igreja",
    intro:
      "Atualizações da Igreja, reflexões, homilias e conteúdo editorial.",
    sections: [
      {
        title: "Editorial e oficial",
        body: [
          "Este portal distingue informação oficial — sínodo, hierarquia, comunicados — de artigos de formação e crônicas pastorais. A distinção protege a consciência dos fiéis e a clareza institucional.",
        ],
      },
      {
        title: "Em publicação",
        body: [
          "Homilias, relatos de missões, festas patronais e textos de catequese serão acrescentados regularmente. Enquanto isso, explore as páginas de formação e liturgia.",
        ],
      },
    ],
  },
  {
    path: "/videos",
    title: "Vídeos e homilias",
    kicker: "Ouvir e ver",
    intro:
      "Um acervo organizado por sacerdote, tema, data e comunidade.",
    sections: [
      {
        title: "Como o acervo será organizado",
        body: [
          "Cada vídeo poderá ser encontrado pelo nome do celebrante, pela festa litúrgica, pela comunidade de origem e pelo tema — liturgia, santos, catequese, missões.",
        ],
      },
      {
        title: "Enquanto o acervo cresce",
        body: [
          "Acompanhe as páginas do clero. Ali serão indicadas homilias, catequeses e registros audiovisuais de cada ministro.",
        ],
      },
    ],
  },
  {
    path: "/biblioteca",
    title: "Biblioteca",
    kicker: "Livros e documentos",
    intro:
      "Livros, revistas, documentos e materiais de formação em um só lugar.",
    sections: [
      {
        title: "O que haverá aqui",
        body: [
          "Textos dos Padres, catecismos, documentos sinodais, hinologia, introduções à liturgia e materiais para a primeira visita.",
        ],
      },
      {
        title: "Leitura recomendada para começar",
        body: [
          "O Credo; um Evangelho (comece por Marcos ou João); uma introdução à Divina Liturgia; e a vida de um santo do calendário. A leitura rende fruto quando está unida à oração e à comunidade.",
        ],
      },
    ],
  },
];

export const ARTICLES: ArticlePage[] = [...BASE_ARTICLES, ...KNOWLEDGE_ARTICLES];

export function getArticle(path: string) {
  return ARTICLES.find((page) => page.path === path);
}
