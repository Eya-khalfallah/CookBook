const Recipe = require("../models/Recipe");
const User = require('../models/User'); // Adjust the path as needed


exports.getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      console.log("Fetched recipes:", recipes);
  
      const emails = recipes.map(recipe => recipe.email); // Use 'email' here
      console.log("Emails extracted from recipes:", emails);
  
      const users = await User.find({ email: { $in: emails } });
      console.log("Fetched users:", users);
  
      const recipesWithChefInfo = recipes.map(recipe => {
        if (!recipe.email) {
          console.warn("Recipe without email:", recipe);
          return { ...recipe.toObject(), chef: null };
        }
        const chef = users.find(user => user.email === recipe.email);
        return {
          ...recipe.toObject(),
          chef: chef ? { name: chef.firstName + " " + chef.lastName, photo: chef.photo } : null,
        };
      });
  
      console.log("Recipes with chef info:", recipesWithChefInfo);
  
      res.json({ recipes: recipesWithChefInfo });
    } catch (error) {
      console.error("Error occurred while fetching recipes:", error);
      res.status(500).send("Error rendering recipes page");
    }
  };
  
exports.createRecipe = async (req, res) => {
  try {
        const {email , name, description, ingredients, category} = req.body;
    const photoUrl = req.file ? req.file.path : null;
    console.log(photoUrl);
    const recipe = new Recipe({
      email,
      name,
      description,
      ingredients,
      category,
      image: photoUrl,
    });

    await recipe.save();

    res.status(201).json({ message: "Recipe created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create recipe xD", details: error.message });
  }
};

exports.getRecipeByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const recipes = await Recipe.find({ category: category });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
