// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/cloudinaryStorage');  // Multer Cloudinary storage middleware

// User routes
router.post('/register', upload.single('photo'), userController.createUser);
router.post('/login', userController.login);

module.exports = router;
