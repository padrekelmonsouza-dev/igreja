import { Link } from "react-router-dom";

type FeaturedPersonProps = {
  kicker: string;
  name: string;
  accent: string;
  image: string;
  imageAlt: string;
  cutout?: boolean;
  imagePosition?: string;
  lead: string;
  paragraphs: string[];
  quoteLead: string;
  quote: string;
  profileHref: string;
  profileLabel: string;
};

export function FeaturedPerson({
  kicker,
  name,
  accent,
  image,
  imageAlt,
  cutout,
  imagePosition,
  lead,
  paragraphs,
  quoteLead,
  quote,
  profileHref,
  profileLabel,
}: FeaturedPersonProps) {
  return (
    <section className="site-section bg-ivory px-4">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:grid-cols-[350px_minmax(0,1fr)] lg:gap-14">
        <div className="relative order-2 h-[493px] overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_30%,#9B2430_0%,#6E121C_55%,#3d0a10_100%)] shadow-card ring-1 ring-gold/40 md:order-none lg:h-[560px]">
          {cutout ? (
            <>
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[14%] h-56 w-56 -translate-x-1/2 rounded-full bg-gold/25 blur-3xl"
              />
              <img
                src={image}
                alt={imageAlt}
                className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,.45)]"
                loading="lazy"
                decoding="async"
              />
            </>
          ) : (
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover"
              style={{ objectPosition: imagePosition || "center" }}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="order-1 flex min-w-0 max-w-xl flex-col md:order-none">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-burgundy">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {kicker}
          </p>
          <h2 className="mt-5 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl">
            {name}
            <span className="block text-burgundy">{accent}</span>
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg leading-7 text-stone">{lead}</p>
          <div
            className="my-5 h-px w-full bg-[linear-gradient(90deg,#D4AF37,rgba(212,175,55,.2),transparent)]"
            aria-hidden="true"
          />
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-3 text-[15px] leading-7 text-stone first-of-type:mt-0">
              {paragraph}
            </p>
          ))}
          <p className="mt-5 flex items-start gap-3 font-serif text-[15px] italic leading-6 text-stone">
            <span className="mt-0.5 text-xl not-italic leading-none text-gold" aria-hidden="true">
              ✦
            </span>
            <span>
              {quoteLead} <strong className="not-italic text-burgundy">{quote}</strong>
            </span>
          </p>
          <Link to={profileHref} className="btn btn-burgundy mt-6 self-start text-white no-underline">
            {profileLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <FeaturedPerson
      kicker="Fundador"
      name="Padre Kelmon Luís"
      accent="fundador da Ordem"
      image="/media/padre-kelmon-fundador.png"
      imageAlt="Padre Kelmon Luís, fundador da Ordem de São José"
      cutout
      lead="A Ordem de São José foi fundada pelo Padre Kelmon Luís, presbítero da Eparquia de São Paulo."
      paragraphs={[
        "Inspirado em São José, guarda do Menino Jesus e da Santíssima Theotokos, o Padre Kelmon reuniu leigos e fiéis dispostos a servir com silêncio, trabalho e fidelidade: proteger a Igreja, a família e os mais frágeis.",
        "Sua caminhada de fé, formação e missão está contada na página de perfil, com a galeria «Minha história em fotos».",
      ]}
      quoteLead="São José, homem justo,"
      quote="rogai por nós."
      profileHref="/igreja/hierarquia/padre-kelmon-luis"
      profileLabel="Conhecer o Padre Kelmon"
    />
  );
}

export function AbbotSection() {
  return (
    <FeaturedPerson
      kicker="Arquimandrita (Abade)"
      name="Padre Júlio"
      accent="Abade do Mosteiro"
      image="/media/padre-julio-cesar-dos-santos.jpg"
      imageAlt="Arquimandrita Padre Júlio, Abade do Mosteiro de São Basílio"
      imagePosition="43% center"
      lead="O Padre Júlio é o atual Abade do Mosteiro de São Basílio, no Rio de Janeiro, onde as vocações são acompanhadas e a formação é recebida."
      paragraphs={[
        "Como pai espiritual da comunidade, o Abade guarda a regra monástica, preside a oração e acolhe os que buscam o silêncio de Deus. No mosteiro, quem sente o chamado à vida religiosa ou ao sacerdócio encontra acompanhamento, discernimento e uma formação enraizada na oração, na liturgia e na tradição dos Santos Padres.",
        "O Mosteiro de São Basílio é também casa de acolhida para os fiéis que desejam rezar, confessar-se e pedir conselho espiritual.",
      ]}
      quoteLead="São Basílio Magno,"
      quote="rogai por nós."
      profileHref="/igreja/hierarquia/padre-julio-cesar-dos-santos"
      profileLabel="Ver perfil do Padre Júlio"
    />
  );
}
