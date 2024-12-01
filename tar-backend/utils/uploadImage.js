import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Multer config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.', 400), false);
  }
}

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/');
  },
  fileFilter: fileFilter,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Multer middleware to upload image
export const uploadImageMiddleware = multer({
  storage: storage,
});

// Function to upload image to cloudinary
export const uploadImage = async (imageFile) => {
  try {
    let imageUrl = null;

    const result = await cloudinary.uploader.upload(
      './public/images/' + imageFile.filename,
      {
        folder: 'Take Away Restaurangen',
        resource_type: 'image',
      }
    );
    // Get the secure URL of the uploaded image
    imageUrl = result.secure_url;

    if (!imageUrl) {
      throw new Error('Image upload failed');
    }
    return imageUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to delete image from the server
export const deleteImage = async (imageName) => {
  try {
    fs.unlinkSync('./public/images/' + imageName);
  } catch (error) {
    throw new Error(error.message);
  }
};
