import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { COMMUNITIES } from "../data/communities";
import { FOOTER_INSTITUTIONAL, FOOTER_LEARN, FOOTER_LEGAL, SUPPORT_LINK } from "../data/navigation";
import { SITE, SITE_CONTACT } from "../data/site";
import { useSearchModal } from "./SearchModal";

export function Footer() {
  const { openSearch } = useSearchModal();

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") || "").trim();
    openSearch(q);
  }

  return (
    <footer className="w-full bg-white">
      <section className="flex h-20 w-full items-center bg-burgundy text-white">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between gap-4 px-4">
          <form onSubmit={onSearch} className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-xl">
            <label className="sr-only" htmlFor="footer-search">
              Pesquisar
            </label>
            <input
              id="footer-search"
              name="q"
              type="search"
              placeholder="Ex.: O que é a Divina Liturgia?"
              className="h-11 min-w-0 flex-1 rounded-full border-0 bg-white px-4 text-sm text-ink outline-none"
            />
            <button className="btn btn-gold h-11 min-h-11 shrink-0 px-5" type="submit">
              Pesquisar
            </button>
          </form>
          <p className="hidden shrink-0 font-serif text-lg text-white md:block lg:text-xl">
            O que você deseja conhecer sobre a Ortodoxia?
          </p>
        </div>
      </section>

      <div className="w-full bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img
              src="/media/brasao-goc.webp"
              alt="Brasão da Igreja Ortodoxa Grega G.O.C. no Brasil"
              width={112}
              height={112}
              className="mb-4 h-24 w-24 object-contain"
              loading="lazy"
              decoding="async"
            />
            <h2 className="font-serif text-2xl leading-tight">{SITE.name}</h2>
            <p className="mt-3 max-w-md text-stone">
              Portal institucional de fé, liturgia, história e comunidades da Igreja Ortodoxa Grega no Brasil.
            </p>
            <p className="mt-4 text-sm text-burgundy">{SITE.synod}</p>
            <p className="mt-3 text-sm text-stone">Mosteiro de São Basílio — {SITE_CONTACT.monasteryAddress}</p>
          </div>
          <div>
            <h3 className="font-serif text-lg">Igreja</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_INSTITUTIONAL.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-burgundy" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg">Conhecer</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LEARN.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-burgundy" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg">Comunidades</h3>
            <ul className="mt-4 space-y-2">
              {COMMUNITIES.map((community) => (
                <li key={community.slug}>
                  <Link className="hover:text-burgundy" to={community.href}>
                    {community.city}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="hover:text-burgundy" to="/contato">
                  Contato
                </Link>
              </li>
              <li>
                <Link className="hover:text-burgundy" to={SUPPORT_LINK.href}>
                  {SUPPORT_LINK.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-burgundy/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-stone sm:flex-row">
          <p>
            © {SITE.year} {SITE.name} — {SITE.synod}
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {FOOTER_LEGAL.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-burgundy" to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
