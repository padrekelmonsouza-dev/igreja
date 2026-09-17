import { Link } from "react-router-dom";
import type { ArticlePage } from "../data/content";

export function PageHero({
  kicker,
  title,
  intro,
  crumbs,
}: {
  kicker: string;
  title: string;
  intro: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="border-b border-[rgba(90,13,24,.08)] bg-[linear-gradient(180deg,#fffaf0,rgba(246,239,223,.55))]">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {crumbs ? (
          <p className="mb-6 text-sm text-muted">
            <Link to="/" className="hover:text-burgundy">
              Início
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.href}>
                {" "}
                /{" "}
                <Link to={crumb.href} className="hover:text-burgundy">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
        <p className="kicker">{kicker}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{intro}</p>
      </div>
    </section>
  );
}

export function ArticleBody({ page }: { page: ArticlePage }) {
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
    </article>
  );
}
