"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import "../styles/Navbar.css"
import { Menu, X, Leaf } from "lucide-react"

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/search", label: "Recipes" },
  { path: "/scan", label: "Scan Ingredients" },
]

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <NavLink to="/" className="logo-container">
          <Leaf className="logo-icon" />
          <h1 className="logo">FlavorFlow</h1>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink to={path} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} end>
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button className="cta-button">Get Started</button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links-mobile">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `nav-item-mobile ${isActive ? "active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                  end
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <button className="cta-button-mobile" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
