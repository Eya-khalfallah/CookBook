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
        <RecipeCard key={recipe._id} e={[recipe.image, recipe.name, recipe.chef.name ,recipe.chef.photo , recipe.nb_likes, recipe.comment]} />
      ))}
    </div>
  );
}

export default Table;
