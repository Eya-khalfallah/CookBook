import React, { useState, useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";
import "./RecipeCard.css";

// {imagePath, avatarPath, title, author, likes, comments}
export default function RecipeCard(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/?email=${props.e[0]}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch chef:", error);
      }
    };
    fetchChef();
  }, []); // Run once on component mount

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          alt="Recipe"
          className="card-image"
          src={props.e[2]} // Assuming this is the image path
        />
      </div>
      <div className="card-header">
        <h2 className="card-title">{props.e[1]}</h2> {/* Assuming this is the title */}
        <div className="card-avatar-container">
          <div className="avatar">
            <img
              alt="Author avatar"
              className="avatar-image"
              src={user ? user.photo : "/path/to/default/avatar.jpg"} // Fallback image
            />
            <span className="avatar-fallback">SP</span>
          </div>
          <span className="author-name">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </span>
        </div>
      </div>
      <div className="card-content">
        <div className="reaction-container">
          <div className="reaction">
            <Heart className="reaction-icon" />
            <span className="reaction-count">{props.e[4]}</span> {/* Assuming this is the likes */}
          </div>
          <div className="reaction">
            <MessageCircle className="reaction-icon" />
            <span className="reaction-count">{props.e[5]}</span> {/* Assuming this is the comments */}
          </div>
        </div>
      </div>
    </div>
  );
}
