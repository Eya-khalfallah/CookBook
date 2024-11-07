const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const upload = require('../middlewares/cloudinaryStorage');

// Recipe routes
router.post('/create', upload.single('image'), recipeController.createRecipe);

module.exports = router;