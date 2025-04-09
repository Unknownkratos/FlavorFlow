import type React from "react"
import "../styles/Footer.css"
import { Facebook, Instagram, Twitter, UtensilsCrossed, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <div className="logo-container">
            <UtensilsCrossed className="logo-icon" />
            <h2 className="footer-logo">FlavorFlow</h2>
          </div>
          <p className="brand-description">
            Discover healthy recipes tailored to your lifestyle and ingredients you already have. Our mission is to make
            healthy eating simple, delicious, and accessible to everyone.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/search">Recipes</a>
            </li>
            <li>
              <a href="/scan">Scan Ingredients</a>
            </li>
            <li>
              <a href="#">Meal Plans</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section links">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Breakfast</a>
            </li>
            <li>
              <a href="#">Lunch</a>
            </li>
            <li>
              <a href="#">Dinner</a>
            </li>
            <li>
              <a href="#">Vegetarian</a>
            </li>
            <li>
              <a href="#">Gluten-Free</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <span>hello@flavorflow.com</span>
            </div>
            <div className="contact-item">
              <Phone size={16} className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>123 Healthy St, Foodville, CA 94123</span>
            </div>
          </div>
          <div className="newsletter">
            <h4 className="newsletter-heading">Get recipes in your inbox</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button className="newsletter-button">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FlavorFlow. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
