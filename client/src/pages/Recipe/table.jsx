import React from "react";
import './table.css';
import './home.css';
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function Table(props) {
  let recipes = props.recipe;
  console.log(recipes);

  return (
    <div className="h-recipes">
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} e={[recipe.email ,recipe.name, recipe.image, recipe.nb_likes, recipe.comment]} />
      ))}
    </div>
  );
}

export default Table;
