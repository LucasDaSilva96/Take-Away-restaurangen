import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Load environment variables
dotenv.config();

// Multer config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename for uploaded file
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer middleware to upload image
export const uploadImageMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    // Check file type to ensure it is an image
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true); // Accept the file
    } else {
      return cb(null, false); // Reject the file upload
    }
  },
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
