import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import HomeImage1 from "./img/photo93.jpg";
import HomeImage2 from "./img/photo17.jpg";
import HomeImage3 from "./img/home22.jpg";
import { useRecipes } from "../../hooks/RecipeContext";

const preloadImages = (imagePaths) => {
  return imagePaths.map((path) => {
    const img = new Image();
    img.src = `${path}`;
    return img;
  });
};

function Home() {
  const { recipes, setRecipes } = useRecipes();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8000/recipes/all");
        const data = await response.json();
        setRecipes(data.recipes.reverse());
      } catch (error) {
        console.error("Error fetching recipes:");
      }
    };

    fetchRecipes();
  }, [setRecipes]);

  const imagePaths = [
    HomeImage1,
    HomeImage2,
    HomeImage3
  ];
  const [featuredImage, setFeaturedImage] = useState(
    `${imagePaths[0]}`
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
          <img src={featuredImage} alt="Loading" loading="lazy" />
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
            <Link
                to="/recipe/DESSERTS/page1"
                className="popular"
                style={{
                  backgroundImage: `url(${require("./img/desserts23.jpg")})`,
                }}
              ></Link>
            <Link
                to="/recipe/MAIN COURSES/page1"
                className="popular"
                style={{
                  backgroundImage: `url(${require("./img/photo4.jpg")})`,
                }}
              ></Link>
            <Link
                to="/recipe/STARTERS/page1"
                className="popular"
                style={{
                  backgroundImage: `url(${require("./img/starters21.jpg")})`,
                }}
              ></Link>
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
              {recipes.slice(0, 6).map((recipe) => (
                <RecipeCard key={recipe._id} e={[recipe.image, recipe.name, recipe.chef.name, recipe.chef.photo, recipe.nb_likes, recipe.comment]} />
              ))}
              </div>
             
            </div>
          </div>
        </div>
      </div>
      <div className="border1"></div>
    </div>
  );
}

export default Home;
