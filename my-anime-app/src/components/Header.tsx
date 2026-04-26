import { Link } from "react-router-dom"
import logo from '../assets/logo.png';
import smallogo from "../assets/smallog.png"
import '../styles/index.scss';
import { useState } from 'react';
import { useAnimeStore } from "../store/Store.tsx";
import { Search } from "./Search.tsx";


export const Header = ()=>{
const selectedGenre = useAnimeStore((state) => state.selectedGenre);





const setGenre = useAnimeStore((state) => state.setGenre);

const isDark = useAnimeStore((state) => state.isDark);
  const toggleTheme = useAnimeStore((state) => state.toggleTheme);

const [isOpen, setIsOpen] = useState(false);

const toggleDropdown = () => {
    setIsGenresOpen(false);
    setIsOpen(!isOpen);}
const [isGenresOpen, setIsGenresOpen] = useState(false);
const toggleGenres = () => {
    setIsOpen(false)
    setIsGenresOpen(!isGenresOpen);
  };
    return(
        <header className="Header">
            <Link to={"/"}>
            <img src={logo} alt="SpiritBloom Logo" className="logo" />
            </Link>
            <Link to={"/"}>
            <img src={smallogo} alt="SpiritBloom Logo" className="Smallogo" />
            </Link>
            <Search></Search>


<div className="header-actions">
            <div className="dropdown-container">
  {/* Додаємо клік на кнопку */}
  <button onClick={toggleGenres} className="nav-btn2">
    Ganre
  </button>

  {/* Показуємо список тільки якщо isOpen === true */}
  {isGenresOpen && (
   <ul className="dropdown-menu">
  <li><span onClick={() => { setGenre(null); setIsGenresOpen(false); }} className={`genre-item ${selectedGenre === null ? 'active' : ''}`}>All</span></li>
  <li><span onClick={() => { setGenre(27); setIsGenresOpen(false); }} className={`genre-item ${selectedGenre === 27 ? 'active' : ''}`}>⚔️Shounen</span></li>
  <li><span onClick={() => { setGenre(62); setIsGenresOpen(false); }} className={`genre-item ${selectedGenre === 62 ? 'active' : ''}`}>✨Isekai</span></li>
  <li><span onClick={() => { setGenre(18); setIsGenresOpen(false); }} className={`genre-item ${selectedGenre === 18 ? 'active' : ''}`}>🤖Mecha</span></li>
  <li><span onClick={() => { setGenre(8); setIsGenresOpen(false); }} className={`genre-item ${selectedGenre === 8 ? 'active' : ''}`}>🎭Drama</span></li>
  <li><span onClick={() => { setGenre(41); setIsGenresOpen(false); }} className={`genre-item ${selectedGenre === 41 ? 'active' : ''}`}>🩸Seinen</span></li>
</ul>
  )}
</div>



            <div className="dropdown-container">
  {/* Додаємо клік на кнопку */}
  <button onClick={toggleDropdown} className="nav-btn">
    |||
  </button>

  {/* Показуємо список тільки якщо isOpen === true */}
  {isOpen && (
    <ul className="dropdown-menu">
      <li>
        <Link to="/FavoriteWatchlist" onClick={() => setIsOpen(false)}>⭐List</Link>
      </li>
     <li className="mobile-only">
      <div className="theme-toggle-track" onClick={toggleTheme}>
        <div className={`theme-toggle-thumb ${isDark ? '' : 'active'}`}></div>
      </div>
    </li>
    </ul>
  )}
</div>
            
            <div className="theme-toggle-track" onClick={toggleTheme}>
                <div className={`theme-toggle-thumb ${isDark ? '' : 'active'}`}></div>
            </div>
</div>
        </header>
    )
}