const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'users_photos',  // specify the folder on Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => file.originalname,  // Use original filename or specify your own unique ID
  },
});

const upload = multer({ storage });

module.exports = upload;
