import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_KNOWLEDGE, NAV_MORE, NAV_PRIMARY, SITE } from "../data/content";
import { NavLabel } from "./NavIcon";

export function Footer() {
  const navigate = useNavigate();

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const q = String(data.get("q") || "").trim();
    navigate(q ? `/pesquisa?q=${encodeURIComponent(q)}` : "/pesquisa");
  }

  return (
    <footer className="mt-8 bg-cream">
      <section className="bg-[linear-gradient(135deg,#5a0d18,#8d2530)] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-soft">Pesquisa</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">O que você deseja conhecer sobre a Ortodoxia?</h2>
          <form onSubmit={onSearch} className="search-form mt-8">
            <label className="sr-only" htmlFor="footer-search">
              Pesquisar
            </label>
            <input
              id="footer-search"
              name="q"
              type="search"
              placeholder="Ex.: O que é a Divina Liturgia?"
              className="search-field flex-1 border-0 text-ink outline-none ring-2 ring-white/20"
            />
            <button className="btn btn-gold px-10" type="submit">
              Pesquisar
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-4">
        <div>
          <img src="/media/brasao-goc.jpg" alt="Brasão da Igreja Ortodoxa Grega G.O.C. no Brasil" className="mb-4 h-28 w-28 object-contain" />
          <h3 className="text-xl leading-tight">
            Igreja Ortodoxa
            <br />
            no Brasil
          </h3>
          <p className="mt-3 text-muted">Portal de referência da fé, da liturgia, da história e das comunidades ortodoxas.</p>
          <p className="mt-4 text-sm text-burgundy">{SITE.synod}</p>
        </div>
        <div>
          <h3 className="text-lg">Conhecer</h3>
          <ul className="mt-4 space-y-2">
            {NAV_KNOWLEDGE.map((link) => (
              <li key={link.href}>
                <Link className="inline-flex items-center gap-2 hover:text-burgundy" to={link.href}>
                  <NavLabel icon={link.icon} label={link.label}  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg">Igreja</h3>
          <ul className="mt-4 space-y-2">
            {NAV_PRIMARY.map((link) => (
              <li key={link.href}>
                <Link className="inline-flex items-center gap-2 hover:text-burgundy" to={link.href}>
                  <NavLabel icon={link.icon} label={link.label}  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg">Mais</h3>
          <ul className="mt-4 space-y-2">
            {NAV_MORE.map((link) => (
              <li key={link.href}>
                <Link className="inline-flex items-center gap-2 hover:text-burgundy" to={link.href}>
                  <NavLabel icon={link.icon} label={link.label}  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-[rgba(90,13,24,.14)] px-4 py-6 text-center text-sm text-muted">
        © {SITE.year} {SITE.name} — {SITE.synod}
      </p>
    </footer>
  );
}
