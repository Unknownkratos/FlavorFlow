"use client"

import type React from "react"
import "../styles/HeroSection.css"
import { Search, ArrowRight, ChevronDown } from "lucide-react"

const HeroSection: React.FC = () => {
  const scrollToRecipes = () => {
    const recipesSection = document.getElementById("popular-recipes")
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-badge">Healthy Eating Made Simple</span>
          <h1 className="hero-title">
            Discover <span className="highlight">Delicious</span> Recipes With Your Ingredients
          </h1>
          <p className="hero-subtitle">
            Find expert-crafted recipes tailored to your lifestyle and the ingredients you already have in your kitchen.
          </p>
          <br />

          <div className="search-container">
            <div className="search-bar">
              <Search className="search-icon" />
              <input type="text" placeholder="Enter ingredients you have..." />
              <button className="search-button">Find Recipes</button>
            </div>
            <div className="search-tags">
              <span className="search-tag">Vegetarian</span>
              <span className="search-tag">Quick Meals</span>
              <span className="search-tag">High Protein</span>
              <span className="search-tag">Gluten Free</span>
            </div>
          </div>

          <div className="hero-cta">
            <button className="cta-primary">
              Scan Ingredients <ArrowRight size={16} />
            </button>
            <button className="cta-secondary">Browse Popular Recipes</button>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image">
            <div className="floating-card card-1">
              <span className="card-icon">🥑</span>
              <span className="card-text">Healthy Fats</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">🍲</span>
              <span className="card-text">5000+ Recipes</span>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">⏱️</span>
              <span className="card-text">Quick Meals</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <h3 className="stat-number">5,000+</h3>
          <p className="stat-label">Healthy Recipes</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h3 className="stat-number">100+</h3>
          <p className="stat-label">Diet Plans</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h3 className="stat-number">50k+</h3>
          <p className="stat-label">Happy Users</p>
        </div>
      </div>

      <button className="scroll-down-button" onClick={scrollToRecipes}>
        <span className="sr-only">Scroll down</span>
        <ChevronDown size={24} />
      </button>
    </div>
  )
}

export default HeroSection
