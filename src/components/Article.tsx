import { Link } from "react-router-dom";
import type { ArticlePage } from "../data/content";
import type { Crumb } from "../data/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { ShareBar } from "./ShareBar";

export function PageHero({
  kicker,
  title,
  intro,
  crumbs,
}: {
  kicker: string;
  title: string;
  intro: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="border-b border-burgundy/10 bg-[linear-gradient(180deg,#f7f0dc,rgba(243,230,196,.45))]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
        <p className="kicker">{kicker}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone">{intro}</p>
      </div>
    </section>
  );
}

export function ArticleBody({ page, showShare = true }: { page: ArticlePage; showShare?: boolean }) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <div className="prose-church space-y-10">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-[#3a342d]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      {showShare ? <ShareBar title={page.title} path={page.path} /> : null}
    </article>
  );
}

export function HubGrid({
  items,
}: {
  items: { href: string; title: string; text: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="rounded-3xl border border-burgundy/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-card"
        >
          <h2 className="font-serif text-2xl">{item.title}</h2>
          <p className="mt-2 text-stone">{item.text}</p>
        </Link>
      ))}
    </div>
  );
}
