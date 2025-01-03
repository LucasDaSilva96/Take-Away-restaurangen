import { Menu } from '../models/menu.js';
import { deleteImage, uploadImage } from '../utils/uploadImage.js';
import { v4 as uuidv4 } from 'uuid';

// Get all menu items
export const getMenu = async (_req, res) => {
  try {
    // Get all menu items from the database
    const menu = await Menu.find();
    // Return the menu items
    res.status(200).json({
      message: 'All menu items successfully retrieved',
      data: menu,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new menu item
export const createMenu = async (req, res) => {
  const requiredFields = [
    'title',
    'price',
    'description',
    'category',
    'ingredients',
    'inventory',
    'onSale',
  ];
  try {
    let imageUrl = null;
    const {
      title,
      price,
      description,
      category,
      ingredients,
      inventory,
      onSale,
      imageName,
    } = req.body;
    req.body;
    // Check if any of the fields are empty
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (req.file) {
      const url = await uploadImage(req.file);
      if (!url) {
        return res.status(400).json({ message: 'Image upload failed' });
      }
      imageUrl = url;
    }

    // Create a new menu item
    const menu = new Menu({
      id: uuidv4(),
      title,
      price,
      description,
      category,
      ingredients,
      inventory,
      onSale: onSale === 'true',
      image: imageUrl ? imageUrl : 'https://placehold.co/600x400',
      imageName,
    });
    // Save the menu item to the database
    await menu.save();
    // Return a success message
    res.status(201).json({
      message: 'Menu item created successfully',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single menu item
export const getSingleMenu = async (req, res) => {
  try {
    // Find a menu item by id
    const menu = await Menu.findOne({ id: req.params.id });
    if (!menu) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    // Return the menu item
    res.status(200).json({
      message: 'Menu item successfully retrieved',
      data: menu,
    });
  } catch (error) {
    res.status(404).json({ message: 'Menu item not found' });
  }
};

// Update a menu item
export const updateMenu = async (req, res) => {
  // This is for making sure that only the allowed fields are updated
  const allowedUpdates = [
    'title',
    'price',
    'description',
    'category',
    'ingredients',
    'id',
    'image',
    'inventory',
    'onSale',
    'quantity',
    'numberOfSales',
    'imageName',
  ];

  let imageUrl = null;
  try {
    // Check if the fields to be updated are allowed
    for (const key in req.body) {
      if (!allowedUpdates.includes(key)) {
        return res.status(400).json({ message: `Invalid field: ${key}` });
      }
    }
    const menuItem = await Menu.findOne({ id: req.params.id });
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    if (req.file) {
      const url = await uploadImage(req.file);
      if (!url) {
        return res.status(400).json({ message: 'Image upload failed' });
      }
      imageUrl = url;
    }

    // Merge the existing menu item with the new data
    const newUpdatedMenu = {
      ...menuItem._doc,
      ...req.body,
      image: imageUrl ? imageUrl : menuItem.image,
    };
    // Find the menu item by id and update it
    const menu = await Menu.findOneAndUpdate(
      { id: req.params.id },
      newUpdatedMenu,
      {
        new: true,
      }
    );
    // Return a success message
    res.status(200).json({
      message: 'Menu item updated successfully',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a menu item
export const deleteMenu = async (req, res) => {
  try {
    // Find a menu item by id and delete it
    const menu = await Menu.findOneAndDelete({ id: req.params.id });
    if (!menu) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await deleteImage(menu.imageName);
    // Return a success message
    res.status(200).json({
      message: 'Menu item deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
