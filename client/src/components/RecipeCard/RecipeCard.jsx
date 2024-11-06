import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import "./RecipeCard.css";

export default function RecipeCard({imagePath, avatarPath}) {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          alt="Thai-style mussels in coconut curry broth"
          className="card-image"
          src={imagePath}
        />
      </div>
      <div className="card-header">
        <h2 className="card-title">Thai-style mussels</h2>
        <div className="card-avatar-container">
          <div className="avatar">
            <img
              alt="Author avatar"
              className="avatar-image"
              src={avatarPath}
            />
            <span className="avatar-fallback">SP</span>
          </div>
          <span className="author-name">Suzy Perry</span>
        </div>
      </div>
      <div className="card-content">
        <div className="reaction-container">
          <div className="reaction">
            <Heart className="reaction-icon" />
            <span className="reaction-count">75</span>
          </div>
          <div className="reaction">
            <MessageCircle className="reaction-icon" />
            <span className="reaction-count">20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
