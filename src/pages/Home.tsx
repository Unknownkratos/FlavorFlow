import type React from "react"
import HeroSection from "../components/HeroSection"
import RecipeGrid from "../components/RecipeGrid"
import Footer from "../components/Footer"
import "../styles/Home.css"
import { ArrowRight, Utensils, Clock, Leaf, Zap } from "lucide-react"

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <HeroSection />

      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose FlavorFlow</h2>
          <p className="features-subtitle">Discover a better way to plan, cook, and enjoy healthy meals</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Utensils size={24} />
              </div>
              <h3 className="feature-title">Personalized Recipes</h3>
              <p className="feature-description">
                Get recipe recommendations tailored to your dietary preferences, restrictions, and taste preferences.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <h3 className="feature-title">Save Time</h3>
              <p className="feature-description">
                Find recipes based on ingredients you already have and reduce food waste with smart suggestions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Leaf size={24} />
              </div>
              <h3 className="feature-title">Eat Healthier</h3>
              <p className="feature-description">
                All recipes are nutritionist-approved with detailed nutritional information and health benefits.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">Smart Scanning</h3>
              <p className="feature-description">
                Scan your ingredients with your camera and instantly get recipe suggestions that use them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RecipeGrid />

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to transform your cooking experience?</h2>
            <p className="cta-description">
              Join thousands of food lovers who have discovered a healthier, more enjoyable way to cook with FlavorFlow.
            </p>
            <button className="cta-button">
              Get Started Now <ArrowRight size={16} />
            </button>
          </div>
          <div className="cta-image">
            <img src="/placeholder.svg?height=400&width=400" alt="Happy cooking" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
