// server.js
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
// Initialize dotenv to load environment variables
dotenv.config();

const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI; // MongoDB connection string
const port = PORT; // Port to listen on
// Middleware setup
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // To allow cross-origin requests
app.use(morgan("dev")); // HTTP request logger for development

// Routes setup
app.use("/users", userRoutes); // User routes (auth, profile, etc.)

// Static file handling for uploads (if you need to serve uploaded files)
app.use("/uploads", express.static("uploads"));

// Export app to be used in other files (like index.js or to start the server)
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
