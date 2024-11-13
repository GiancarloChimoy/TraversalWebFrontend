// src/components/Navbar/Navbar.js
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/product">Productos</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><a href="/">Nosotros</a></li>
        <li><Link to="/contactos">Contactos</Link></li>
      </ul>
    </nav>
  );
}


export default Navbar;
