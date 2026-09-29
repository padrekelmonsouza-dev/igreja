import { Link } from "react-router-dom";

const HIERARCHY_NEWS_CARDS = [
  {
    slug: "dom-leontios",
    title: "Dom Leontios de Noronha e Valdigem",
    kicker: "Sua Eminência Dom Leontios",
    image: "/media/card-dom-leontios.jpg",
    imageClass: "object-cover object-[center_18%]",
    meta: "De bendita e eterna memória",
    body: "De bendita e eterna memória, Sua Eminência Dom Leontios ocupou lugar de destaque na história da Ortodoxia Tradicional no Brasil. Como Arcebispo Metropolita da América do Sul, dedicou sua vida ao serviço da Santa Igreja, ao anúncio do Santo Evangelho e à preservação da fé ortodoxa recebida dos Santos Apóstolos e transmitida ao longo dos séculos pelos Santos Padres.",
  },
  {
    slug: "dom-eugenios-de-atenas",
    title: "O Arcebispo atual: Dom Eugenios de Atenas",
    kicker: "O Santo Sínodo de Sua Beatitude Eugenios de Atenas",
    image: "/media/card-dom-eugenios.jpg",
    imageClass: "object-cover object-center",
    meta: "Santo Sínodo",
    body: "O Santo Sínodo presidido por Sua Beatitude Eugenios de Atenas constitui a autoridade suprema da Igreja Ortodoxa Grega G.O.C., exercendo a responsabilidade de preservar a integridade da fé ortodoxa, a sucessão apostólica e a sagrada tradição recebida dos Santos Apóstolos, dos Santos Padres e dos Santos Concílios da Igreja.",
  },
  {
    slug: "padre-kelmon-luis",
    title: "Padre Kelmon Luís",
    kicker: "Eparquia de São Paulo",
    image: "/media/padre-kelmon-luis.jpg",
    imageClass: "object-cover object-[center_20%]",
    meta: "Nascimento: 21/10/1976 · Ordenação: 02/08/2015",
    body: "Padre Kelmon nasceu em Salvador, na Bahia, em 1976. Há mais de 30 anos vive a fé no dia a dia: formação, pastoral e o debate público. Começou na juventude, na Legião de Maria. Depois estudou Filosofia, Teologia e Pedagogia e atuou em missões e ações humanitárias.",
  },
] as const;

export function HierarchyNews() {
  return (
    <section className="site-section">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-serif leading-tight">
          <span className="block text-lg text-[#6E121C] sm:text-xl">No Brasil e no mundo</span>
          <span className="mt-1 block text-3xl text-[#1A0E0C] sm:text-4xl">Igreja Ortodoxa Grega</span>
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HIERARCHY_NEWS_CARDS.map((card) => (
            <article
              key={card.slug}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#d9e2ec] bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,.45)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#f6f1e8]">
                <img
                  src={card.image}
                  alt={card.title}
                  className={`h-full w-full ${card.imageClass}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="truncate font-serif text-lg leading-7 text-[#1b2430]">
                  {card.title}
                  <span className="font-sans text-sm font-medium text-burgundy"> · {card.kicker}</span>
                </h3>
                <p className="mt-3 h-[7.5rem] text-[15px] leading-6 text-stone line-clamp-5">{card.body}</p>
                <p className="mt-4 text-sm text-stone/70">{card.meta}</p>
                <Link
                  to={`/igreja/hierarquia/${card.slug}`}
                  className="mt-3 inline-flex w-fit items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-burgundy hover:underline"
                >
                  Ler perfil
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
