const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const upload = require('../middlewares/cloudinaryStorage');

// Recipe routes
router.post('/create', upload.single('image'), recipeController.createRecipe);
router.get('/all', recipeController.getAllRecipes);
router.get('/', recipeController.getRecipeByCategory);
router.get('/:email', recipeController.getRecipeByChef);

module.exports = router;