import { Link } from "react-router-dom";
import type { ArticlePage } from "../data/content";
import type { Crumb } from "../data/seo";
import { ShareBar } from "./ShareBar";

export function PageHero({
  title,
}: {
  kicker: string;
  title: string;
  intro: string;
  crumbs?: Crumb[];
}) {
  return <h1 className="sr-only">{title}</h1>;
}

export function ArticleBody({ page, showShare = true }: { page: ArticlePage; showShare?: boolean }) {
  return (
    <article className="site-section mx-auto max-w-4xl px-4">
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
