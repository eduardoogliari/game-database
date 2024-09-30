import logo from './logo.svg';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'
import Jogo from './pages/Jogo'
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
