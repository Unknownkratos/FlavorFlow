"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import "../styles/Navbar.css"
import { Menu, X, UtensilsCrossed, Search, Scan, Home, ChevronDown } from "lucide-react"

const navLinks = [
  { path: "/", label: "Home", icon: <Home size={18} /> },
  {
    path: "/recipes",
    label: "Recipes",
    icon: <UtensilsCrossed size={18} />,
    dropdown: [
      { path: "/recipes/breakfast", label: "Breakfast" },
      { path: "/recipes/lunch", label: "Lunch" },
      { path: "/recipes/dinner", label: "Dinner" },
      { path: "/recipes/desserts", label: "Desserts" },
      { path: "/recipes/vegetarian", label: "Vegetarian" },
    ],
  },
  { path: "/search", label: "Search", icon: <Search size={18} /> },
  { path: "/scan", label: "Scan Ingredients", icon: <Scan size={18} /> },
]

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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

  const toggleDropdown = (path: string) => {
    if (activeDropdown === path) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(path)
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <NavLink to="/" className="logo-container">
          <UtensilsCrossed className="logo-icon" />
          <h1 className="logo">FlavorFlow</h1>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          {navLinks.map(({ path, label, icon, dropdown }) => (
            <li key={path} className={dropdown ? "has-dropdown" : ""}>
              {dropdown ? (
                <>
                  <button
                    className="nav-dropdown-trigger"
                    onClick={() => toggleDropdown(path)}
                    aria-expanded={activeDropdown === path}
                  >
                    {icon}
                    {label}
                    <ChevronDown size={16} className={`dropdown-arrow ${activeDropdown === path ? "open" : ""}`} />
                  </button>
                  <div className={`nav-dropdown ${activeDropdown === path ? "open" : ""}`}>
                    {dropdown.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `dropdown-item ${isActive ? "active" : ""}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink to={path} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} end>
                  {icon}
                  {label}
                </NavLink>
              )}
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
            {navLinks.map(({ path, label, icon, dropdown }) => (
              <li key={path} className={dropdown ? "has-dropdown-mobile" : ""}>
                {dropdown ? (
                  <>
                    <button
                      className="nav-dropdown-trigger-mobile"
                      onClick={() => toggleDropdown(path)}
                      aria-expanded={activeDropdown === path}
                    >
                      {icon}
                      {label}
                      <ChevronDown size={16} className={`dropdown-arrow ${activeDropdown === path ? "open" : ""}`} />
                    </button>
                    <div className={`nav-dropdown-mobile ${activeDropdown === path ? "open" : ""}`}>
                      {dropdown.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) => `dropdown-item-mobile ${isActive ? "active" : ""}`}
                          onClick={() => {
                            setActiveDropdown(null)
                            setIsMenuOpen(false)
                          }}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={path}
                    className={({ isActive }) => `nav-item-mobile ${isActive ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                    end
                  >
                    {icon}
                    {label}
                  </NavLink>
                )}
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
