import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaComment } from 'react-icons/fa';
import "./Profil.css";


const Profil = () => {
// Retrieve userData from location state

  return (
    <div>
      <div className="container-product">
        <div className="box-1"></div>
        <div className="box-2">
          <div className="bio">                
            <h1>{localStorage.getItem('name')} {localStorage.getItem('last')}</h1>
            <p>"An aspiring amateur chef who loves experimenting with flavors and enjoys sharing their culinary creations with others."</p>
          </div>
          <div />
          <hr />
          <br />
          <h2>My recipes</h2>
          {/* {recipes.length ? (
            recipes.map(recipe => (
              <div className="recipe-p" key={recipe._id}>
                <img className="recipeimg" src={recipe.image} alt="Recipe" width="100px" />
                <div className="desc">
                  <ul>
                    <li>{recipe.name}</li>
                  </ul>
                  <button className="btn">Details</button>
                  <br />
                  <br />
                  <FaHeart /> {recipe.nb_likes} &nbsp;&nbsp;&nbsp;<FaComment /> 0
                </div>
              </div>
            ))
          ) : (
            <h3>No recipes</h3>
          )} */}
        </div>
      </div>
      <div 
        className="profil-pic" 
        style={{ backgroundImage: `url(${localStorage.getItem('photo')})` }}
      ></div>
    </div>
  )
}

export default Profil;
