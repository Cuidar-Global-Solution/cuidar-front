
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Sobre from "./routes/Sobre";
import Solucao from "./routes/Solucao";
import Faq from "./routes/Faq";
import Contato from "./routes/Contato";
import Integrantes from "./routes/Integrantes";
import PerfilIntegrante from "./routes/PerfilIntegrante";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import CadastroFamiliar from "./routes/CadastroFamiliar";
import CadastroCuidador from "./routes/CadastroCuidador";
import DashboardFamiliar from "./routes/DashboardFamiliar";
import DashboardCuidador from "./routes/DashboardCuidador";
import DashboardPessoa from "./routes/DashboardPessoa";
import Conecta from './routes/Conecta'
import CadastroPessoa from './routes/CadastroPessoa'
import { ProtectedDashboard } from './auth/Session'

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname.startsWith("/cadastro");

  const isDashboardPage = location.pathname.startsWith("/dashboard");

  const showPublicLayout = !isAuthPage && !isDashboardPage;

  return (
    <>
      {showPublicLayout && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrantes/:id" element={<PerfilIntegrante />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro/familiar" element={<CadastroFamiliar />} />
          <Route path="/cadastro/cuidador" element={<CadastroCuidador />} />
          <Route element={<ProtectedDashboard perfil="FAMILIAR" />}>
            <Route path="/dashboard/familiar" element={<DashboardFamiliar />} />
          </Route>
          <Route element={<ProtectedDashboard perfil="PROFISSIONAL" />}>
            <Route path="/dashboard/cuidador" element={<DashboardCuidador />} />
          </Route>
          <Route element={<ProtectedDashboard perfil="ACOMPANHADO" />}>
            <Route path="/dashboard/pessoa" element={<DashboardPessoa />} />
          </Route>
          <Route path="/conecta" element={<Conecta />} />
          <Route path="/cadastro/pessoa" element={<CadastroPessoa />} />
        </Routes>
      </main>

      {showPublicLayout && <Footer />}
    </>
  );
}

export default App;
