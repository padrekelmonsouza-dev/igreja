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
      kicker="Presidente"
      name="Padre Kelmon Luís"
      accent="idealizador do Foro do Brasil"
      image="/media/padre-kelmon-fundador.png"
      imageAlt="Padre Kelmon Luís, idealizador e presidente do Foro do Brasil"
      cutout
      lead="O Foro do Brasil foi idealizado pelo Padre Kelmon Luís, presbítero da Eparquia de São Paulo, que preside o movimento."
      paragraphs={[
        "Iniciado em 29 de junho de 2023, o Foro do Brasil reúne pessoas de todo o país em defesa da liberdade, da livre expressão, dos direitos dos cidadãos e da dignidade humana.",
        "Sua caminhada de fé, formação e missão está contada na página de perfil, com a galeria «Minha história em fotos».",
      ]}
      quoteLead="Pelo Brasil que acreditamos,"
      quote="pelos direitos que defendemos."
      profileHref="/igreja/hierarquia/padre-kelmon-luis"
      profileLabel="Conhecer o Padre Kelmon"
    />
  );
}

const FORO_LINKS = [
  { href: "https://forobrasil.org/", label: "Site oficial" },
  { href: "https://forobrasil.org/contato/", label: "Faça parte" },
  { href: "https://www.instagram.com/forodobrasilbr", label: "Instagram" },
  { href: "https://www.youtube.com/@forodobrasil-br", label: "YouTube" },
] as const;

export function ForoLinks() {
  return (
    <section className="mx-auto w-full max-w-site px-4 pb-14">
      <div className="rounded-3xl border border-burgundy/10 bg-white p-6 sm:p-8">
        <p className="kicker">Foro do Brasil</p>
        <h2 className="mt-3 font-serif text-3xl">Acompanhe o movimento.</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {FORO_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={index === 0 ? "btn btn-burgundy" : "btn btn-outline-dark"}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
