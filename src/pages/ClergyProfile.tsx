import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PageHero } from "../components/Article";
import { PhotoTimeline } from "../components/PhotoTimeline";
import { getClergy, isArchbishop } from "../data/clergy";

export function ClergyProfile() {
  const { slug } = useParams();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const person = slug ? getClergy(slug) : undefined;

  if (!person) {
    return <Navigate to="/clero" replace />;
  }

  if (slug && slug !== person.slug) {
    return <Navigate to={`/igreja/hierarquia/${person.slug}`} replace />;
  }

  const archbishop = isArchbishop(person.slug);
  const hasGallery = Boolean(person.timeline?.length);
  const section = person.sections.find((item) => item.title === openSection);

  return (
    <>
      <PageHero
        kicker={archbishop ? "Arcebispos" : "Clero"}
        title={person.name}
        intro={person.role}
        crumbs={
          archbishop
            ? [
                { href: "/igreja", label: "Igreja" },
                { href: "/arcebispos", label: "Arcebispos" },
                { href: `/igreja/hierarquia/${person.slug}`, label: person.name },
              ]
            : [
                { href: "/clero", label: "Clero" },
                { href: `/igreja/hierarquia/${person.slug}`, label: person.name },
              ]
        }
      />
      <article className="site-section mx-auto grid w-full max-w-site gap-10 px-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside>
          <img
            src={person.image}
            alt={person.name}
            className="w-full rounded-3xl object-cover shadow-card"
            loading="lazy"
            decoding="async"
          />
          {person.gallery?.length ? (
            <div className="mt-4 grid gap-3">
              {person.gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="w-full rounded-3xl object-cover shadow-card"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          ) : null}
          <div className="mt-5 rounded-3xl border border-burgundy/10 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-burgundy">Dados oficiais</p>
            <dl className="mt-4 space-y-3">
              {person.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-stone">{fact.label}</dt>
                  <dd className="text-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {hasGallery ? (
            <nav className="mt-5 grid gap-2" aria-label={`Sobre ${person.name}`}>
              {person.sections.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setOpenSection(item.title)}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-burgundy/10 bg-white px-5 py-4 text-left text-lg text-ink shadow-card transition hover:border-gold/60 hover:bg-ivory hover:text-burgundy"
                >
                  {item.title}
                  <span aria-hidden="true" className="text-burgundy">›</span>
                </button>
              ))}
              <Link className="btn btn-burgundy mt-3 w-full text-white no-underline" to={archbishop ? "/arcebispos" : "/clero"}>
                {archbishop ? "Ver os arcebispos" : "Ver todo o clero"}
              </Link>
            </nav>
          ) : null}
        </aside>
        {hasGallery ? (
          <div className="min-w-0">
            <PhotoTimeline eras={person.timeline!} name={person.name} />
          </div>
        ) : (
        <div className="prose-church">
          {person.sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-8 text-[#3a342d]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <Link className="btn btn-burgundy text-white no-underline" to={archbishop ? "/arcebispos" : "/clero"}>
            {archbishop ? "Ver os arcebispos" : "Ver todo o clero"}
          </Link>
        </div>
        )}
      </article>
      {section ? <SectionModal title={section.title} body={section.body} onClose={() => setOpenSection(null)} /> : null}
    </>
  );
}

function SectionModal({ title, body, onClose }: { title: string; body: string[]; onClose: () => void }) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="secao-modal-titulo"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gold/40 bg-cream p-6 shadow-card sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-burgundy text-xl text-gold hover:bg-burgundy-light"
        >
          ×
        </button>
        <h2 id="secao-modal-titulo" className="pr-12 font-serif text-3xl text-burgundy">
          {title}
        </h2>
        <div className="mt-2 h-0.5 w-16 rounded-full bg-gold" />
        <div className="mt-6 space-y-4">
          {body.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-8 text-[#3a342d]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
