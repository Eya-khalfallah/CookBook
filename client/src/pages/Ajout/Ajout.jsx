import React, { useState } from 'react';
import axios from 'axios';

import './Ajout.css';

function Ajout() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  const apiUrl = 'http://localhost:8000';

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send the form data
    const formData = new FormData();
    formData.append('email', localStorage.getItem('email'));
    formData.append('name', name);
    formData.append('description', description);
    formData.append('ingredients', ingredients.join(','));
    formData.append('category', category);
    formData.append('image', image);

    // Send the recipe data to the server
    try {
      const response = await axios.post(`${apiUrl}/recipes/create`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Recipe was successfully saved
        // Reset form fields
        setEmail('');
        setName('');
        setDescription('');
        setIngredients([]);
        setCategory('');
        setImage(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSubmitStatus({ message: 'Recipe saved successfully', type: 'success' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSubmitStatus({ message: 'Error saving recipe', type: 'error' });
      }
    } catch (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.error('Error saving recipe:', error);
      setSubmitStatus({ message: 'Error saving recipe', type: 'error' });
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);

    // Scroll to the newly added ingredient
    setTimeout(() => {
      const ingredientDivs = document.getElementsByClassName('ingredientDiv');
      const lastIngredientDiv = ingredientDivs[ingredientDivs.length - 1];
      lastIngredientDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleIngredientChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  return (
    <div className='box' style={{ backgroundImage: `url(${require('./img/img3.jpg')})`}}>
      <div className='form-container'>
        <form encType='multipart/form-data' id='form'>
          <div className='box-outer'>
            <h1>Submit Your Recipe</h1>
            <div>
              <p>Share your amazing recipes with thousands of web developers across the world. Fill our form to get started.</p>
            </div>
          </div>

          {submitStatus && <div className={`alert ${submitStatus.type}`}>{submitStatus.message}</div>}

          <div>
            <div className='form-control'>
              <label>Recipe Name</label>
              <input
                type='text'
                name='name'
                id='name'
                className='form-control'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='form-control'>
              <label>Description</label>
              <textarea
                name='description'
                id='description'
                className='form-control'
                cols='30'
                rows='4'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='form-control'>
              <label>Ingredients</label>
              <div className='ingredientList'>
                {ingredients.map((ingredient, index) => (
                  <div className='ingredientDiv mb-1' key={index}>
                    <input
                      type='text'
                      name='ingredients'
                      className='form-control'
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(e, index)}
                    />
                  </div>
                ))}
              </div>
              <button type='button' className='btn' onClick={handleAddIngredient}>
                + Ingredient
              </button>
            </div>

            <div className='form-control'>
              <label>Select Category</label>
              <select
                className='form-select form-control'
                name='category'
                aria-label='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                <option value='Dessert'>Dessert</option>
                <option value='Lunch'>Lunch</option>
                <option value='Dinner'>Dinner</option>
              </select>
            </div>

            <div className='form-control'>
              <label>Product Image</label>
              <input
                type='file'
                className='form-control'
                name='image'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className='form-control'>
              <button type='submit' id='submit' onClick={handleSubmit}>
                Submit Recipe
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Ajout;