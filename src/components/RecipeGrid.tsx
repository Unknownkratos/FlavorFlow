"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "../styles/RecipeGrid.css"
import { Clock, Users, ChevronRight, Star, BookmarkPlus, Heart, Share2 } from "lucide-react"

// Sample recipe data with real images
const sampleRecipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    readyInMinutes: 25,
    servings: 2,
    healthScore: 92,
    cuisines: ["Mediterranean", "Greek"],
    diets: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: 2,
    title: "Avocado & Kale Smoothie",
    image:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    readyInMinutes: 10,
    servings: 1,
    healthScore: 95,
    cuisines: ["American"],
    diets: ["Vegan", "Paleo"],
  },
  {
    id: 3,
    title: "Grilled Salmon with Asparagus",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    readyInMinutes: 30,
    servings: 4,
    healthScore: 88,
    cuisines: ["American", "Fusion"],
    diets: ["Pescatarian", "Keto"],
  },
  {
    id: 4,
    title: "Sweet Potato & Black Bean Tacos",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    readyInMinutes: 35,
    servings: 3,
    healthScore: 85,
    cuisines: ["Mexican", "Latin American"],
    diets: ["Vegetarian"],
  },
  {
    id: 5,
    title: "Berry Protein Overnight Oats",
    image:
      "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    readyInMinutes: 10,
    servings: 1,
    healthScore: 90,
    cuisines: ["American", "European"],
    diets: ["Vegetarian", "High-Protein"],
  },
  {
    id: 6,
    title: "Lentil & Vegetable Soup",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    readyInMinutes: 45,
    servings: 6,
    healthScore: 87,
    cuisines: ["Mediterranean", "Middle Eastern"],
    diets: ["Vegan", "Gluten-Free"],
  },
]

interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes?: number
  servings?: number
  healthScore?: number
  cuisines?: string[]
  diets?: string[]
}

const RecipeGrid: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = ["all", "breakfast", "lunch", "dinner", "dessert", "vegetarian"]

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Use the sample data instead of API call for now
        setRecipes(sampleRecipes)
        setLoading(false)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const filteredRecipes =
    activeCategory === "all"
      ? recipes
      : recipes.filter((recipe) => {
          // This is a simplified filter for demo purposes
          if (activeCategory === "vegetarian" && recipe.diets?.includes("Vegetarian")) return true
          if (activeCategory === "breakfast" && recipe.readyInMinutes && recipe.readyInMinutes <= 15) return true
          if (
            activeCategory === "lunch" &&
            recipe.cuisines?.some((c) => ["Mediterranean", "Mexican", "Asian"].includes(c))
          )
            return true
          if (activeCategory === "dinner" && recipe.servings && recipe.servings >= 3) return true
          if (activeCategory === "dessert" && recipe.title.toLowerCase().includes("berry")) return true
          return false
        })

  return (
    <section className="recipe-grid-section" id="popular-recipes">
      <div className="recipe-grid-header">
        <div>
          <h2 className="section-title">Popular Healthy Recipes</h2>
          <p className="section-subtitle">Discover nutritious meals loved by our community</p>
        </div>
        <button className="view-all-button">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="recipe-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding delicious recipes for you...</p>
        </div>
      )}

      {error && <div className="error-message">Error: {error}</div>}

      {!loading && !error && (
        <div className="recipe-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image-container">
                  <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="recipe-image" />
                  <div className="recipe-actions">
                    <button className="recipe-action-button bookmark" aria-label="Bookmark recipe">
                      <BookmarkPlus size={18} />
                    </button>
                    <button className="recipe-action-button like" aria-label="Like recipe">
                      <Heart size={18} />
                    </button>
                    <button className="recipe-action-button share" aria-label="Share recipe">
                      <Share2 size={18} />
                    </button>
                  </div>
                  <div className="recipe-badge">
                    <Star size={14} className="badge-icon" />
                    <span>{recipe.healthScore || Math.floor(Math.random() * 15 + 85)}</span>
                  </div>
                </div>
                <div className="recipe-content">
                  <div className="recipe-tags">
                    {recipe.diets?.slice(0, 2).map((diet, index) => (
                      <span key={index} className="recipe-tag">
                        {diet}
                      </span>
                    ))}
                    {recipe.cuisines?.slice(0, 1).map((cuisine, index) => (
                      <span key={index} className="recipe-tag cuisine">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <div className="recipe-meta">
                    <div className="meta-item">
                      <Clock size={16} className="meta-icon" />
                      <span>{recipe.readyInMinutes || Math.floor(Math.random() * 30 + 10)} min</span>
                    </div>
                    <div className="meta-item">
                      <Users size={16} className="meta-icon" />
                      <span>{recipe.servings || Math.floor(Math.random() * 4 + 1)} servings</span>
                    </div>
                  </div>
                  <button className="view-recipe-button">View Recipe</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-recipes">
              <p>No recipes found in this category. Try another category.</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default RecipeGrid
