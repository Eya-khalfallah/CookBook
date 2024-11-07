import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Pagination from "./pagination";
import Table from "./table";
import "./home.css";
import "./Recipe.css";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8000/recipes/all");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  function getRecipes(page, limit) {
    let array = [];
    for (let i = (page - 1) * limit; i < page * limit && recipes[i]; i++) {
      array.unshift(recipes[i]);
    }
    return array;
  }
  let getLength = recipes.length;

  let totalPages = Math.ceil(getLength / limit);

  const location = useLocation();
  function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") {
      localStorage.setItem("currentPage", 1);
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        localStorage.setItem("currentPage", page - 1);
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPages) {
        localStorage.setItem("currentPage", page + 1);
        setPage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ..." || value === "...") {
      localStorage.setItem("currentPage", totalPages);
      setPage(totalPages);
    } else {
      localStorage.setItem("currentPage", value);
      setPage(value);
    }
  }

  // refreshing page issue
  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setPage(parseInt(storedPage));
    }
  }, []);

  function NumberInPath(path) {
    let number = "";
    for (let i = 0; i < path.length; i++) {
      if (path[i] in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) {
        number += path[i];
      }
    }
    return number;
  }

  window.scrollTo({
    top: 0,
    left: 0,
  });

  /// My component
  function MyComponent() {
    return (
      <div>
        <div className="container-h-recipe">
          <div className="box-12">
            <img src={require("./img/home12.jpg")} />
            <div className="text-container">
              <h1>EXPLORE RECIPES</h1>
            </div>
          </div>
          <div className="box-22">
            <div className="h-recipes-container">
              <div className="categories">
                <ul>
                  <li>
                    <a className="categorie"> ALL </a>
                  </li>
                  <li>
                    <a className="categorie"> STARTERS </a>
                  </li>
                  <li>
                    <a className="categorie"> MAIN COURSES </a>
                  </li>
                  <li>
                    <a className="categorie"> SIDE DISHES </a>
                  </li>
                  <li>
                    <a className="categorie"> DESSERTS </a>
                  </li>
                </ul>
              </div>

              <Table recipe={getRecipes(page, limit)} />
            
              <Pagination
                totalPage={totalPages}
                page={page}
                limit={limit}
                siblings={1}
                onPageChange={handlePageChange}></Pagination>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    );
  }

  // the problem of previous and next button
  const path = location.pathname;
  useEffect(() => {
    const newPage = Number(NumberInPath(path));
    if (newPage === localStorage.getItem("currentPage")) {
      setPage(newPage);
    } else {
      localStorage.setItem("currentPage", newPage);
      setPage(newPage);
    }
  }, [path]);

  // giving title to the page
  let text = "page " + localStorage.getItem("currentPage");
  document.title = text;

  const path1 = location.pathname;
  if (path1 === "/recipe") {
    location.pathname += "/page1";
  }

  return (
    <div className="parent">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route path="page1" exact element={<MyComponent />} />
          <Route
            path={"page" + localStorage.getItem("currentPage")}
            exact
            element={<MyComponent />}
          />
        </Routes>
      )}
    </div>
  );
}

export default Recipe;
