import React, { useState } from 'react';
import '../styles/SearchPage.css';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <div>
      <h1>Search Healthy Recipes</h1>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">Select a filter</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="low-carb">Low Carb</option>
      </select>
      {/* Placeholder for recipe search results */}
    </div>
  );
}

export default SearchPage;
