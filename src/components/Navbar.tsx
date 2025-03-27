import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/search', label: 'Search' },
  { path: '/scan', label: 'Scan' }
];

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">FlavorFlow</h1>
      <ul className="nav-links">
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <NavLink 
              to={path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
