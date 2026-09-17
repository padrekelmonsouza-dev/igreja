import { Link } from "react-router-dom";
import { ARTICLES } from "../data/content";

export function Related({ paths }: { paths?: string[] }) {
  const pages = (paths || [])
    .map((path) => ARTICLES.find((page) => page.path === path))
    .filter(Boolean);

  if (pages.length === 0) return null;

  return (
    <aside className="mx-auto max-w-4xl px-4 pb-16">
      <p className="kicker">Continue no portal</p>
      <h2 className="mt-2 font-serif text-3xl">Leia também</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {pages.map((page) =>
          page ? (
            <Link
              key={page.path}
              to={page.path}
              className="rounded-2xl border border-[rgba(90,13,24,.12)] bg-white p-5 hover:shadow-card"
            >
              <h3 className="text-xl">{page.title}</h3>
              <p className="mt-2 text-sm text-muted">{page.intro}</p>
            </Link>
          ) : null,
        )}
      </div>
    </aside>
  );
}
