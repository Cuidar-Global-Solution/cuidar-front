
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './routes/Home'
import Sobre from './routes/Sobre'
import Solucao from './routes/Solucao'
import FAQ from './routes/Faq'
import Contato from './routes/Contato'
import Integrantes from './routes/Integrantes'

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/integrantes" element={<Integrantes />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
