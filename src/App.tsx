import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ARTICLES } from "./data/content";
import { ArticlePage } from "./pages/ArticlePage";
import { ClergyProfile } from "./pages/ClergyProfile";
import { Hierarquia } from "./pages/Hierarquia";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Paroquias } from "./pages/Paroquias";
import { PedidoOracao } from "./pages/PedidoOracao";
import { Pesquisa } from "./pages/Pesquisa";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {ARTICLES.map((page) => (
            <Route key={page.path} path={page.path} element={<ArticlePage />} />
          ))}
          <Route path="/hierarquia" element={<Hierarquia />} />
          <Route path="/hierarquia/:slug" element={<ClergyProfile />} />
          <Route path="/paroquias" element={<Paroquias />} />
          <Route path="/comunidades" element={<Navigate to="/paroquias" replace />} />
          <Route path="/pedido-de-oracao" element={<PedidoOracao />} />
          <Route path="/pesquisa" element={<Pesquisa />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
