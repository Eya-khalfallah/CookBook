const Recipe = require("../models/Recipe");
const User = require("../models/User"); // Adjust the path as needed

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    const emails = recipes.map((recipe) => recipe.email); // Use 'email' here

    const users = await User.find({ email: { $in: emails } });

    const recipesWithChefInfo = recipes.map((recipe) => {
      if (!recipe.email) {
        console.warn("Recipe without email:", recipe);
        return { ...recipe.toObject(), chef: null };
      }
      const chef = users.find((user) => user.email === recipe.email);
      return {
        ...recipe.toObject(),
        chef: chef
          ? { name: chef.firstName + " " + chef.lastName, photo: chef.photo }
          : null,
      };
    });

    res.json({ recipes: recipesWithChefInfo });
  } catch (error) {
    console.error("Error occurred while fetching recipes:", error);
    res.status(500).send("Error rendering recipes page");
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { name, email, description, ingredients, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageUrl = req.file.path;

    const newRecipe = new Recipe({
      name,
      email,
      description,
      ingredients: ingredients.split(","), // Convert ingredients to an array
      category,
      image: imageUrl,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Error saving recipe" });
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

exports.getRecipeByChef = async (req, res) => {
  try {
    const recipes = await Recipe.find({ email: req.params.email });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
