import React from 'react';
import RecipeDetails from './RecipeDetails';
import './RecipePage.css';

const RecipePage = () => {
  const recipe = {
    email: "chef@example.com",
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, and pancetta.",
    ingredients: [
      "400g spaghetti",
      "200g pancetta, diced",
      "4 large eggs",
      "100g Pecorino Romano cheese, grated",
      "100g Parmesan cheese, grated",
      "Freshly ground black pepper"
    ],
    category: "Main Course",
    image: "./photo3.jpg",
    nb_likes: 42,
    date: "15-06-2023"
  };

  return (
    <div className="recipe-page" >
      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default RecipePage;