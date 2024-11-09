import { Heart, MessageCircle } from "lucide-react";
import "./RecipeCard.css";

// {imagePath, avatarPath, title, author, likes, comments}
export default function RecipeCard(props) {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          alt="Recipe"
          className="card-image"
          src={props.e[0]} // Assuming this is the image path
        />
      </div>
      <div className="card-header">
        <h2 className="card-title">{props.e[1]}</h2>{" "}
        {/* Assuming this is the title */}
        <div className="card-avatar-container">
          <div className="avatar">
            <img
              alt="Author avatar"
              className="avatar-image"
              src={props.e[3]} // Fallback image
            />
            <span className="avatar-fallback">SP</span>
          </div>
          <span className="author-name">{props.e[2]}</span>
        </div>
      </div>
      <div className="card-content">
        <div className="reaction-container">
          <div className="reaction">
            <Heart className="reaction-icon" />
            <span className="reaction-count">{props.e[4]}</span>{" "}
            {/* Assuming this is the likes */}
          </div>
          <div className="reaction">
            <MessageCircle className="reaction-icon" />
            <span className="reaction-count">{props.e[5]}</span>{" "}
            {/* Assuming this is the comments */}
          </div>
        </div>
      </div>
    </div>
  );
}
