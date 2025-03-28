import React from "react";
import HeroSection from "../components/HeroSection";
import RecipeGrid from "../components/RecipeGrid";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <section className="trending-section">
        <h2 className="section-title">Popular Recipes</h2>
        <RecipeGrid />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
