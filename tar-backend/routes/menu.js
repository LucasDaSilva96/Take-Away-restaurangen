import express from 'express';
import {
  getMenu,
  createMenu,
  updateMenu,
  getSingleMenu,
  deleteMenu,
} from '../controllers/menu.js';
import { uploadImageMiddleware } from '../utils/uploadImage.js';
import {checkAuth, checkRole} from "../middlewares/mw.js";

const router = express.Router();
// Get all menu items
router.get('/', getMenu);
// Get a single menu item
router.get('/:id', getSingleMenu);

// NOTE: Add authentication middleware // Added 281124 SG

// Create a new menu item
router.post('/', checkAuth, checkRole, uploadImageMiddleware.single('image'), createMenu);
// Update a menu item
router.patch('/:id', checkAuth, checkRole, uploadImageMiddleware.single('image'), updateMenu);
// Delete a menu item
router.delete('/:id', checkAuth, checkRole, deleteMenu);

export default router;
