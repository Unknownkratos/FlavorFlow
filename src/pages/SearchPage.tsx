"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/SearchPage.css"
import {
  SearchIcon,
  Filter,
  ChevronDown,
  X,
  Clock,
  Users,
  Star,
  BookmarkPlus,
  Heart,
  Share2,
  Sliders,
} from "lucide-react"
import Footer from "../components/Footer"

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory?: string
  readyInMinutes?: number
  servings?: number
  healthScore?: number
  cuisines?: string[]
  diets?: string[]
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState("all")
  const [categories, setCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDiets, setSelectedDiets] = useState<string[]>([])
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string>("any")
  const [sortBy, setSortBy] = useState("relevance")

  const recipesPerPage = 12

  const dietOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb", "Keto", "Paleo"]
  const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack", "Appetizer", "Dessert", "Drink"]
  const timeOptions = [
    { value: "any", label: "Any Time" },
    { value: "15", label: "15 minutes or less" },
    { value: "30", label: "30 minutes or less" },
    { value: "60", label: "1 hour or less" },
  ]
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "rating", label: "Highest Rated" },
    { value: "time", label: "Cooking Time" },
    { value: "newest", label: "Newest" },
  ]

  // Fetch all available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
        const categoryNames = response.data.categories.map((cat: { strCategory: string }) => cat.strCategory)
        setCategories(["all", ...categoryNames])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories(["all", "Chicken", "Vegetarian", "Dessert"])
      }
    }

    fetchCategories()
  }, [])

  // Fetch recipes from multiple categories and combine them
  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true)
      try {
        const categoriesToFetch = ["Chicken", "Vegetarian", "Dessert", "Seafood", "Beef", "Breakfast"]
        const recipePromises = categoriesToFetch.map((category) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`),
        )

        const responses = await Promise.all(recipePromises)

        // Combine and add category information
        let allRecipes: Recipe[] = []
        responses.forEach((response, index) => {
          const category = categoriesToFetch[index]
          const recipes = response.data.meals || []
          const recipesWithCategory = recipes.map((recipe: Recipe) => ({
            ...recipe,
            strCategory: category,
            readyInMinutes: Math.floor(Math.random() * 45 + 15),
            servings: Math.floor(Math.random() * 4 + 1),
            healthScore: Math.floor(Math.random() * 15 + 85),
            cuisines: getRandomCuisines(),
            diets: getRandomDiets(),
          }))
          allRecipes = [...allRecipes, ...recipesWithCategory]
        })

        // Shuffle recipes for more interesting browsing
        allRecipes = shuffleArray(allRecipes)

        setRecipes(allRecipes)
        setFilteredRecipes(allRecipes)
      } catch (error) {
        console.error("Error fetching recipes:", error)
        setRecipes([])
        setFilteredRecipes([])
      }
      setLoading(false)
    }

    fetchAllRecipes()
  }, [])

  // Helper function to get random cuisines
  const getRandomCuisines = () => {
    const cuisines = ["Italian", "Mexican", "Asian", "American", "Mediterranean", "Indian", "French", "Greek"]
    const numCuisines = Math.floor(Math.random() * 2) + 1
    return shuffleArray(cuisines).slice(0, numCuisines)
  }

  // Helper function to get random diets
  const getRandomDiets = () => {
    const diets = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb", "Keto", "Paleo", "High-Protein"]
    const numDiets = Math.floor(Math.random() * 3)
    return shuffleArray(diets).slice(0, numDiets)
  }

  // Handle search and filtering
  useEffect(() => {
    let results = [...recipes]

    // Filter by category if not "all"
    if (activeFilter !== "all") {
      results = results.filter((recipe) => recipe.strCategory === activeFilter)
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      results = results.filter((recipe) => recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by diet
    if (selectedDiets.length > 0) {
      results = results.filter((recipe) => {
        return selectedDiets.some((diet) => recipe.diets?.includes(diet))
      })
    }

    // Filter by meal type
    if (selectedMealTypes.length > 0) {
      results = results.filter((recipe) => {
        const recipeCategory = (recipe.strCategory || "").toLowerCase()

        return selectedMealTypes.some((mealType) => {
          const mealTypeLower = mealType.toLowerCase()
          return recipeCategory.includes(mealTypeLower)
        })
      })
    }

    // Filter by time
    if (selectedTime !== "any") {
      const maxTime = Number.parseInt(selectedTime)
      results = results.filter((recipe) => (recipe.readyInMinutes || 0) <= maxTime)
    }

    // Sort results
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => (b.healthScore || 0) - (a.healthScore || 0))
        break
      case "time":
        results.sort((a, b) => (a.readyInMinutes || 0) - (b.readyInMinutes || 0))
        break
      case "newest":
        // For demo purposes, just shuffle
        results = shuffleArray([...results])
        break
      default:
        // relevance - no additional sorting
        break
    }

    setFilteredRecipes(results)
    setCurrentPage(1) // Reset to first page when filter/search changes
  }, [searchQuery, activeFilter, recipes, selectedDiets, selectedMealTypes, selectedTime, sortBy])

  // Helper function to shuffle array
  const shuffleArray = (array: any[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }

  const toggleDiet = (diet: string) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== diet))
    } else {
      setSelectedDiets([...selectedDiets, diet])
    }
  }

  const toggleMealType = (mealType: string) => {
    if (selectedMealTypes.includes(mealType)) {
      setSelectedMealTypes(selectedMealTypes.filter((m) => m !== mealType))
    } else {
      setSelectedMealTypes([...selectedMealTypes, mealType])
    }
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

  const clearAllFilters = () => {
    setActiveFilter("all")
    setSelectedDiets([])
    setSelectedMealTypes([])
    setSelectedTime("any")
    setSearchQuery("")
    setSortBy("relevance")
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="search-page">
      <div className="search-hero">
        <div className="search-hero-content">
          <span className="search-badge">Recipe Explorer</span>
          <h1 className="search-title">Discover Recipes</h1>
          <p className="search-subtitle">Find the perfect recipe for any meal, diet, or occasion</p>
          <div className="search-bar-container">
            <div className="search-bar">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search recipes, ingredients, or cuisines..."
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search-button" onClick={() => setSearchQuery("")} aria-label="Clear search">
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              className={`filter-toggle-button ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={`chevron ${showFilters ? "rotate" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="search-container">
        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-section">
              <h3 className="filter-section-title">Diet</h3>
              <div className="filter-options">
                {dietOptions.map((diet) => (
                  <label key={diet} className="filter-option">
                    <input type="checkbox" checked={selectedDiets.includes(diet)} onChange={() => toggleDiet(diet)} />
                    <span className="filter-checkbox"></span>
                    {diet}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-section-title">Meal Type</h3>
              <div className="filter-options">
                {mealTypeOptions.map((mealType) => (
                  <label key={mealType} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedMealTypes.includes(mealType)}
                      onChange={() => toggleMealType(mealType)}
                    />
                    <span className="filter-checkbox"></span>
                    {mealType}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-section-title">Cooking Time</h3>
              <div className="filter-options time-options">
                {timeOptions.map((option) => (
                  <label key={option.value} className="time-option">
                    <input
                      type="radio"
                      name="time"
                      value={option.value}
                      checked={selectedTime === option.value}
                      onChange={() => handleTimeChange(option.value)}
                    />
                    <span className="time-radio"></span>
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-filters-button" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        <div className="category-filters">
          <div className="category-scroll">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${activeFilter === category ? "active" : ""}`}
                onClick={() => handleFilterClick(category)}
              >
                {category === "all" ? "All Recipes" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="results-header">
          <div className="results-info">
            <h2 className="results-title">
              {activeFilter === "all" ? "All Recipes" : activeFilter}
              {searchQuery && ` matching "${searchQuery}"`}
            </h2>
            <p className="results-count">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
            </p>
          </div>
          <div className="results-sort">
            <label htmlFor="sort-select" className="sort-label">
              <Sliders size={16} />
              Sort by:
            </label>
            <select id="sort-select" className="sort-select" value={sortBy} onChange={handleSortChange}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Discovering delicious recipes...</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🍽️</div>
            <h3 className="no-results-title">No recipes found</h3>
            <p className="no-results-message">
              {searchQuery
                ? `We couldn't find any recipes matching "${searchQuery}"`
                : "No recipes match your current filters"}
            </p>
            <button className="clear-filters-button" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="recipe-grid">
              {currentRecipes.map((recipe) => (
                <div className="recipe-card" key={recipe.idMeal}>
                  <div className="recipe-image-container">
                    <img
                      src={recipe.strMealThumb || "/placeholder.svg"}
                      alt={recipe.strMeal}
                      className="recipe-image"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = "https://via.placeholder.com/300x300/f5f5f5/e65100?text=No+Image"
                      }}
                      loading="lazy"
                    />
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
                    <h3 className="recipe-title">{recipe.strMeal}</h3>
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
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button prev"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className="pagination-numbers">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1
                    // Show limited page numbers with ellipsis
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`pagination-number ${currentPage === pageNumber ? "active" : ""}`}
                        >
                          {pageNumber}
                        </button>
                      )
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return (
                        <span key={pageNumber} className="pagination-ellipsis">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                <button
                  className="pagination-button next"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default SearchPage
