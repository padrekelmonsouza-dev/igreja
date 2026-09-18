import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { OfficialNotice } from "../components/ShareBar";
import { LITURGICAL_FASTS, LITURGICAL_NOTE, MAJOR_FEASTS, MONTH_NAMES, WEEKDAY_NAMES } from "../data/calendar";
import { getArticle } from "../data/content";

export function Calendario() {
  const article = getArticle("/calendario");
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1);
    const start = first.getDay();
    const days = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const total = Math.ceil((start + days) / 7) * 7;
    return Array.from({ length: total }, (_, index) => {
      const day = index - start + 1;
      return day >= 1 && day <= days ? day : null;
    });
  }, [cursor]);

  function shift(delta: number) {
    setCursor((current) => {
      const date = new Date(current.year, current.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  return (
    <>
      <PageHero
        kicker="O tempo da Igreja"
        title="Calendário litúrgico ortodoxo"
        intro={article?.intro || "Festas, santos e jejuns do calendário patrístico."}
        crumbs={[{ href: "/calendario", label: "Calendário" }]}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <button type="button" className="btn btn-outline-dark min-h-11 px-4" onClick={() => shift(-1)}>
              Mês anterior
            </button>
            <h2 className="font-serif text-2xl">
              {MONTH_NAMES[cursor.month]} {cursor.year}
            </h2>
            <button type="button" className="btn btn-outline-dark min-h-11 px-4" onClick={() => shift(1)}>
              Próximo mês
            </button>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-burgundy/10 bg-white p-4">
            <div className="grid min-w-[32rem] grid-cols-7 gap-2 text-center text-sm font-semibold text-burgundy">
              {WEEKDAY_NAMES.map((name) => (
                <div key={name} className="py-2">
                  {name}
                </div>
              ))}
              {cells.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-16 rounded-2xl p-2 ${day === today.getDate() && cursor.month === today.getMonth() && cursor.year === today.getFullYear() ? "bg-burgundy text-ivory" : "bg-ivory"}`}
                >
                  {day || ""}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <OfficialNotice>{LITURGICAL_NOTE}</OfficialNotice>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl bg-burgundy p-6 text-ivory">
            <p className="text-sm uppercase tracking-[0.2em] text-gold-soft">Próxima celebração</p>
            <h2 className="mt-3 font-serif text-3xl">Confirme com a comunidade</h2>
            <p className="mt-3 text-ivory/80">
              Datas civis específicas e horários da Divina Liturgia serão publicados quando oficiais.
            </p>
            <Link className="btn btn-gold mt-6" to="/comunidades">
              Encontrar uma Igreja
            </Link>
          </div>
          <div className="rounded-3xl border border-burgundy/10 bg-white p-6">
            <h2 className="font-serif text-2xl">Grandes festas</h2>
            <ul className="mt-4 space-y-3">
              {MAJOR_FEASTS.map((feast) => (
                <li key={feast.name}>
                  <strong>{feast.name}.</strong> {feast.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-burgundy/10 bg-white p-6">
            <h2 className="font-serif text-2xl">Jejuns</h2>
            <ul className="mt-4 space-y-3">
              {LITURGICAL_FASTS.map((fast) => (
                <li key={fast.name}>
                  <strong>{fast.name}.</strong> {fast.description}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
      {article ? (
        <article className="mx-auto max-w-4xl px-4 pb-16">
          {article.sections.map((section) => (
            <section key={section.title} className="mb-8">
              <h2 className="font-serif text-3xl">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-lg leading-8 text-[#3a342d]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      ) : null}
    </>
  );
}
