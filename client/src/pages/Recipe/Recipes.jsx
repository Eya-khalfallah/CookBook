import React, { useState, useEffect } from "react";
import { useRecipes } from "../../hooks/RecipeContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import Table from "./table";
import "./home.css";
import "./Recipe.css";
import RecipesImage from "./img/home12.jpg";


function Recipe() {
  const { pageNumber } = useParams();
  const { category } = useParams();
  const [page, setPage] = useState(parseInt(pageNumber) || 1);

  const [limit] = useState(9);
  const { recipes, setRecipes } = useRecipes();

  const [selectedCategory, setSelectedCategory] = useState(category || "ALL");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

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

  // This will filter the recipes when the selected category changes
  useEffect(() => {
    if (selectedCategory === "ALL") {
      setFilteredRecipes(recipes); // Show all recipes
    } else {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.category.toUpperCase() === selectedCategory.toUpperCase()
      );

      setFilteredRecipes(filtered);
    }
  }, [selectedCategory, recipes]);

  // Handle category click to update the selected category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
    setPage(1);
  };

  const getRecipes = (page, limit) => {
    return filteredRecipes.slice((page - 1) * limit, page * limit);
  };

  const totalPages = Math.ceil(filteredRecipes.length / limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="parent">
      <div className="container-h-recipe">
        <div className="box-12">
          <img src={RecipesImage} alt="Home" loading="lazy" />
          <div className="text-container">
            <h1>EXPLORE RECIPES</h1>
          </div>
        </div>
        <div className="box-22">
          <div className="h-recipes-container">
            <div className="categories">
              <ul>
                <li>
                  <Link
                    className={`categorie ${
                      selectedCategory === "ALL" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick("ALL")}
                    to={"/recipe/ALL/page1"}>
                    ALL
                  </Link>
                </li>
                <li>
                  <Link
                    className={`categorie ${
                      selectedCategory === "STARTERS" ? "active" : ""
                    }`}
                    onClick={() => {handleCategoryClick("STARTERS"); }}
                    to={"/recipe/STARTERS/page1"}>
                    STARTERS
                  </Link>
                </li>
                <li>
                  <Link
                    className={`categorie ${
                      selectedCategory === "MAIN COURSES" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick("MAIN COURSES")}
                    to={"/recipe/MAIN COURSES/page1"}>
                    MAIN COURSES
                  </Link>
                </li>
                <li>
                  <Link
                    className={`categorie ${
                      selectedCategory === "SIDE DISHES" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick("SIDE DISHES")}
                    to={"/recipe/SIDE DISHES/page1"}>
                    SIDE DISHES
                  </Link>
                </li>
                <li>
                  <Link
                    className={`categorie ${
                      selectedCategory === "DESSERTS" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick("DESSERTS")}
                    to={"/recipe/DESSERTS/page1"}>
                    DESSERTS
                  </Link>
                </li>
              </ul>
            </div>
            <Table recipe={getRecipes(page, limit)} />
            <Pagination
              totalPage={totalPages}
              page={page}
              limit={limit}
              siblings={1}
              onPageChange={handlePageChange}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
