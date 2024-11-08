import React, { createContext, useState, useContext } from "react";

// Create a context
const RecipeContext = createContext();

// Create a provider component
export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to use the Recipe context
export const useRecipes = () => useContext(RecipeContext);
