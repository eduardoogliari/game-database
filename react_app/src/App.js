import logo from './logo.svg';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'
import Jogo from './pages/Jogo'
import Plataforma from './pages/Plataforma'
import Empresa from './pages/Empresa'
import NavBar from './components/NavBar'
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/jogo/:id" element={<Jogo />}></Route>
        <Route path="/jogo" element={<Jogo />}></Route>
        <Route path="/empresa" element={<Empresa />}></Route>
        <Route path="/empresa/:id" element={<Empresa />}></Route>
        <Route path="/plataforma" element={<Plataforma />}></Route>
        <Route path="/plataforma/:id" element={<Plataforma />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
