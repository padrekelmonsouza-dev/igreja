export function QuemSomosIntro() {
  return (
    <section className="site-section bg-ivory px-4">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-burgundy">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Quem somos
          </p>
          <h2 className="mt-5 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl">
            Igreja Ortodoxa Grega
            <span className="block text-burgundy">G.O.C. no Brasil</span>
          </h2>
          <p className="mt-5 font-serif text-lg leading-7 text-stone">
            A Igreja Ortodoxa Grega G.O.C. no Brasil apresenta a fé apostólica, a Divina Liturgia e a vida das
            comunidades em comunhão com o Santo Sínodo de Eugenio de Atenas. G.O.C. refere-se aos Cristãos Ortodoxos
            Genuínos, na tradição velho-calendarista grega.
          </p>
          <div
            className="my-5 h-px w-full bg-[linear-gradient(90deg,#D4AF37,rgba(212,175,55,.2),transparent)]"
            aria-hidden="true"
          />
          <p className="text-[15px] leading-7 text-stone">
            Confessamos a Igreja una, santa, católica e apostólica; honramos os Santos Ícones, o jejum e o calendário
            patrístico. A presença ortodoxa no Brasil cresceu por missões, mosteiros, paróquias e o testemunho de
            clérigos e fiéis.
          </p>
          <p className="mt-3 text-[15px] leading-7 text-stone">
            Há comunidades, missões e o Mosteiro de São Basílio em Marapicu, Nova Iguaçu, com núcleos pastorais em São
            Paulo e no Rio de Janeiro.
          </p>
          <p className="mt-5 flex items-start gap-3 font-serif text-[15px] italic leading-6 text-stone">
            <span className="mt-0.5 text-xl not-italic leading-none text-gold" aria-hidden="true">
              ✦
            </span>
            <span>
              O convite permanece: <strong className="not-italic text-burgundy">vinde e vede.</strong>
            </span>
          </p>
        </div>
        <img
          src="/media/igreja-ortodoxa-grega-no-brasil.jpg"
          alt="Igreja Ortodoxa Grega G.O.C. no Brasil, Santo Sínodo de Eugenios de Atenas, Ortodoxia do Velho Calendário"
          width={600}
          height={600}
          className="aspect-square h-auto w-full rounded-[1.75rem] object-cover shadow-card ring-1 ring-gold/40"
        />
      </div>
    </section>
  );
}
