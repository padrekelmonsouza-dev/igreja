import type { NavIconName } from "../components/NavIcon";

export type SacramentPath = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  image: string;
  imageClass?: string;
  body: string[];
};

export type SacramentTopic = {
  slug: string;
  title: string;
  summary: string;
  greek?: string;
  icon: NavIconName;
  body: string[];
};

export type FeaturedSacrament = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  video?: string;
  poster: string;
  body: string[];
};

export type SacramentGridCard = {
  slug: string;
  title: string;
  kicker: string;
  image: string;
  body: string[];
};

export const FEATURED_SACRAMENTS: FeaturedSacrament[] = [
  {
    slug: "eucaristia",
    title: "Sacramento da Eucaristia",
    kicker: "Santa Comunhão",
    summary:
      "O Santo Mistério no qual os fiéis entram em comunhão com Deus e participam do Corpo e Sangue de Cristo.",
    video: "/videos/sacramentos/eucaristia.mp4?v=2",
    poster: "/videos/sacramentos/eucaristia.jpg?v=2",
    body: [
      "A tradição ortodoxa chama a Eucaristia também de Santa Comunhão. A palavra vem do grego eucharistia: ação de graças.",
      "Instituída na Santa Ceia, a Igreja confessa a presença real de Cristo nos Santos Dons, pela ação do Espírito Santo, na Divina Liturgia.",
    ],
  },
  {
    slug: "matrimonio",
    title: "Sacramento do Matrimônio",
    kicker: "Casamento ortodoxo",
    summary:
      "O Santo Matrimônio une o homem e a mulher diante de Deus e da Igreja, com a graça de viverem juntos em amor, fidelidade e comunhão.",
    video: "/videos/sacramentos/matrimonio.mp4?v=2",
    poster: "/videos/sacramentos/matrimonio.jpg?v=2",
    body: [
      "Na tradição ortodoxa grega, o casamento não é contrato nem só instituição social: é vocação cristã. Marido e mulher crescem juntos em direção a Deus, na vida da Igreja.",
      "Celebra-se no Noivado e na Coroação: anéis, coroas, o cálice comum e a Dança de Isaías, três voltas em torno da mesa sacramental.",
    ],
  },
  {
    slug: "ordem",
    title: "Sacramento da Ordem",
    kicker: "Sagrada Ordenação",
    summary:
      "A Sagrada Ordenação na Igreja Ortodoxa e o ministério daqueles que recebem a graça para servir, ensinar e santificar o povo de Deus.",
    video: "/videos/sacramentos/ordem.mp4?v=2",
    poster: "/videos/sacramentos/ordem.jpg?v=2",
    body: [
      "O Sacramento da Ordem, ou Sagrada Ordenação, é o Santo Mistério pelo qual o Espírito Santo transmite a graça e a autoridade apostólica para guiar, ensinar e santificar os fiéis.",
      "Na tradição ortodoxa, a ordenação é realizada pela imposição das mãos de um bispo, chamada quirotonia, e está ligada à sucessão apostólica e à vida sacramental da Igreja.",
    ],
  },
  {
    slug: "batismo-crisma",
    title: "Batismo e Crisma",
    kicker: "Nascer de novo",
    summary: "Morrer e ressuscitar com Cristo: o rito, o Myron e a Comunhão.",
    poster: "/media/catequese-batismo.jpg",
    body: [
      "No Batismo ortodoxo, o catecúmeno morre e ressuscita com Cristo. Em seguida recebe a Crisma, o selo do Espírito Santo, e é levado à Comunhão.",
      "O rito se faz por imersão, em nome do Pai e do Filho e do Espírito Santo. A Crisma — unção com o Santo Myron — é dada na mesma celebração. A Eucaristia completa a iniciação.",
      "As crianças das famílias ortodoxas são batizadas e crismadas cedo, porque a graça não espera a idade da razão. Adultos vindos de outras tradições passam por catequese e acompanhamento do sacerdote, que indica o modo canônico de recepção.",
    ],
  },
];

export type SacramentTheme = SacramentTopic & { roman: string; label: string };
export type OrdemRank = SacramentTheme;

export const ORDEM_RANKS: OrdemRank[] = [
  {
    slug: "bispo",
    roman: "I",
    label: "I · Episcopal",
    title: "Bispo",
    summary: "Sucessor dos Apóstolos e grau máximo da hierarquia sacramental.",
    icon: "bishop",
    body: [
      "Sucessor direto dos Apóstolos, é o grau máximo da hierarquia e o único que pode conferir as ordens sagradas.",
      "A consagração de um bispo exige a participação de pelo menos outros dois ou três bispos. Os bispos são escolhidos exclusivamente entre os monges ou os padres celibatários.",
    ],
  },
  {
    slug: "presbitero",
    roman: "II",
    label: "II · Presbiteral",
    title: "Presbítero",
    summary: "Exerce o cuidado pastoral e celebra os Divinos Mistérios.",
    icon: "clergy",
    body: [
      "Subordinado ao bispo, o presbítero — padre — exerce o cuidado pastoral direto de uma comunidade, prega e celebra os divinos Mistérios, incluindo a Eucaristia.",
      "A Igreja Ortodoxa permite a ordenação de homens casados para o presbiterado, desde que seja o primeiro casamento de ambos. Um padre casado não pode casar-se novamente se ficar viúvo. Quem entra no sacerdócio já solteiro permanece celibatário.",
    ],
  },
  {
    slug: "diacono",
    roman: "III",
    label: "III · Diaconal",
    title: "Diácono",
    summary: "Auxilia o bispo e o presbítero no serviço litúrgico e pastoral.",
    icon: "pastoral",
    body: [
      "O diácono auxilia o bispo e o presbítero nas celebrações litúrgicas e nas obras de caridade da Igreja.",
      "É ordenado após a anáfora, porque o seu ministério é servir os dons já oferecidos e o povo que os recebe. Homens casados podem ser ordenados diáconos, no primeiro casamento.",
    ],
  },
];

export const EUCARISTIA_THEMES: SacramentTheme[] = [
  {
    slug: "acao-de-gracas",
    roman: "I",
    label: "I · Ação de graças",
    title: "Eucaristia",
    summary: "Ação de graças a Deus pela criação, pela salvação e pela vida em Cristo.",
    icon: "liturgy",
    body: [
      "A palavra Eucaristia significa “ação de graças”. Toda a Divina Liturgia conduz a Igreja à gratidão a Deus pela criação, pela salvação e pela vida que recebemos em Cristo.",
    ],
  },
  {
    slug: "santos-dons",
    roman: "II",
    label: "II · Corpo e Sangue",
    title: "Santos Dons",
    summary: "O pão e o vinho tornam-se o verdadeiro Corpo e Sangue de Cristo.",
    icon: "cross",
    body: [
      "Na fé ortodoxa, o pão e o vinho oferecidos na Divina Liturgia tornam-se, pela ação do Espírito Santo, o verdadeiro Corpo e Sangue de Cristo, que os fiéis recebem na Santa Comunhão.",
    ],
  },
  {
    slug: "uniao-com-cristo",
    roman: "III",
    label: "III · Santa Comunhão",
    title: "União com Cristo",
    summary: "A Comunhão une o fiel a Cristo e aos demais membros da Igreja.",
    icon: "church",
    body: [
      "A Comunhão une o fiel a Cristo e, nele, aos demais membros da Igreja. É a participação no Mistério de Cristo e uma expressão da unidade do Corpo de Cristo.",
    ],
  },
];

export const MATRIMONIO_THEMES: SacramentTheme[] = [
  {
    slug: "noivado",
    roman: "I",
    label: "I · Noivado",
    title: "Os Anéis",
    summary: "O casal troca os anéis como sinal do compromisso voluntário.",
    icon: "rings",
    body: [
      "O Mistério do Matrimônio é celebrado em dois momentos principais: o Rito do Noivado e o Rito da Coroação. No primeiro, os anéis são abençoados e trocados como sinal do compromisso voluntário do casal.",
      "O casal troca os anéis para viver juntos em fé, harmonia, verdade e amor. Na tradição ortodoxa grega, os anéis são tradicionalmente colocados na mão direita.",
    ],
  },
  {
    slug: "coroacao",
    roman: "II",
    label: "II · Coroação",
    title: "As Coroas",
    summary: "As coroas assinalam a união e a nova família em Deus.",
    icon: "crowns",
    body: [
      "No Rito da Coroação, os esposos são coroados, recebendo as coroas como sinal de sua união e de sua nova vida familiar em Cristo.",
      "As coroas representam a glória, a alegria e também o espírito de sacrifício da vida matrimonial cristã. O sacerdote une as mãos dos esposos e coloca as coroas sobre suas cabeças. A Igreja proclama: «Ó Senhor nosso Deus, coroa-os com glória e honra.»",
    ],
  },
  {
    slug: "calice-comum",
    roman: "III",
    label: "III · Cálice comum",
    title: "Uma vida compartilhada",
    summary: "Os esposos bebem do mesmo cálice, à memória das Bodas de Caná.",
    icon: "chalice",
    body: [
      "O esposo e a esposa bebem do mesmo cálice de vinho abençoado, símbolo de que compartilharão as alegrias, responsabilidades e dificuldades da vida matrimonial. O gesto também recorda as Bodas de Caná.",
      "A celebração termina com a tradicional Dança de Isaías, na qual o casal é conduzido três vezes ao redor da mesa sacramental.",
    ],
  },
];

export const ORDEM_NOTES: SacramentTopic[] = [
  {
    slug: "axios",
    title: "Áxios",
    summary: "«Ele é digno» — o povo confirma.",
    icon: "liturgy",
    body: [
      "Durante a liturgia de ordenação, a congregação e o clero proclamam Áxios — “ele é digno” — para confirmar o consentimento de todo o povo de Deus ao ministério do candidato.",
      "A ordenação dos graus maiores acontece na Divina Liturgia. O eleito é conduzido ao altar; o bispo impõe as mãos e invoca o Espírito Santo.",
    ],
  },
  {
    slug: "casados",
    title: "Casados",
    summary: "Diáconos e padres, no primeiro matrimônio.",
    icon: "church",
    body: [
      "A Igreja Ortodoxa permite a ordenação de homens casados para o diaconato e o presbiterado, desde que seja o primeiro casamento de ambos.",
      "Um padre casado não pode casar-se novamente se ficar viúvo. Quem entra no sacerdócio já solteiro permanece celibatário.",
    ],
  },
  {
    slug: "maiores-menores",
    title: "Maiores",
    summary: "Quirotonia no altar; menores, quirotesia.",
    icon: "synod",
    body: [
      "Diácono, presbítero e bispo são as ordens maiores: recebem a quirotonia, a imposição das mãos no altar, durante a Divina Liturgia. Só o bispo, em sucessão apostólica, completa este Mistério.",
      "As ordens menores — leitor e subdiácono — recebem a quirotesia, bênção distinta. Não conferem o sacerdócio sacramental.",
      "Na ordenação episcopal, o Evangelho aberto é colocado sobre a cabeça do eleito. O diácono é ordenado após a anáfora.",
    ],
  },
];

export const EUCARISTIA_GRID_CARDS: SacramentGridCard[] = [
  {
    slug: "o-misterio-dos-misterios",
    title: "O Mistério dos mistérios",
    kicker: "Eucaristia",
    image: "/videos/sacramentos/eucaristia.jpg?v=2",
    body: [
      "Eucaristia vem do grego eucharistía: ação de graças. É o Santo Mistério no qual o pão e o vinho, pelo Espírito Santo, se tornam o Corpo e o Sangue de Cristo — presença real, não mera figura.",
      "A Igreja oferece ao Pai o sacrifício de Cristo, no Espírito. Não se repete o Calvário: a Encarnação, a Ceia, a Cruz, a Ressurreição e a Ascensão se tornam presentes. Cristo é sacerdote e vítima.",
      "São João Damasceno ensina: se perguntarem como isso acontece, basta saber que é pelo Espírito Santo. O Mistério pertence ao Reino, e não se esgota na lógica deste mundo.",
    ],
  },
  {
    slug: "divina-liturgia",
    title: "A Divina Liturgia",
    kicker: "Anáfora e epiclese",
    image: "/media/liturgia-sao-joao-crisostomo.jpg",
    body: [
      "A Eucaristia se celebra na Divina Liturgia. A forma habitual do rito bizantino é a de São João Crisóstomo. Em certos dias solenes usa-se a de São Basílio, com anáfora mais longa.",
      "Há a Proskomedia (preparação do Cordeiro e das partículas), a Liturgia da Palavra (Apóstolo e Evangelho) e a Liturgia dos fiéis: Grande Entrada, Credo, anáfora e epiclese — a invocação do Espírito Santo sobre os dons e sobre o povo.",
      "Os fiéis comungam sob as duas espécies, com a colher, do mesmo pão e vinho oferecidos naquela Liturgia. Após o ofício distribui-se o antídoron, o pão abençoado, também aos visitantes.",
    ],
  },
  {
    slug: "preparacao-para-comungar",
    title: "Preparação para comungar",
    kicker: "Oração e jejum",
    image: "/media/liturgia-sao-basilio.jpg",
    body: [
      "Antes da Comunhão a Igreja reza: “Creio, Senhor, e confesso que Tu és verdadeiramente o Cristo… e que este é o Teu Corpo puríssimo e o Teu Sangue preciosíssimo.”",
      "A preparação inclui oração, jejum segundo a tradição recebida do confessor, reconciliação e, para os fiéis ortodoxos, a Confissão quando conveniente. Ninguém se aproxima do cálice por costume vazio.",
      "O sacerdote convida: “Com temor de Deus, fé e amor, aproximaivos.” Depois da Comunhão permanecem as orações de ação de graças. O detalhe do jejum pede-se ao confessor da comunidade.",
    ],
  },
  {
    slug: "quem-se-aproxima-do-calice",
    title: "Quem se aproxima do cálice",
    kicker: "Batismo e Crisma",
    image: "/media/hero-iconostase.jpg",
    body: [
      "Comungam os membros da Igreja iniciados pelo Batismo e pela Crisma, devidamente preparados — inclusive as crianças, porque a graça não espera a idade da razão.",
      "Visitantes não ortodoxos são acolhidos para rezar com o povo, mas não se aproximam do cálice. Isso não é hostilidade: é fidelidade ao Mistério. A Comunhão une ao mesmo Corpo e à mesma fé.",
      "Quem deseja a plena comunhão na Igreja fala com o sacerdote. A internet informa; a Igreja acolhe, catequiza e celebra.",
    ],
  },
];

export const MATRIMONIO_GRID_CARDS: SacramentGridCard[] = [
  {
    slug: "a-uniao-abencoada",
    title: "O grande Mistério",
    kicker: "Efésios 5",
    image: "/videos/sacramentos/matrimonio.jpg?v=2",
    body: [
      "O Matrimônio ortodoxo é Santo Mistério: o homem e a mulher se tornam uma só carne em Cristo. São Paulo chama a isto “grande mistério” e refere-o a Cristo e à Igreja (Ef 5,32).",
      "Não é um contrato civil com bênção acrescentada. A Igreja coroa os esposos para viverem o amor nupcial como ícone do amor de Cristo, que se entregou pela Igreja.",
      "A união que a Igreja abençoa é a do homem e da mulher. Quem deseja este Mistério procura o sacerdote da comunidade: a preparação pastoral é parte do caminho.",
    ],
  },
  {
    slug: "esponsais-e-coroaçao",
    title: "Esponsais e coroação",
    kicker: "Stefana",
    image: "/media/catequese-igreja.jpg",
    body: [
      "O rito bizantino tem duas partes. Nos Esponsais, à entrada do templo, abençoam-se as alianças: o compromisso se sela em nome do Pai, do Filho e do Espírito Santo.",
      "Na Coroação, o sacerdote une as mãos direitas dos noivos e impõe as coroas (stéfana). Elas significam a realeza da casa doméstica, a vitória da castidade e o martírio cotidiano do amor fiel. Canta-se: “Senhor nosso Deus, coroa-os de glória e honra.” Em muitas comunidades gregas o padrinho (koumbaros) troca as coroas três vezes.",
      "Lê-se Efésios 5,20-33 e o Evangelho das Bodas de Caná (Jo 2,1-11). O sacerdote conduz o casal três vezes em redor da mesa do Evangelho: a dança de Isaías, caminho comum em Cristo.",
    ],
  },
  {
    slug: "caná-e-o-calice-comum",
    title: "Caná e o cálice comum",
    kicker: "João 2",
    image: "/media/catequese-cristo.jpg",
    body: [
      "O Evangelho do Matrimônio é o primeiro sinal de Cristo: em Caná da Galileia, o Senhor transforma a água em vinho e permanece no centro da festa nupcial.",
      "Em muitos ritos bizantinos os esposos bebem do cálice comum, após o Pai-Nosso: partilha da mesma vida, da mesma graça, do mesmo caminho. Se a coroação se une à Divina Liturgia, este cálice cede lugar à própria Eucaristia.",
      "O casamento cristão não se basta a si mesmo: alimenta-se da Liturgia, do perdão e da vida da paróquia. Sem a Igreja, o rito fica incompleto.",
    ],
  },
  {
    slug: "preparacao-pastoral",
    title: "Preparação pastoral",
    kicker: "Com o sacerdote",
    image: "/media/igreja-ortodoxa-grega-no-brasil.jpg",
    body: [
      "A preparação faz-se com o sacerdote da comunidade: fé, liberdade dos noivos, vida sacramental e o que os cânones pedem para este Mistério. Não se improvisa no dia da festa.",
      "O padrinho ou madrinha (koumbaros / koumbara), quando a tradição local o pede, deve ser ortodoxo em paz com a Igreja: testemunha da fé, não apenas da festa.",
      "Datas, documentos e impedimentos litúrgicos (por exemplo, o tempo da Grande Quaresma) confirmam-se com o clero. O portal explica o Mistério; a Igreja local celebra e acompanha.",
    ],
  },
];

export const SACRAMENT_PATHS: SacramentPath[] = [
  {
    slug: "santos-misterios",
    kicker: "A graça visível",
    title: "Os Santos Mistérios",
    summary: "Ações de Cristo na Igreja. Por eles, a graça se torna visível.",
    image: "/media/hero-iconostase.jpg",
    imageClass: "object-cover object-[center_18%] group-hover:scale-105",
    body: [
      "A Igreja Ortodoxa chama os sacramentos de Santos Mistérios. São ações de Cristo na Igreja. Por eles, a graça se torna visível e a vida humana é transfigurada.",
      "Este portal apresenta sete Mistérios: Batismo, Crisma, Eucaristia, Confissão, Unção, Matrimônio e Ordem. O nome grego é mysterion: vemos um sinal visível e confessamos a graça invisível de Deus.",
      "O centro da fé ortodoxa não é uma lista. É uma Pessoa: Jesus Cristo. Os Mistérios existem para nos unir a Ele, no Corpo que é a Igreja.",
    ],
  },
  {
    slug: "batismo-crisma",
    kicker: "Nascer de novo",
    title: "Batismo e Crisma",
    summary: "Morrer e ressuscitar com Cristo: o rito, o Myron e a Comunhão.",
    image: "/media/catequese-batismo.jpg",
    imageClass: "object-[center_35%] group-hover:scale-105",
    body: [
      "No Batismo ortodoxo, o catecúmeno morre e ressuscita com Cristo. Em seguida recebe a Crisma, o selo do Espírito Santo, e é levado à Comunhão.",
      "O rito se faz por imersão, em nome do Pai e do Filho e do Espírito Santo. A Crisma — unção com o Santo Myron — é dada na mesma celebração. A Eucaristia completa a iniciação.",
      "As crianças das famílias ortodoxas são batizadas e crismadas cedo, porque a graça não espera a idade da razão. Adultos vindos de outras tradições passam por catequese e acompanhamento do sacerdote, que indica o modo canônico de recepção.",
      "Ninguém se batiza por curiosidade estética. Batiza-se para viver em Cristo, na Igreja.",
    ],
  },
  {
    slug: "divina-eucaristia",
    kicker: "O Mistério dos mistérios",
    title: "Divina Eucaristia",
    summary: "O Corpo e o Sangue de Cristo. Nela a Igreja se torna o que já é.",
    image: "/media/liturgia-sao-joao-crisostomo.jpg",
    imageClass: "object-cover object-[center_20%] group-hover:scale-105",
    body: [
      "A Divina Eucaristia é o Mistério dos mistérios: o Corpo e o Sangue de Cristo. Nela a Igreja se torna o que já é.",
      "A Divina Liturgia não é um espetáculo nem uma reunião meramente simbólica: é a atualização do Mistério pascal. A Igreja oferece ao Pai o sacrifício eucarístico de Cristo, no Espírito Santo.",
      "A Santa Comunhão é para os fiéis ortodoxos em paz com a Igreja e devidamente preparados — oração, jejum segundo a tradição recebida do confessor e, quando conveniente, a Confissão. Visitantes não ortodoxos são acolhidos, mas não se aproximam do cálice. Isso não é hostilidade: é fidelidade ao Mistério.",
    ],
  },
  {
    slug: "vida-nos-misterios",
    kicker: "Ao longo da vida",
    title: "Reconciliação e vocação",
    summary: "Confissão, Unção, Matrimônio e Ordem acompanham o fiel.",
    image: "/media/catequese-igreja.jpg",
    imageClass: "object-[center_28%] group-hover:scale-105",
    body: [
      "Além da iniciação cristã, a Igreja acompanha o fiel nos Mistérios da reconciliação, da cura, do matrimônio e da Ordem.",
      "A Confissão reconcilia o pecador com Deus e com a Igreja. A Unção dos enfermos pede a cura e a Comunhão aos doentes, quando canonicamente possível. O Matrimônio abençoa a união do homem e da mulher à imagem de Cristo e da Igreja. A Ordem constitui diáconos, presbíteros e bispos para o serviço.",
      "Procure o sacerdote da comunidade mais próxima. O portal explica os Mistérios; a Igreja local celebra e acompanha cada um.",
    ],
  },
];

export const SACRAMENT_TOPICS: SacramentTopic[] = [
  {
    slug: "batismo",
    title: "Batismo",
    greek: "Βάπτισμα",
    summary: "Imersão na morte e na ressurreição de Cristo, em nome da Santíssima Trindade.",
    icon: "baptism",
    body: [
      "A Igreja Ortodoxa chama os sacramentos de Santos Mistérios (μυστήρια). O Batismo é o nascimento na vida de Cristo: morremos e ressuscitamos com Ele (Rm 6). O rito bizantino se faz por imersão, em nome do Pai e do Filho e do Espírito Santo.",
      "As crianças das famílias ortodoxas são batizadas cedo, porque a graça não espera a idade da razão. Adultos que desejam entrar na Igreja passam por catequese e pelo acompanhamento do sacerdote, que indica o modo canônico de recepção.",
      "Na mesma celebração seguem-se a Crisma e, em regra, a Santa Comunhão. A iniciação ortodoxa é uma só: água, Myron e Eucaristia. Ninguém se batiza por curiosidade estética. Batiza-se para viver em Cristo, na Igreja.",
    ],
  },
  {
    slug: "crisma",
    title: "Crisma",
    greek: "Χρίσμα",
    summary: "O selo do dom do Espírito Santo, dado com o Santo Myron.",
    icon: "chrism",
    body: [
      "A Crisma (unção com o Santo Myron) é o Pentecostes pessoal do recém-batizado. O sacerdote unge os sentidos e proclama: «Selo do dom do Espírito Santo». Assim o fiel é marcado como membro pleno do povo de Deus.",
      "Na prática ortodoxa grega, a Crisma não se separa do Batismo: é dada na mesma celebração, inclusive às crianças. O Myron é o santo óleo consagrado pelos bispos e enviado às comunidades.",
      "A Eucaristia completa esta iniciação. Batismo, Crisma e Comunhão formam um só nascimento na vida da Igreja, não três etapas tardias.",
    ],
  },
  {
    slug: "eucaristia",
    title: "Eucaristia",
    greek: "Εὐχαριστία",
    summary: "O Corpo e o Sangue de Cristo na Divina Liturgia — o Mistério dos mistérios.",
    icon: "chalice",
    body: [
      "Eucaristia vem do grego eucharistía: ação de graças. O pão e o vinho, pela epiclese do Espírito Santo, se tornam o Corpo e o Sangue de Cristo — presença real, não mera figura. Nela a Igreja se torna o que já é.",
      "A forma habitual do rito bizantino é a Divina Liturgia de São João Crisóstomo. Os fiéis comungam sob as duas espécies, com a colher (labída). As crianças ortodoxas, já crismadas, também se aproximam do cálice. Após o ofício distribui-se o antídoron, o pão abençoado.",
      "Visitantes não ortodoxos são acolhidos para rezar, mas o cálice é para os fiéis iniciados pelo Batismo e pela Crisma, devidamente preparados. O detalhe do jejum e da Confissão pede-se ao confessor.",
    ],
  },
  {
    slug: "confissao",
    title: "Confissão",
    greek: "Μετάνοια",
    summary: "Metanoia: reconciliação com Deus e com a Igreja após o Batismo.",
    icon: "confession",
    body: [
      "A Confissão é o Mistério da metanoia — conversão do coração. A tradição ortodoxa chama-a também de «segundo batismo»: por ela se perdoam os pecados cometidos após a fonte batismal e o fiel se reconcilia com a Igreja.",
      "O sacerdote cobre o penitente com o epitrachílion, oferece conselho espiritual e pronuncia a absolvição. O segredo da confissão é guardado. Não se trata de um tribunal, mas de cura.",
      "As crianças comungam desde a iniciação. A Confissão regular começa quando já distinguem o bem e o mal, segundo a orientação do sacerdote. Para a Santa Comunhão, o ritmo da Confissão segue a tradição recebida do confessor.",
    ],
  },
  {
    slug: "uncao",
    title: "Unção dos enfermos",
    greek: "Εὐχέλαιον",
    summary: "Euchélaion: oração e óleo santo para a cura do corpo e da alma.",
    icon: "unction",
    body: [
      "A Unção dos enfermos, em grego euchélaion («oração do óleo»), segue a palavra de São Tiago: «Está alguém enfermo? Chame os presbíteros da Igreja» (Tg 5,14-15). Pede-se a graça de Deus sobre o corpo e a alma.",
      "Na Igreja Ortodoxa este Mistério não se reserva à hora da morte — não é a «extrema-unção» latina. Celebra-se em doença, fraqueza e, em algumas comunidades, também em tempos litúrgicos de cura, sempre com o sacerdote.",
      "A pastoral dos enfermos inclui visitas, oração e, quando canonicamente possível, a Unção e a Comunhão. Peça ao clero da comunidade mais próxima.",
    ],
  },
  {
    slug: "matrimonio",
    title: "Matrimônio",
    greek: "Γάμος",
    summary: "Coroação do homem e da mulher numa só carne, à imagem de Cristo e da Igreja.",
    icon: "crowns",
    body: [
      "O Matrimônio ortodoxo é Santo Mistério: o homem e a mulher se tornam uma só carne em Cristo. São Paulo chama a isto «grande mistério» e refere-o a Cristo e à Igreja (Ef 5,32).",
      "O rito bizantino tem Esponsais e Coroação. As coroas (stéfana) significam a realeza da casa doméstica e o martírio cotidiano do amor fiel. Lê-se Efésios 5 e o Evangelho das Bodas de Caná, onde Cristo abençoa o vinho do banquete nupcial.",
      "A preparação faz-se com o sacerdote da comunidade. Datas, documentos e o que os cânones pedem confirmam-se com o clero local — o portal explica o Mistério; a Igreja local celebra e acompanha cada casal.",
    ],
  },
  {
    slug: "ordem",
    title: "Ordem",
    greek: "Ἱερωσύνη",
    summary: "Quirotonia: o Espírito Santo constitui diáconos, presbíteros e bispos.",
    icon: "bishop",
    body: [
      "A Ordem é o Santo Mistério pelo qual o Espírito Santo, pela imposição das mãos do bispo (quirotonia), transmite a graça e a autoridade apostólica. O povo proclama Áxios — «ele é digno».",
      "O bispo preside a Igreja local e é o único que pode conferir as ordens sagradas. O presbítero pastoreia a comunidade e celebra os Mistérios. O diácono auxilia na liturgia e na caridade. As ordens menores recebem a quirotesia, bênção distinta.",
      "A Igreja permite a ordenação de homens casados para o diaconato e o presbiterado, no primeiro casamento. Os bispos são escolhidos entre monges ou padres celibatários. A vocação se discerne com o clero, não sozinho.",
    ],
  },
];
