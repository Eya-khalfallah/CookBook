import React, { useEffect, useState } from 'react';
import "./Profil.css";
import { useRecipes } from "../../hooks/RecipeContext";
import ProfilRecipeCard from '../../components/RecipeCard/ProfilRecipeCard';
import { useNavigate } from 'react-router-dom'; // Use the useNavigate hook

const Profil = () => {
  // Correct usage of useState to manage recipes as an array
  const [recipes, setRecipes] = useState([]);
  const email = localStorage.getItem('email'); // Get the user's email from localStorage
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Update the request URL to include the user's email
        const response = await fetch(`http://localhost:8000/recipes/${email}`);
        if (!response.ok) throw new Error("Failed to fetch recipes");

        const data = await response.json();
        setRecipes(data.reverse()); // Set only the recipes related to this user
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (email) {
      fetchRecipes(); // Fetch recipes only if there's an email in localStorage
    }
  }, [email]); // Dependency on email to trigger re-fetch if it changes

  const handleDetailsClick = (recipe) => {
    // Use navigate to go to the recipe details page
    console.log(recipe);
    navigate(`/details/${recipe._id}`, { state: { recipe } });
  };

  const handleEditClick = (recipeId) => {
    // Handle the edit event, e.g., open edit form or navigate to edit page
    console.log(`Editing recipe ${recipeId}`);
  };

  const handleDeleteClick = (recipeId) => {
    // Handle the delete event, e.g., show confirmation dialog and delete if confirmed
    console.log(`Deleting recipe ${recipeId}`);
  };

  return (
    <div>
      <div className="container-product">
        <div className="box-1"></div>
        <div className="box-2">
          <div className="bio">
            <h1>{localStorage.getItem('name')} {localStorage.getItem('last')}</h1>
            <p>"An aspiring amateur chef who loves experimenting with flavors and enjoys sharing their culinary creations with others."</p>
          </div>
          <hr />
          <h2>My recipes</h2>
         
          {recipes.length ? (
            <div className="recipe-list">
              {recipes.map((recipe) => (
                <ProfilRecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onDetailsClick={handleDetailsClick}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          ) : (
            <h3>No recipes</h3>
          )}
        </div>
      </div>
      <div 
        className="profil-pic" 
        style={{ backgroundImage: `url(${localStorage.getItem('photo')})` }}
      ></div>
    </div>
  );
}

export default Profil;