import type { NavIconName } from "../components/NavIcon";

export type LiturgyRite = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  image: string;
  imageClass?: string;
  body: string[];
};

export type LiturgyTopic = {
  slug: string;
  title: string;
  summary: string;
  icon: NavIconName;
  body: string[];
};

export const LITURGY_RITES: LiturgyRite[] = [
  {
    slug: "sao-joao-crisostomo",
    kicker: "Rito bizantino",
    title: "Liturgia de São João Crisóstomo",
    summary: "A liturgia mais celebrada no rito bizantino: o coração habitual da Divina Liturgia.",
    image: "/media/liturgia-sao-joao-crisostomo.jpg",
    imageClass: "object-cover object-[center_20%]",
    body: [
      "A Divina Liturgia de São João Crisóstomo é a formulação eucarística mais usada nas Igrejas do rito bizantino. São João, arcebispo de Constantinopla no século IV e chamado Crisóstomo, “boca de ouro”, é associado à revisão e ao ordenamento de orações já recebidas da Tradição, sobretudo as orações sacerdotais.",
      "A estrutura clássica tem três tempos. A Proskomedia, no altar da prothesis, prepara o pão e o vinho: o Cordeiro é recortado, o cálice recebe vinho e água, e partículas são dispostas em memória da Theotokos, dos santos, dos vivos e dos falecidos. Esse rito evoca a vida oculta de Cristo, Belém e o sepulcro.",
      "Segue a Liturgia da Palavra, ou dos catecúmenos: bênção do Reino, grandes litanias, antífonas, o hino “Ó Filho Unigênito”, Pequena Entrada, Triságio, Apóstolo, Evangelho e homilia. É o tempo da proclamação pública do Evangelho.",
      "A Liturgia dos fiéis traz o Hino Querúbico, a Grande Entrada, o Credo, a anáfora — ação de graças, Sanctus, anamnese da Ceia e epiclese do Espírito Santo —, o Pai-Nosso, a Comunhão e a ação de graças. O visitante é bem-vindo a rezar com o povo; a Santa Comunhão permanece reservada aos fiéis ortodoxos preparados.",
      "Ao longo dos séculos o formulário recebeu hinos e ritos — Triságio, Querubikon, Credo, transferência da Proskomedia para o início —, mas o eixo permanece o mesmo: o Mistério pascal oferecido ao Pai, no Espírito Santo.",
    ],
  },
  {
    slug: "sao-basilio",
    kicker: "Rito bizantino",
    title: "Liturgia de São Basílio",
    summary: "A mesma ordem bizantina, com orações sacerdotais mais longas, reservada a dias solenes.",
    image: "/media/liturgia-sao-basilio.jpg",
    imageClass: "object-cover object-[center_18%]",
    body: [
      "A Divina Liturgia de São Basílio Magno, arcebispo de Cesareia da Capadócia no século IV, é a outra grande formulação do rito bizantino. Antes do século X era a liturgia dominical mais frequente em Constantinopla; depois cedeu o uso cotidiano à de São João Crisóstomo, mais breve.",
      "Hoje o rito bizantino a reserva, em regra, a cerca de dez celebrações no ano: 1º de janeiro, festa de São Basílio; os cinco domingos da Grande Quaresma, excluído o Domingo de Ramos; Quinta e Sábado Santos; e as vésperas do Natal e da Teofania — ou o próprio dia da festa, se esta cair em domingo ou segunda.",
      "A ordem visível é a mesma da Liturgia de São João: Proskomedia, Liturgia da Palavra e Liturgia eucarística. A diferença está sobretudo nas orações do sacerdote, em especial a anáfora, mais longa e teológica: percorre a criação, a queda, a aliança e a obra de Cristo, e amplia as intercessões após a consagração.",
      "No lugar do “É verdadeiramente digno” canta-se, ao fim da anáfora, o hino mariano “Toda a criação”. As respostas do coro costumam ser mais ornamentadas, para acompanhar as orações mais extensas.",
      "Não é uma liturgia penitencial, embora muitos a associem à Quaresma. É um formulário mais antigo e mais amplo da história da salvação, usado nos dias em que a Igreja quer detê-la com maior vagar.",
    ],
  },
  {
    slug: "sao-tiago",
    kicker: "Jerusalém",
    title: "Liturgia de São Tiago",
    summary: "Uma das mais antigas liturgias eucarísticas, ligada a Jerusalém e ao irmão do Senhor.",
    image: "/media/liturgia-sao-tiago.jpg",
    imageClass: "object-cover object-top",
    body: [
      "A Divina Liturgia de São Tiago, irmão do Senhor — em português também chamado São Thiago —, é uma das mais antigas anáforas ainda vivas na Igreja. A Tradição a liga à Igreja de Jerusalém e a São Tiago, primeiro bispo da cidade santa.",
      "O texto conservado, em grego e em outras línguas do Oriente, é mais extenso que as liturgias de Crisóstomo e de Basílio. A anáfora é ampla, trinitária e intercessória. Em algumas celebrações o sacerdote permanece no centro da nave em certos momentos, sinal da origem hierosolimita do rito.",
      "Nas Igrejas ortodoxas de rito bizantino ela não substitui o uso dominical habitual. Costuma ser celebrada de forma excepcional, sobretudo na festa de São Tiago, a 23 de outubro, e em contextos ligados ao Patriarcado de Jerusalém ou a seminários e mosteiros que a preservam.",
      "Estudiosos veem nela um testemunho da liturgia do Oriente antigo, que influenciou, em parte, o desenvolvimento posterior das liturgias constantinopolitanas. Por isso a Igreja a honra como memória viva, não como curiosidade arqueológica.",
      "Neste portal ela é apresentada como uma das três principais liturgias ortodoxas, ao lado das de São João Crisóstomo e de São Basílio. A celebração habitual das comunidades deste portal segue o rito bizantino.",
    ],
  },
  {
    slug: "liturgia-latina",
    kicker: "Complemento",
    title: "Liturgia latina",
    summary: "O rito romano do primeiro milênio e o uso ocidental em algumas jurisdições ortodoxas.",
    image: "/media/liturgia-latina.jpg",
    imageClass: "object-cover object-[center_32%]",
    body: [
      "A liturgia latina, ou rito romano, é a forma eucarística clássica do Ocidente. Em sua camada mais antiga — organizada de modo estável na época de São Gregório Magno, no século VI — ela pertence ao patrimônio comum do primeiro milênio, quando Roma e o Oriente ainda compartilhavam a mesma fé.",
      "O rito romano clássico se reconhece pela sobriedade: introito, Kyrie, Glória, leituras, ofertório, Cânon Romano, Pai-Nosso e Comunhão. Difere do rito bizantino no canto, no iconóstase, nas procissões e no modo de dispor o altar, mas o centro é o mesmo: o sacrifício eucarístico de Cristo.",
      "Algumas jurisdições ortodoxas, sobretudo no Ocidente, autorizam um rito ocidental corrigido — por vezes chamado Liturgia de São Gregório —, com a omissão do Filioque e acréscimos que deixam explícita a epiclese. Esse uso não é universal e não substitui o rito bizantino nas Igrejas gregas.",
      "As comunidades apresentadas neste portal celebram a Divina Liturgia no rito bizantino. A liturgia latina entra aqui como complemento histórico e catequético: para entender o Ocidente antigo e o diálogo com quem vem da missa romana, sem afirmar um rito oficial desta Igreja no Brasil enquanto isso não for publicado.",
    ],
  },
];

export const LITURGY_TOPICS: LiturgyTopic[] = [
  {
    slug: "o-que-e",
    title: "O que é",
    summary: "O coração da vida ortodoxa: o Mistério pascal oferecido ao Pai.",
    icon: "liturgy",
    body: [
      "A Divina Liturgia é o coração da vida ortodoxa. Nela, a Igreja oferece ao Pai o sacrifício eucarístico de Cristo, no Espírito Santo. Não é um espetáculo nem uma reunião meramente simbólica: é a atualização do Mistério pascal.",
      "Nas Igrejas do rito bizantino, o formulário habitual é o de São João Crisóstomo. Em dias solenes usa-se o de São Basílio; em certas festas, o de São Tiago. O nome “Divina Liturgia” marca que o que acontece no altar é obra de Deus, não um rito inventado pela comunidade.",
    ],
  },
  {
    slug: "como-funciona",
    title: "Como funciona",
    summary: "Canto, incenso, leituras e um só corpo orante.",
    icon: "church",
    body: [
      "A celebração se desenvolve em cantos, incenso, procissões, leituras e orações. O sacerdote, os diáconos, o coro e o povo formam um só corpo orante. O visitante pode permanecer em pé, acompanhar os sinais da cruz e observar o ritmo da Igreja.",
      "Quase tudo é cantado. Não há um “programa” anunciado a cada minuto: o tempo da Igreja se reconhece pelos hinos, pelas Portas Reais e pelo movimento do cálice. Quem chega pela primeira vez pode simplesmente ficar com o povo e deixar o ofício ensinar.",
    ],
  },
  {
    slug: "partes",
    title: "Partes da Liturgia",
    summary: "Proskomedia, Palavra e Eucaristia: cada gesto fala de Cristo.",
    icon: "book",
    body: [
      "De modo geral, há a Proskomedia (preparação dos dons), a Liturgia da Palavra (antífonas, Triságio, Apóstolo e Evangelho) e a Liturgia Eucarística (Querubikon, anáfora, Comunhão e ação de graças).",
      "A Proskomedia evoca a vida oculta de Cristo; a Palavra, o anúncio público do Evangelho; a Eucaristia, a Paixão, a Ressurreição e a comunhão do Corpo de Cristo.",
      "Cada gesto tem sentido: as Portas Reais, o véu, o ícone, o cálice, o pão e o vinho falam da Encarnação, da Cruz e da Ressurreição.",
    ],
  },
  {
    slug: "preparacao",
    title: "Como se preparar",
    summary: "Oração, jejum, reconciliação e o lugar do visitante.",
    icon: "prayer",
    body: [
      "A preparação inclui oração, jejum segundo a tradição recebida do confessor, reconciliação e, para os fiéis ortodoxos, a Confissão quando conveniente. Visitantes não ortodoxos são acolhidos, mas a Santa Comunhão é reservada aos fiéis da Igreja devidamente preparados.",
      "Quem visita pela primeira vez não precisa jejuar nem saber os hinos. Basta chegar com recato, permanecer no templo e, se quiser, conversar com o sacerdote ao final.",
    ],
  },
  {
    slug: "o-que-esperar",
    title: "O que esperar",
    summary: "Beleza, silêncio, canto e um tempo mais longo.",
    icon: "calendar",
    body: [
      "Espere beleza, silêncio, canto e uma duração maior do que muitas celebrações ocidentais. A Divina Liturgia costuma durar de uma hora e meia a duas horas, mais em festas.",
      "Não é necessário compreender cada palavra na primeira visita. Deixe o coração aprender com os olhos, os ouvidos e o corpo.",
    ],
  },
  {
    slug: "primeira-visita",
    title: "Primeira visita",
    summary: "Como chegar, vestir-se e ser acolhido.",
    icon: "door",
    body: [
      "Você é bem-vindo. Vista-se com recato, chegue alguns minutos antes, evite conversas durante os ofícios e, ao final, cumprimente o sacerdote. Se quiser, apresente-se: a Igreja gosta de conhecer quem chega.",
      "Em muitas comunidades as mulheres levam um véu ou lenço. Não é preciso saber grego ou eslavo: várias celebrações no Brasil usam o português, às vezes com hinos em grego.",
    ],
  },
];
