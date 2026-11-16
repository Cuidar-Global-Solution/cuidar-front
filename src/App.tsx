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
import CadastroCuidador from './routes/CadastroCuidador'

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login",
    isCadastroPage = location.pathname === "/cadastro",
    CadastroFamiliarPage = location.pathname === "/cadastro/familiar",
    CadastroCuidadorPage = location.pathname === "/cadastro/cuidador";
  return (
    <>
      {!isLoginPage && !isCadastroPage && !CadastroFamiliarPage && !CadastroCuidadorPage && <Header />}

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
        </Routes>
      </main>

      {!isLoginPage && !isCadastroPage && !CadastroFamiliarPage && !CadastroCuidadorPage && <Footer />}
    </>
  );
}

export default App;
