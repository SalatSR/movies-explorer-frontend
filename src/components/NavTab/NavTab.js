import './NavTab.css';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

function NavTab() {
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link to={{ pathname: '/', hash: "#aboutProject" }} className="menu__link">О проекте</Link>
        </li>
        <li className="menu__list-item">
          <Link to={{ pathname: '/', hash: "#techs" }} className="menu__link">Технологии</Link>
        </li>
        <li className="menu__list-item">
          <Link to={{ pathname: '/', hash: "#aboutMe" }} className="menu__link">Студент</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;