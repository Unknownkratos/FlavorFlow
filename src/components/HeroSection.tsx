import React from "react";
import "../styles/HeroSection.css";

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-overlay">
        <h1>Discover Healthy & Delicious Recipes</h1>
        <p>Find expert advice and dietitian-approved meals tailored for you.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search recipes or advice..." />
          <button>🔍</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
