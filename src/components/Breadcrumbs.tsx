import { Link } from "react-router-dom";
import type { Crumb } from "../data/seo";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Trilha de navegação" className="mb-6 text-sm text-stone">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link to="/" className="hover:text-burgundy">
            Início
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-gold">
              ›
            </span>
            {index === crumbs.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.href} className="hover:text-burgundy">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
