import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'
import Jogo from './pages/Jogo'
import Plataforma from './pages/Plataforma'
import PlataformaInfo from './pages/PlataformaInfo'
import Empresa from './pages/Empresa'
import EmpresaInfo from './pages/EmpresaInfo'
import NavBar from './components/NavBar'
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/jogo/:id" element={<Jogo />}></Route>
        <Route path="/jogo" element={<Navigate to="/search" />}></Route>
        <Route path="/empresa" element={<Empresa />}></Route>
        <Route path="/empresa/:id" element={<EmpresaInfo />}></Route>
        <Route path="/plataforma" element={<Plataforma />}></Route>
        <Route path="/plataforma/:id?" element={<PlataformaInfo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
