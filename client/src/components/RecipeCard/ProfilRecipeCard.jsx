import React from 'react';
import { FaHeart, FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import './ProfilRecipeCard.css';

const ProfilRecipeCard = ({ recipe, onDetailsClick, onEditClick, onDeleteClick }) => {
  return (
    <div className="recipe-card">
      <img className="recipe-image" src={recipe.image} alt={recipe.name} />
      <div className="recipe-content">
        <h3 className="recipe-name">{recipe.name}</h3>
        <div className="recipe-stats">
          <span className="recipe-likes">
            <FaHeart className="icon" /> {recipe.nb_likes}
          </span>
          <span className="recipe-comments">
            <FaComment className="icon" /> 0
          </span>
        </div>
        <div className="recipe-actions">
          <button className="action-button details-button" onClick={() => onDetailsClick(recipe)}>
            View Details
          </button>
          <button className="action-button edit-button" onClick={() => onEditClick(recipe._id)} aria-label="Edit recipe">
            <FaEdit />
          </button>
          <button className="action-button delete-button" onClick={() => onDeleteClick(recipe._id)} aria-label="Delete recipe">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilRecipeCard;