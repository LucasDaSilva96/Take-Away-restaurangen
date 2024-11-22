import express from 'express';
import { getMenu, createMenu } from '../controllers/menu.js';
const router = express.Router();
// Get all menu items
router.get('/', getMenu);

// Create a new menu item
// TODO: Add authentication middleware ?
router.post('/', createMenu);

export default router;
