import { Menu } from '../models/menu.js';

// Get all menu items
const getMenu = async (_req, res) => {
    try {
      // Get all menu items from the database
      const menu = await Menu.find();
      // Return the menu items
      res.status(200).json({
        message: 'All menu items successfully retrieved',
        menu,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getMenu = getMenu;

// Create a new menu item
  const createMenu = async (req, res) => {
    try {
      // Get the title, price, description, category and ingredients from the request body
      const { title, price, description, category, ingredients } = req.body;
      // Check if any of the fields are empty
      if (!title || !price || !description || !category || !ingredients) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      // Create a new menu item
      const menu = new Menu({
        title,
        price,
        description,
        category,
        ingredients,
      });
      // Save the menu item to the database
      await menu.save();
      // Return a success message
      res.status(201).json({
        message: 'Menu item created successfully',
        menu,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.createMenu = createMenu;

