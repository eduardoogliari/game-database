import logo from './logo.svg';
import Home from './pages/Home.js'
import NotFound from './pages/NotFound.js'
import SearchPage from './pages/SearchPage.js'
import NavBar from './components/NavBar.js'
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
