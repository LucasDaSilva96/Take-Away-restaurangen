import express from 'express';
import {
  getMenu,
  createMenu,
  updateMenu,
  getSingleMenu,
  deleteMenu,
} from '../controllers/menu.js';
import { uploadImageMiddleware } from '../utils/uploadImage.js';
import { checkAuth, checkRole } from '../middlewares/mw.js';

// TODO: Add authentication middleware, Not working atm. Tested with the front-end and it didn't work.

const router = express.Router();
// Get all menu items
router.get('/', getMenu);
// Get a single menu item
router.get('/:id', getSingleMenu);

// NOTE: Add authentication middleware // Added 281124 SG

// Create a new menu item
router.post('/', uploadImageMiddleware.single('image'), createMenu);
// Update a menu item
router.patch('/:id', uploadImageMiddleware.single('image'), updateMenu);
// Delete a menu item
router.delete('/:id', deleteMenu);

export default router;
