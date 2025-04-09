"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "../styles/RecipeGrid.css"
import { Clock, Users, ChevronRight, Star, BookmarkPlus } from "lucide-react"

const API_KEY = "api-key" // Replace with your actual API key

interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes?: number
  servings?: number
  healthScore?: number
}

const RecipeGrid: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // For demo purposes, we'll use placeholder data if API key is not set
        if (API_KEY === "api-key") {
          // Placeholder data
          const placeholderRecipes: Recipe[] = [
            {
              id: 1,
              title: "Mediterranean Quinoa Bowl",
              image: "/placeholder.svg?height=300&width=300",
              readyInMinutes: 25,
              servings: 2,
              healthScore: 92,
            },
            {
              id: 2,
              title: "Avocado & Kale Smoothie",
              image: "/placeholder.svg?height=300&width=300",
              readyInMinutes: 10,
              servings: 1,
              healthScore: 95,
            },
            {
              id: 3,
              title: "Grilled Salmon with Asparagus",
              image: "/placeholder.svg?height=300&width=300",
              readyInMinutes: 30,
              servings: 4,
              healthScore: 88,
            },
            {
              id: 4,
              title: "Sweet Potato & Black Bean Tacos",
              image: "/placeholder.svg?height=300&width=300",
              readyInMinutes: 35,
              servings: 3,
              healthScore: 85,
            },
            {
              id: 5,
              title: "Berry Protein Overnight Oats",
              image: "/placeholder.svg?height=300&width=300",
              readyInMinutes: 10,
              servings: 1,
              healthScore: 90,
            },
            {
              id: 6,
              title: "Lentil & Vegetable Soup",
              image: "/placeholder.svg?height=300&width=300",
              readyInMinutes: 45,
              servings: 6,
              healthScore: 87,
            },
          ]
          setRecipes(placeholderRecipes)
          setLoading(false)
          return
        }

        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6&tags=vegetarian,healthy`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch recipes")
        }

        const data = await response.json()
        setRecipes(data.recipes)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <section className="recipe-grid-section">
      <div className="recipe-grid-header">
        <div>
          <h2 className="section-title">Popular Healthy Recipes</h2>
          <p className="section-subtitle">Discover nutritious meals loved by our community</p>
        </div>
        <button className="view-all-button">
          View All <ChevronRight size={16} />
        </button>
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
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image-container">
                <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="recipe-image" />
                <button className="bookmark-button" aria-label="Bookmark recipe">
                  <BookmarkPlus size={20} />
                </button>
                <div className="recipe-badge">
                  <Star size={14} className="badge-icon" />
                  <span>{recipe.healthScore || Math.floor(Math.random() * 15 + 85)}</span>
                </div>
              </div>
              <div className="recipe-content">
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
                <div className="recipe-tags">
                  <span className="recipe-tag">Healthy</span>
                  <span className="recipe-tag">Easy</span>
                  {Math.random() > 0.5 && <span className="recipe-tag">Vegetarian</span>}
                </div>
                <button className="view-recipe-button">View Recipe</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default RecipeGrid
