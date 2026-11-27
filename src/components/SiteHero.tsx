import { Link, useLocation } from "react-router-dom";
import { SITE } from "../data/site";
import { exploreCta } from "../lib/exploreCta";

export function SiteHero() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const cta = exploreCta(pathname);
  const TitleTag = isHome ? "h1" : "p";

  return (
    <section className="full-bleed relative isolate overflow-hidden text-white">
      <picture>
        <source srcSet="/media/hero-iconostase.webp" type="image/webp" />
        <img
          src="/media/hero-iconostase.jpg"
          alt="Interior de templo ortodoxo com iconóstase, ícones, cruz e velas"
          width={1024}
          height={320}
          fetchPriority={isHome ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col justify-center px-4 py-12 lg:min-h-[28rem] lg:py-16">
        <p className="sr-only">
          {SITE.homeHeadline}. {SITE.synod}.
        </p>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <TitleTag className="font-serif text-5xl font-bold leading-[0.95] text-[#F6E08A] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-6xl lg:text-7xl">
              {SITE.motto}
            </TitleTag>
            <p className="hero-lead mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              O lugar para entender a fé ortodoxa em português: o que é a Igreja Ortodoxa, a Divina Liturgia, os
              Santos, os ícones, o jejum e onde encontrar uma{" "}
              <span className="whitespace-nowrap">comunidade</span> no Brasil.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/ortodoxia/o-que-e-a-ortodoxia"
              className="flex min-h-12 items-center justify-center rounded-full border border-white/80 px-4 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
            >
              O que é a Igreja Ortodoxa
            </Link>
            <Link
              to="/comunidades"
              className="flex min-h-12 items-center justify-center rounded-full border border-white/80 px-4 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
            >
              Encontrar uma comunidade
            </Link>
          </div>
        </div>

        <a
          href={cta.href}
          className="mt-10 inline-flex items-center justify-center gap-2 self-center text-sm text-white/90 transition hover:text-white"
        >
          {cta.label}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
