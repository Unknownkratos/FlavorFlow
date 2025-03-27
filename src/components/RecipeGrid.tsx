import React, { useEffect, useState } from "react";
import "../styles/RecipeGrid.css";

const API_KEY = "API-key"; // Replace with your actual API key

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const RecipeGrid: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=5` // Fetch exactly 5 recipes
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section className="recipe-grid">
      <h2>Popular Recipes</h2>

      {loading && <p className="loading">Loading recipes...</p>}
      {error && <p className="error">{error}</p>}

      <div className="recipe-container">
        {!loading &&
          !error &&
          recipes.slice(0, 5).map((recipe) => ( // Limit to 5 recipes
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          ))}
      </div>
    </section>
  );
};

export default RecipeGrid;
