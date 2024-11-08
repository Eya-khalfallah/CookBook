import React, { useState, useEffect } from "react";
import { useRecipes } from "../../hooks/RecipeContext";
import { useParams } from "react-router-dom"; 
import Pagination from "./pagination";
import Table from "./table";
import "./home.css";
import "./Recipe.css";

function Recipe() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState(parseInt(pageNumber) || 1);

  const [limit] = useState(9);
  const { recipes, setRecipes } = useRecipes(); // Accessing recipes and setRecipes

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

  const getRecipes = (page, limit) => {
    return recipes.slice((page - 1) * limit, page * limit);
  };

  const totalPages = Math.ceil(recipes.length / limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="parent">
      <div className="container-h-recipe">
        <div className="box-12">
          <img src={require("./img/home12.jpg")} alt="Home" />
          <div className="text-container">
            <h1>EXPLORE RECIPES</h1>
          </div>
        </div>
        <div className="box-22">
          <div className="h-recipes-container">
            <div className="categories">
              <ul>
                <li><a className="categorie">ALL</a></li>
                <li><a className="categorie">STARTERS</a></li>
                <li><a className="categorie">MAIN COURSES</a></li>
                <li><a className="categorie">SIDE DISHES</a></li>
                <li><a className="categorie">DESSERTS</a></li>
              </ul>
            </div>
            <Table recipe={getRecipes(page, limit)} />
            <Pagination
              totalPage={totalPages}
              page={page}
              limit={limit}
              siblings={1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
