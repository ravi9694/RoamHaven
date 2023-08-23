import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RoamHaven from '../assets/RoamHaven.png';
import { UserContext } from '../providers/UserProvider';
import SearchBar from './SearchBar';

export const Header = () => {
  const location = useLocation();

  const [showSearchBar, setShowSearchBar] = useState(true);
  const { user } = useContext(UserContext);
  const [hasShadow, setHasShadow] = useState(false);

  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    setHasShadow(shouldHaveShadow);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // hide searchbar based on url
    if (location.pathname === '/') {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
    // clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const MyStyle = {
    backgroundColor: 'black',
    color: 'white',
  };
  
  return (

    <header style={MyStyle}
      className={`flex w-screen justify-center fixed top-0 bg-white py-4 z-10 ${
        hasShadow ? 'shadow-md' : ''
      }`}
    >
      <div
        className={`flex ${
          showSearchBar ? 'justify-around' : 'justify-between px-10'
        } w-screen max-w-screen-xl`}
      >
        <a href="/" className="flex items-center gap-1">
          <img
            className="h-10 w-30 mr-2"
            src={RoamHaven}
            alt=""
          />

          {/* <span className="hidden md:block font-sm  text-white-500">
          RoamHaven
          </span> */}
        </a>

        {showSearchBar && <SearchBar />}

        <Link
          to={user ? '/account' : '/login'}
          className="flex gap-2 items-center md:border border-white rounded-3xl py-2 px-2"
        >
          <svg
            fill="#858080"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="796 796 200 200"
            enableBackground="new 796 796 200 200"
            xmlSpace="preserve"
            stroke="#858080"
            className="w-8 h-8"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path>{' '}
            </g>
          </svg>

          {user && <div className="hidden md:block">{user.name}</div>}
        </Link>
      </div>
      <br className="border border-red-600" />
    </header>
  );
};
