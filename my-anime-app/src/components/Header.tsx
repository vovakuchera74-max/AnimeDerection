import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import smallogo from '../assets/smallog.png';
import Photo from "../assets/Photo.png"
import '../styles/index.scss';
import { useState } from 'react';
import { useAnimeStore } from '../store/animeStore.tsx';
import { Search1 } from './SearchInput.tsx';
import { useAuth } from '../hooks/useAuth.ts'
import {
  Pencil,
  Sword,
  Wand2,
  Drama,
  Cpu,
  Wine,
  LayoutGrid,
  BookMarked,
  User,
  Check,X,BarChart3
} from 'lucide-react';
import { authApi } from '../api/authApi.ts';
export const Header = () => {


  const [IsChangeNameOpen,setIsChangeNameOpen]=useState(false)
  const [NewUsername,setNewUsername]=useState("")
const { user } = useAuth()
const username = user?.user_metadata?.username


const [isProfileOpen, setIsProfileOpen] = useState(false)

  const selectedGenre = useAnimeStore((state) => state.selectedGenre);

  const setGenre = useAnimeStore((state) => state.setGenre);

  const isDark = useAnimeStore((state) => state.isDark);
  const toggleTheme = useAnimeStore((state) => state.toggleTheme);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsGenresOpen(false);
    setIsOpen(!isOpen);
  };
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const toggleGenres = () => {
    setIsOpen(false);
    setIsGenresOpen(!isGenresOpen);
  };
  return (
    <header className="Header">
      <Link to={'/'}>
        <img src={logo} alt="SpiritBloom Logo" className="logo" />
      </Link>
      <Link to={'/'}>
        <img src={smallogo} alt="SpiritBloom Logo" className="Smallogo" />
      </Link>
      <Search1></Search1>

      <div className="header-actions">
        <div className="dropdown-container">
          <button onClick={toggleGenres} className="nav-btn2">
            Filter
          </button>



          {isGenresOpen && (
            <ul className="dropdown-menu">
              <li>
                <span
                  onClick={() => {
                    setGenre(null);
                    setIsGenresOpen(false);
                  }}
                  className={`genre-item ${selectedGenre === null ? 'active' : ''}`}
                >
                  <LayoutGrid size={16} /> All
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    setGenre(27);
                    setIsGenresOpen(false);
                  }}
                  className={`genre-item ${selectedGenre === 27 ? 'active' : ''}`}
                >
                  <Sword size={16} /> Shounen
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    setGenre(62);
                    setIsGenresOpen(false);
                  }}
                  className={`genre-item ${selectedGenre === 62 ? 'active' : ''}`}
                >
                  <Wand2 size={16} /> Isekai
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    setGenre(18);
                    setIsGenresOpen(false);
                  }}
                  className={`genre-item ${selectedGenre === 18 ? 'active' : ''}`}
                >
                  <Cpu size={16} /> Mecha
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    setGenre(8);
                    setIsGenresOpen(false);
                  }}
                  className={`genre-item ${selectedGenre === 8 ? 'active' : ''}`}
                >
                  <Drama size={16} /> Drama
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    setGenre(41);
                    setIsGenresOpen(false);
                  }}
                  className={`genre-item ${selectedGenre === 41 ? 'active' : ''}`}
                >
                  <Wine size={16} /> Seinen
                </span>
              </li>
            </ul>
          )}
        </div>

        <div className="dropdown-container">
          <button onClick={toggleDropdown} className="nav-btn">
            |||
          </button>

          {isOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/FavoriteWatchlist"
                  className="List_Book"
                  onClick={() => setIsOpen(false)}
                >
                 
                  <BookMarked size={18} /> List
                </Link>
              </li>
              <li>
                <button
                  className="User"
                  onClick={() =>{ 
                     setIsProfileOpen(true)
                    setIsOpen(false)}}
                >
                  <User size={22} />Account
                </button>
              </li>
                            <li>
                <Link
                  to="/FavoriteWatchlist"
                  className="List_Book"
                  onClick={() => setIsOpen(false)}
                >
                 
                  <BarChart3 size={18} /> Tierlist
                </Link>
              </li>
              <li className="mobile-only">
                <div className="theme-toggle-track" onClick={toggleTheme}>
                  <div
                    className={`theme-toggle-thumb ${isDark ? '' : 'active'}`}
                  ></div>
                </div>
              </li>
            </ul>
          )}
        </div>

        <div className="theme-toggle-track" onClick={toggleTheme}>
          <div className={`theme-toggle-thumb ${isDark ? '' : 'active'}`}></div>
        </div>
      </div>
      {isProfileOpen && (
  <div className="ProfileMenu">
    <div className="overlay" onClick={() =>{ setIsProfileOpen(false);setIsChangeNameOpen(false);}} />  {/* ← це */}
    <div className="ProfileBloc">
      <div className="ProfilePhoto"><img className='PhotoProfile' src={Photo} alt="" /></div>
       {IsChangeNameOpen ?
        <div className='ChangeName'>
           <input 
           className='inputname'
        type="text"
        value={NewUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder={username}
        autoFocus
      />
           <button className="btn-confirm" onClick={async () => {
        await authApi.updateUsername(NewUsername)
        setIsChangeNameOpen(false)
      }}><Check size={20} /></button>
      <button className="btn-cancel" onClick={() => setIsChangeNameOpen(false)}><X size={20} /></button>
           
           </div>
        :
        <div className="ProfileName">{username}  <Pencil size={20} onClick={() => setIsChangeNameOpen(!IsChangeNameOpen)} style={{cursor: 'pointer', marginLeft: '8px'}} /></div>
        }
      <div className="LogoutButton">
        <button onClick={() => {
      authApi.signOut()
      setIsProfileOpen(false)
    }}>Log out</button>
      </div>
    </div>
  </div>
)}
    </header>
  );
};
