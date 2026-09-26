import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ARTICLES } from "./data/content";
import { REDIRECTS } from "./data/redirects";
import { Home } from "./pages/Home";
import { Enciclopedia } from "./pages/Enciclopedia";
import { Faq } from "./pages/Faq";
import { Glossario } from "./pages/Glossario";
import { Hierarquia } from "./pages/Hierarquia";
import { Arcebispos } from "./pages/Arcebispos";
import { Paroquias } from "./pages/Paroquias";
import { ClergyProfile } from "./pages/ClergyProfile";
import { PedidoOracao } from "./pages/PedidoOracao";
import { Pesquisa } from "./pages/Pesquisa";
import { ArticlePage } from "./pages/ArticlePage";
import { NotFound } from "./pages/NotFound";
import { IgrejaHub, OrtodoxiaHub } from "./pages/Hubs";
import { OrtodoxiaIntro } from "./pages/OrtodoxiaIntro";
import { Comunidades } from "./pages/Comunidades";
import { CommunityPage } from "./pages/CommunityPage";
import { Calendario } from "./pages/Calendario";
import { Formacao, Noticias, Biblioteca, Videos, Eventos } from "./pages/CatalogPages";
import { Doacoes, Contato, PoliticaPrivacidade, TermosUso } from "./pages/InstitutionalPages";
import { Liturgia } from "./pages/Liturgia";
import { Catequese } from "./pages/Catequese";
import { Missoes } from "./pages/Missoes";

const DEDICATED_ARTICLE_PATHS = new Set([
  "/enciclopedia",
  "/noticias",
  "/videos",
  "/biblioteca",
  "/calendario",
  "/formacao",
  "/ortodoxia/o-que-e-a-ortodoxia",
  "/liturgia",
  "/catequese",
  "/missoes",
]);

function ClergyRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/igreja/hierarquia/${slug || ""}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/igreja" element={<IgrejaHub />} />
          <Route path="/igreja/arcebispos" element={<Arcebispos />} />
          <Route path="/paroquias" element={<Paroquias />} />
          <Route path="/clero" element={<Hierarquia />} />
          <Route path="/liturgia" element={<Liturgia />} />
          <Route path="/catequese" element={<Catequese />} />
          <Route path="/missoes" element={<Missoes />} />
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
    </BrowserRouter>
  );
}
