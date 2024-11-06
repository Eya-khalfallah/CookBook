const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUserValidation = require("../Validation/createUserValidation");
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, nationality, password } = req.body;

    // Remove Cloudinary logic for testing purposes
    let photo = req.body.photo; // photo sent as URL, if provided

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      email,
      firstName,
      lastName,
      nationality,
      password: hashedPassword,
      photo,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ error: "Failed to register user", details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    res.json({ token, userData: user });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update user profile (e.g., update name, photo)
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, nationality } = req.body;
    let { photo } = req.body; // photo is sent as URL after uploading to Cloudinary

    // If there's a file uploaded, use the Cloudinary URL
    if (req.file) {
      photo = req.file.secure_url; // The secure URL of the uploaded image
    }

    // Find and update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, nationality, photo },
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update user profile", details: error.message });
  }
};
