import type { NavIconName } from "../components/NavIcon";

export type CatechesisPath = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  image: string;
  imageClass?: string;
  body: string[];
};

export type CatechesisTopic = {
  slug: string;
  title: string;
  summary: string;
  icon: NavIconName;
  body: string[];
};

export const CATECHESIS_PATHS: CatechesisPath[] = [
  {
    slug: "iniciacao",
    kicker: "Comece aqui",
    title: "Iniciação à fé",
    summary: "A catequese não é um curso acelerado. É entrada na vida da Igreja.",
    image: "/media/catequese-cristo.jpg",
    imageClass: "object-cover object-top",
    body: [
      "A catequese não é um curso acelerado. É iniciação à vida da Igreja: oração, doutrina, liturgia, moral evangélica e pertencimento comunitário.",
      "Quem chega não precisa saber grego nem memorizar o ofício. O primeiro passo é participar, ouvir e deixar a Igreja ensinar. O portal oferece os primeiros passos; a comunidade local completa o caminho.",
      "O centro da fé ortodoxa não é uma ideia: é uma Pessoa. Jesus Cristo, Filho de Deus, verdadeiro Deus e verdadeiro homem. Conhecê-Lo é entrar na Igreja que é o Seu Corpo.",
    ],
  },
  {
    slug: "doutrina",
    kicker: "O que se estuda",
    title: "A doutrina da Igreja",
    summary: "Deus, Cristo, a Igreja, os Mistérios, os ícones, o jejum e a oração.",
    image: "/media/liturgia-sao-joao-crisostomo.jpg",
    imageClass: "object-cover object-[center_18%]",
    body: [
      "Quem é Deus, quem é Jesus Cristo, o que é a Igreja, os Santos Mistérios, os ícones, o jejum, a oração de Jesus, o calendário e a preparação para o Batismo ou a recepção na Igreja.",
      "Confessamos que o Filho eterno do Pai se encarnou do Espírito Santo e da Virgem Maria. Ele não é um profeta entre outros, nem um símbolo moral. É o Senhor, o único Salvador.",
      "A Igreja não é uma associação religiosa. É o Corpo de Cristo: una, santa, católica e apostólica. A catequese une Escritura, Concílios, Padres e liturgia, sem separar a doutrina da vida orante.",
    ],
  },
  {
    slug: "batismo",
    kicker: "Nascer de novo",
    title: "Batismo e recepção",
    summary: "Morrer e ressuscitar com Cristo: o rito, a Crisma e a preparação.",
    image: "/media/catequese-batismo.jpg",
    imageClass: "object-cover object-[center_35%]",
    body: [
      "No Batismo ortodoxo, o catecúmeno morre e ressuscita com Cristo. Em seguida recebe a Crisma, o selo do Espírito Santo, e é levado à Comunhão.",
      "O rito se faz por imersão, em nome do Pai e do Filho e do Espírito Santo. A Crisma é dada na mesma celebração. A Eucaristia completa a iniciação.",
      "As crianças das famílias ortodoxas são batizadas e crismadas cedo, porque a graça não espera a idade da razão. Adultos vindos de outras tradições passam por catequese e acompanhamento do sacerdote, que indica o modo canônico de recepção.",
      "Ninguém se batiza por curiosidade estética. Batiza-se para viver em Cristo, na Igreja.",
    ],
  },
  {
    slug: "comunidade",
    kicker: "Vida da Igreja",
    title: "Como participar",
    summary: "Procure o sacerdote. A Igreja local acompanha o caminho.",
    image: "/media/catequese-igreja.jpg",
    imageClass: "object-cover object-[center_28%]",
    body: [
      "Procure o sacerdote da comunidade mais próxima. A catequese pode ocorrer em encontros presenciais, acompanhamento espiritual e leitura guiada.",
      "O portal oferece os primeiros passos; a Igreja local completa o caminho. Confirme endereço e horário com a comunidade. O Mosteiro de São Basílio, em Nova Iguaçu, pede contato prévio.",
      "Bispos, presbíteros, diáconos e fiéis formam um só povo sacerdotal, com ministérios distintos. Sem o povo não há liturgia; sem o bispo não há Igreja local plena.",
    ],
  },
];

export const CATECHESIS_TOPICS: CatechesisTopic[] = [
  {
    slug: "chegando",
    title: "Para quem está chegando",
    summary: "Oração, doutrina, liturgia e pertencimento comunitário.",
    icon: "door",
    body: [
      "A catequese não é um curso acelerado. É iniciação à vida da Igreja: oração, doutrina, liturgia, moral evangélica e pertencimento comunitário.",
      "Não é preciso saber grego, nem memorizar o ofício. Basta chegar com respeito, observar e deixar a liturgia ensinar.",
    ],
  },
  {
    slug: "jesus-cristo",
    title: "Jesus Cristo",
    summary: "O Verbo se fez carne: verdadeiro Deus e verdadeiro homem.",
    icon: "cross",
    body: [
      "O centro da fé ortodoxa não é uma ideia: é uma Pessoa. Jesus Cristo, Filho de Deus, verdadeiro Deus e verdadeiro homem.",
      "Confessamos que o Filho eterno do Pai se encarnou do Espírito Santo e da Virgem Maria. Cristo morreu por nossos pecados e ressuscitou ao terceiro dia. A Páscoa é o critério de toda a teologia ortodoxa.",
      "Conhecer Cristo é entrar na Igreja que é o Seu Corpo. Oração, Evangelho, liturgia e os Santos Mistérios são o caminho ordinário desse encontro.",
    ],
  },
  {
    slug: "igreja",
    title: "A Igreja",
    summary: "Una, santa, católica e apostólica: o Corpo de Cristo.",
    icon: "church",
    body: [
      "A Igreja não é uma associação religiosa. É o Corpo de Cristo, a comunidade dos batizados, a arca da salvação e a presença do Reino no mundo.",
      "Estas quatro notas do Credo dizem o que a Igreja é. Unidade na fé; santidade recebida de Cristo; catolicidade da plenitude, não da estatística; apostolicidade da origem e da sucessão.",
    ],
  },
  {
    slug: "misterios",
    title: "Santos Mistérios",
    summary: "Batismo, Crisma, Eucaristia e os demais Mistérios da Igreja.",
    icon: "liturgy",
    body: [
      "Os Santos Mistérios são ações de Cristo na Igreja. Por eles, a graça se torna visível e a vida humana é transfigurada.",
      "No Batismo, morremos e ressuscitamos com Cristo. Na Crisma, somos selados com o dom do Espírito Santo. A Divina Eucaristia é o Mistério dos mistérios: o Corpo e o Sangue de Cristo.",
      "A Confissão reconcilia; a Unção cura; o Matrimônio abençoa a união do homem e da mulher à imagem de Cristo e da Igreja; a Ordem constitui diáconos, presbíteros e bispos para o serviço.",
    ],
  },
  {
    slug: "oracao-jejum",
    title: "Oração e jejum",
    summary: "A ascese da Igreja: treino do coração, não recorde espiritual.",
    icon: "prayer",
    body: [
      "A ascese ortodoxa não é recorde espiritual. É treino do coração para amar a Deus e ao próximo.",
      "A oração de Jesus — “Senhor Jesus Cristo, Filho de Deus, tem piedade de mim, pecador” — é tesouro da espiritualidade ortodoxa. Com ela, os salmos, o Ofício e a liturgia educam a respiração da alma.",
      "Jejuar é aliviar o corpo para despertar o espírito. A Igreja propõe um ritmo comunitário. Peça orientação ao confessor, sobretudo em caso de doença, gravidez ou trabalho pesado.",
    ],
  },
  {
    slug: "primeira-visita",
    title: "Primeira visita",
    summary: "Como chegar, vestir-se e ser acolhido na comunidade.",
    icon: "calendar",
    body: [
      "Confirme endereço e horário com a comunidade. Vista-se com recato: ombros cobertos, roupa sóbria. Em muitas comunidades, as mulheres levam um véu ou lenço.",
      "Entre em silêncio. Se não souber os gestos, fique em pé ou sente-se quando a comunidade se sentar, e observe. Ninguém cobra perfeição do visitante.",
      "A Santa Comunhão é para os fiéis ortodoxos preparados. Visitantes não ortodoxos são acolhidos, mas não se aproximam do cálice. Ao final, apresente-se ao sacerdote e pergunte sobre a catequese.",
    ],
  },
];
