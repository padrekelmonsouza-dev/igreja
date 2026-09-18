import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ARTICLES } from "./data/content";
import { REDIRECTS } from "./data/redirects";

const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const Enciclopedia = lazy(() => import("./pages/Enciclopedia").then((m) => ({ default: m.Enciclopedia })));
const Faq = lazy(() => import("./pages/Faq").then((m) => ({ default: m.Faq })));
const Glossario = lazy(() => import("./pages/Glossario").then((m) => ({ default: m.Glossario })));
const Hierarquia = lazy(() => import("./pages/Hierarquia").then((m) => ({ default: m.Hierarquia })));
const ClergyProfile = lazy(() => import("./pages/ClergyProfile").then((m) => ({ default: m.ClergyProfile })));
const PedidoOracao = lazy(() => import("./pages/PedidoOracao").then((m) => ({ default: m.PedidoOracao })));
const Pesquisa = lazy(() => import("./pages/Pesquisa").then((m) => ({ default: m.Pesquisa })));
const ArticlePage = lazy(() => import("./pages/ArticlePage").then((m) => ({ default: m.ArticlePage })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));
const IgrejaHub = lazy(() => import("./pages/Hubs").then((m) => ({ default: m.IgrejaHub })));
const OrtodoxiaHub = lazy(() => import("./pages/Hubs").then((m) => ({ default: m.OrtodoxiaHub })));
const OrtodoxiaIntro = lazy(() => import("./pages/OrtodoxiaIntro").then((m) => ({ default: m.OrtodoxiaIntro })));
const Comunidades = lazy(() => import("./pages/Comunidades").then((m) => ({ default: m.Comunidades })));
const CommunityPage = lazy(() => import("./pages/CommunityPage").then((m) => ({ default: m.CommunityPage })));
const Calendario = lazy(() => import("./pages/Calendario").then((m) => ({ default: m.Calendario })));
const Formacao = lazy(() => import("./pages/CatalogPages").then((m) => ({ default: m.Formacao })));
const Noticias = lazy(() => import("./pages/CatalogPages").then((m) => ({ default: m.Noticias })));
const Biblioteca = lazy(() => import("./pages/CatalogPages").then((m) => ({ default: m.Biblioteca })));
const Videos = lazy(() => import("./pages/CatalogPages").then((m) => ({ default: m.Videos })));
const Eventos = lazy(() => import("./pages/CatalogPages").then((m) => ({ default: m.Eventos })));
const Doacoes = lazy(() => import("./pages/InstitutionalPages").then((m) => ({ default: m.Doacoes })));
const Contato = lazy(() => import("./pages/InstitutionalPages").then((m) => ({ default: m.Contato })));
const PoliticaPrivacidade = lazy(() => import("./pages/InstitutionalPages").then((m) => ({ default: m.PoliticaPrivacidade })));
const TermosUso = lazy(() => import("./pages/InstitutionalPages").then((m) => ({ default: m.TermosUso })));

const DEDICATED_ARTICLE_PATHS = new Set([
  "/enciclopedia",
  "/noticias",
  "/videos",
  "/biblioteca",
  "/calendario",
  "/formacao",
  "/ortodoxia/o-que-e-a-ortodoxia",
]);

function PageLoader() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 text-stone" role="status">
      Carregando...
    </div>
  );
}

function ClergyRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/igreja/hierarquia/${slug || ""}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/igreja" element={<IgrejaHub />} />
            <Route path="/ortodoxia" element={<OrtodoxiaHub />} />
            <Route path="/ortodoxia/o-que-e-a-ortodoxia" element={<OrtodoxiaIntro />} />
            <Route path="/comunidades" element={<Comunidades />} />
            <Route path="/comunidades/:slug" element={<CommunityPage />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/formacao" element={<Formacao />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/doacoes" element={<Doacoes />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            <Route path="/enciclopedia" element={<Enciclopedia />} />
            <Route path="/perguntas-frequentes" element={<Faq />} />
            <Route path="/glossario" element={<Glossario />} />
            <Route path="/igreja/hierarquia" element={<Hierarquia />} />
            <Route path="/igreja/hierarquia/:slug" element={<ClergyProfile />} />
            <Route path="/pedido-de-oracao" element={<PedidoOracao />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
            {ARTICLES.filter((page) => !DEDICATED_ARTICLE_PATHS.has(page.path)).map((page) => (
              <Route key={page.path} path={page.path} element={<ArticlePage />} />
            ))}
            {Object.entries(REDIRECTS).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="/hierarquia/:slug" element={<ClergyRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
