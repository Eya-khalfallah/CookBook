import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import "./RecipeDetails.css";

const RecipeDetails = ({ recipe }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically also send a request to your backend to update the like count
  };

  return (
    <div className="recipe-details">
      <div>
        <div className="recipe-header">
          <h1>{recipe.name}</h1>
          <p className="description">{recipe.description}</p>
          <div className="meta-info">
            <div className="meta-item">
              <FaCalendarAlt />
              <span>Added on {recipe.date}</span>
            </div>
            <div className="meta-item">
              <FaUser />
              <span>{recipe.email}</span>
            </div>
          </div>
        </div>
        {recipe.image && (
          <div className="recipe-image">
            <img src={require("./photo3.jpg")} alt={recipe.name} />
          </div>
        )}
      </div>
      <div>
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="category">
          <h2>Category</h2>
          <span className="category-tag">{recipe.category}</span>
        </div>

        <div className="recipe-footer">
          <button
            onClick={handleLike}
            className="like-button"
            aria-label={isLiked ? "Unlike recipe" : "Like recipe"}>
            {isLiked ? (
              <FaHeart className="heart-icon liked" />
            ) : (
              <FaRegHeart className="heart-icon" />
            )}
            <span>{recipe.nb_likes + (isLiked ? 1 : 0)} likes</span>
          </button>
          {/* <div className="author">
            <FaUtensils />
            <span>Recipe by {recipe.email}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
