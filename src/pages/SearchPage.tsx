import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SearchPage.css";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ingredientsFilter, setIngredientsFilter] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "api-key"; // Your Spoonacular API Key
  const resultsPerPage = 10; // Display 10 recipes per page (reduced rows)

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey,
              query: searchQuery,
              ingredients: ingredientsFilter.join(","),
              number: resultsPerPage,
              offset: (currentPage - 1) * resultsPerPage,
            },
          }
        );
        setRecipes(response.data.results);
        setTotalPages(Math.ceil(response.data.totalResults / resultsPerPage));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
      setLoading(false);
    };

    if (searchQuery || ingredientsFilter.length > 0) {
      fetchRecipes();
    }
  }, [searchQuery, ingredientsFilter, currentPage]);

  const handleFilterClick = (ingredient: string) => {
    setIngredientsFilter((prev) => {
      if (prev.includes(ingredient)) {
        return prev.filter((item) => item !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for recipes..."
        />
      </div>

      <div className="filters">
        <button
          onClick={() => handleFilterClick("eggs")}
          className={ingredientsFilter.includes("eggs") ? "active" : ""}
        >
          Eggs
        </button>
        <button
          onClick={() => handleFilterClick("chicken")}
          className={ingredientsFilter.includes("chicken") ? "active" : ""}
        >
          Chicken
        </button>
        <button
          onClick={() => handleFilterClick("tomatoes")}
          className={ingredientsFilter.includes("tomatoes") ? "active" : ""}
        >
          Tomatoes
        </button>
        {/* Add more ingredient filters as needed */}
      </div>

      <div className="recipe-grid">
        {loading ? (
          <p>Loading...</p>
        ) : (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-card-image"
              />
              <div className="recipe-card-body">
                <h3 className="recipe-card-title">{recipe.title}</h3>
                <p className="recipe-card-description">{recipe.summary}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePagination(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
