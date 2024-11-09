import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      setShowResults(false);
    } else {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSearchResults(filteredRecipes);
      setShowResults(true);
    }
  }, [searchTerm, recipes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigateToRecipe = (recipeId) => {
    navigate(`/item/${recipeId}`);
    setShowResults(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/">CookBook</Link>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/recipe/ALL/page1">Recipes</Link>
          {isLoggedIn && <Link className="nav-link add-recipe" to="/Ajout">Add Recipe</Link>}
        </div>
        <div className="navbar-search">
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
            aria-label="Search recipes"
          />
          {showResults && (
            <ul className="search-results">
              {searchResults.map((recipe) => (
                <li key={recipe.id} onClick={() => navigateToRecipe(recipe.id)}>
                  <img
                    src={`http://localhost:8000/uploads/${recipe.image}`}
                    alt={recipe.name}
                    width={40}
                    height={40}
                  />
                  <span>{recipe.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="navbar-auth">
          {isLoggedIn ? (
            <div className="user-actions">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
              <div className="user-profile">
                <Link to="/profil" className="user-name">
                  {localStorage.getItem("name")}
                </Link>
                <Link to="/profil" className="user-photo">
                  <img
                    src={localStorage.getItem('photo')}
                    alt="User profile"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link className="nav-link" to="/signup">Sign Up</Link>
              <Link className="nav-link login" to="/login">Login</Link>
            </>
          )}
        </div>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}