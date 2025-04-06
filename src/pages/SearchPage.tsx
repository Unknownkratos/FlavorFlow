import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SearchPage.css";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  
  const recipesPerPage = 12;

  // Fetch all available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const categoryNames = response.data.categories.map(
          (cat: { strCategory: string }) => cat.strCategory
        );
        setCategories(["all", ...categoryNames]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories(["all", "Chicken", "Vegetarian", "Dessert"]);
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch recipes from multiple categories and combine them
  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      try {
        const categoriesToFetch = ["Chicken", "Vegetarian", "Dessert", "Seafood", "Beef", "Breakfast"];
        const recipePromises = categoriesToFetch.map(category => 
          axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        );
        
        const responses = await Promise.all(recipePromises);
        
        // Combine and add category information
        let allRecipes: Recipe[] = [];
        responses.forEach((response, index) => {
          const category = categoriesToFetch[index];
          const recipes = response.data.meals || [];
          const recipesWithCategory = recipes.map((recipe: Recipe) => ({
            ...recipe,
            strCategory: category
          }));
          allRecipes = [...allRecipes, ...recipesWithCategory];
        });
        
        // Shuffle recipes for more interesting browsing
        allRecipes = shuffleArray(allRecipes);
        
        setRecipes(allRecipes);
        setFilteredRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
        setFilteredRecipes([]);
      }
      setLoading(false);
    };
    
    fetchAllRecipes();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = [...recipes];
    
    // Filter by category if not "all"
    if (activeFilter !== "all") {
      results = results.filter(recipe => recipe.strCategory === activeFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      results = results.filter(recipe => 
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredRecipes(results);
    setCurrentPage(1); // Reset to first page when filter/search changes
  }, [searchQuery, activeFilter, recipes]);

  // Helper function to shuffle array
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="search-page">
      <div className="page-header">
        <h1 className="page-title">Recipe Explorer</h1>
        <p className="page-subtitle">Browse and discover delicious recipes</p>
      </div>
      
      <div className="main-content">
        <div className="sidebar">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search recipes..."
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search-button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          
          <div className="filter-container">
            <h3 className="filter-title">Categories</h3>
            <ul className="filter-list">
              {categories.map((category) => (
                <li key={category} className="filter-item">
                  <button
                    className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                    onClick={() => handleFilterClick(category)}
                  >
                    {category === 'all' ? 'All Recipes' : category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="recipe-content">
          <div className="recipes-header">
            <h2 className="recipes-title">
              {activeFilter === 'all' ? 'All Recipes' : activeFilter}
              {searchQuery && ` matching "${searchQuery}"`}
            </h2>
            <div className="recipes-count">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
            </div>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Discovering delicious recipes...</div>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="no-results">
              <span className="no-results-icon">🍽️</span>
              <p>No recipes found{searchQuery ? ` for "${searchQuery}"` : ''}</p>
              <p className="no-results-suggestion">Try a different search or filter</p>
            </div>
          ) : (
            <>
              <div className="recipe-grid">
                {currentRecipes.map((recipe) => (
                  <div className="recipe-card" key={recipe.idMeal}>
                    <div className="recipe-card-image-container">
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="recipe-card-image"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://via.placeholder.com/300x300/1a1a1a/666?text=No+Image';
                        }}
                        loading="lazy"
                      />
                      <div className="recipe-card-overlay">
                        <span className="recipe-view-button">View Recipe</span>
                      </div>
                    </div>
                    <div className="recipe-card-body">
                      <h3 className="recipe-card-title" title={recipe.strMeal}>{recipe.strMeal}</h3>
                      <div className="recipe-card-category">{recipe.strCategory}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn" 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo; Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNumber = i + 1;
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
                            className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <button 
                    className="pagination-btn"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next &raquo;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;