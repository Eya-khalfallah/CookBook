const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  email: {
    type: String},
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  nb_likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: () => {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
