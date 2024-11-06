import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLetter, setSearchLetter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Track whether to show search results or not

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch("http://localhost:8000/recipes");
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

  useEffect(() => {
    if (searchLetter === "") {
      setSearchResults(recipes);
    } else {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.startsWith(searchLetter)
      );
      setSearchResults(filteredRecipes);
    }
    setShowResults(searchLetter !== ""); // Show results only when there is a filter
  }, [searchLetter, recipes]);

  function handleSearchLetterChange(event) {
    setSearchLetter(event.target.value);
  }

  let navigate = useNavigate();

  const navigateToRecipe = (recipeId) => {
    navigate(`/item/${recipeId}`);
  };
  
  if (localStorage.getItem('token')) {
    return (
      <div className='navbar'>
        <div className='avant log'>
          <div className="nav"><Link className='lien' to="/">Home</Link></div>
          <div className="nav"><Link className='lien' to="/recipe">Recipes</Link></div>
          <div className="nav">
          <input
            className='search'
            type="text"
            value={searchLetter}
            onChange={handleSearchLetterChange}
            placeholder="Enter a letter to search"
          /></div>  
          <div className="nav"> <Link className='lien v3' to="/Ajout" style={{ backgroundColor: 'rgb(76, 106, 61)', color: '#fff' }}>Ajouter</Link></div>

          <div className="nav">
            <button className='btn-h' onClick={() => { navigate("/login"); localStorage.removeItem("token") }}>Logout</button>
          </div>
<div className="useeer">
          <div className="nav">
          <Link to="/profil"><img src={`http://localhost:8000/uploads/${localStorage.getItem('photo')}`}  className='photoo'/></Link>
          </div>
          
          <div className="nav">
            <Link to="/profil" className='nom'><p className='logout'>{localStorage.getItem('name')}</p></Link>
          </div>
          </div>
        </div>
        {showResults && (
          <div className='divv'>
            <ul>
              {searchResults.map(recipe => (
              <Link to="/item" >  <li key={recipe.id} onClick={() => navigateToRecipe(recipe.id)} className='lista'>
                 <img src={`http://localhost:8000/uploads/${recipe.image}`} alt="Recipe Photo" width={12}/>               
                  {recipe.name}
                </li></Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className='avant'>
        <div className="nav"><Link className='lien' to="/">Home</Link></div>
        <div className="nav"> <Link className='lien' to="/recipe">Recipes</Link></div>
        <div className="nav">
          <input className='search'
          type="text"
          value={searchLetter}
          onChange={handleSearchLetterChange}
          placeholder="Enter a letter to search"
        /></div>
        <div className="nav">
        <Link className='lien' to="/signup">Sign Up</Link>
        </div>
        <div className="nav">       
        <Link className="lien v3" to="/login" style={{ backgroundColor: 'rgb(76, 106, 61)', color: '#fff' }}>
    Login
  </Link></div>
      </div>
      {showResults && (
        <div style={{ overflowY: "scroll", maxHeight: "200px" }}>
          <ul>
            {searchResults.map(recipe => (
              <li key={recipe.id} onClick={() => navigateToRecipe(recipe.id)} className='lista'>
                <img src={`http://localhost:8000/uploads/${recipe.image}`} alt="Recipe Photo" width={12}/>              {recipe.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}