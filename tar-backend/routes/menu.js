import express from 'express';
import {
  getMenu,
  createMenu,
  updateMenu,
  getSingleMenu,
  deleteMenu,
} from '../controllers/menu.js';
import { uploadImageMiddleware } from '../utils/uploadImage.js';

const router = express.Router();
// Get all menu items
router.get('/', getMenu);
// Get a single menu item
router.get('/:id', getSingleMenu);

// TODO: Add authentication middleware ↓
// Create a new menu item
router.post('/', uploadImageMiddleware.single('image'), createMenu);
// Update a menu item
router.patch('/:id', uploadImageMiddleware.single('image'), updateMenu);
// Delete a menu item
router.delete('/:id', deleteMenu);

export default router;
