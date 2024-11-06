import React from "react";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import "./Home.css";
import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const preloadImages = (imagePaths) => {
  return imagePaths.map((path) => {
    const img = new Image();
    img.src = require(`${path}`);
    return img;
  });
};

function Home() {
  const imagePaths = [
    "./img/photo93.jpg",
    "./img/photo17.jpg",
    "./img/home22.jpg",
  ];
  const [featuredImage, setFeaturedImage] = useState(
    require(`${imagePaths[0]}`)
  ); // Set initial image directly
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let images = [];
    let currentIndex = 0;

    const preloadRemainingImages = async () => {
      images = preloadImages(imagePaths);
    };

    preloadRemainingImages().then(() => {
      setFeaturedImage(images[0].src);
    });

    const interval = setInterval(() => {
      setIsTransitioning(true);
      currentIndex = (currentIndex + 1) % images.length;
      setFeaturedImage(images[currentIndex].src);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="container-recipe">
        <div className={`box-13 ${isTransitioning ? "transitioning" : ""}`}>
          <img src={featuredImage} alt="Loading" />
          <div className="text-container-h">
            <h1>
              DELICIOUS RECIPES <br />
              DAILY UPDATED
            </h1>
            <p>Daily new Recipes and Cooking tips</p>
          </div>
        </div>
        <div className="box-23">
          <div className="recipes-container">
            <div className="categories-h">
              <h2>Popular Categories</h2>
            </div>
            <div className="populars">
              <div
                className="popular"
                style={{
                  backgroundImage: `url(${require("./img/desserts23.jpg")})`,
                }}></div>
              <div
                className="popular"
                style={{
                  backgroundImage: `url(${require("./img/photo4.jpg")})`,
                }}></div>
              <div
                className="popular"
                style={{
                  backgroundImage: `url(${require("./img/starters21.jpg")})`,
                }}></div>
            </div>
            <div className="populars-t">
              <h3>Desserts</h3>
              <h3>Main Courses</h3>
              <h3>Starters</h3>
            </div>
            <div className="border1"></div>
            <div className="recipes-p">
              <div>
                <h2>Most Liked Recipe</h2>
                <p>This Week</p>
              </div>
              <div className="most-liked">
                <div
                  className="recipe-p"
                  style={{
                    backgroundImage: `url(${require("./img/desserts23.jpg")})`,
                  }}></div>
                <div className="recipe-description-p">
                  <h3 className="recipe-title-p">
                    Recipe: <span>Garden Fresh Salad</span>
                  </h3>
                  <h3>Description:</h3>
                  <p>
                    This garden fresh salad is a delightful combination of crisp
                    vegetables, tangy dressing, and a sprinkle of cheese. It's a
                    light and healthy option packed with vitamins and flavors
                    that will leave you feeling refreshed and satisfied.
                  </p>
                  <h3>Category:</h3>
                </div>
              </div>
            </div>
            <div className="border2"></div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%", gap:"7vh",
              marginTop:"5vh",
            }}>
              <div>
                <h2>Most Recent Recipes</h2>
              </div>
              <div style={{ display: "grid",  gridTemplateColumns: "repeat(3, 1fr)", columnGap: "7vw", rowGap: "7vh", justifyContent:"center", alignItems:"center"}}>
              <RecipeCard imagePath="/thai-food.jpg" avatarPath="/chef.jpg" />
              <RecipeCard imagePath="/thai-food.jpg" avatarPath="/chef.jpg" />
              <RecipeCard imagePath="/thai-food.jpg" avatarPath="/chef.jpg" />
              <RecipeCard imagePath="/thai-food.jpg" avatarPath="/chef.jpg" />
              <RecipeCard imagePath="/thai-food.jpg" avatarPath="/chef.jpg" />
              <RecipeCard imagePath="/thai-food.jpg" avatarPath="/chef.jpg" />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
