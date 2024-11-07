const Recipe = require("../models/Recipe");

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
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

        res.status(201).json({message: "Recipe created successfully"});
    } catch (error) {
        res.status(400).json({ error: "Failed to create recipe xD", details: error.message });
    }
};