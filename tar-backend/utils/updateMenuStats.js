import { Menu } from '../models/menu.js';

// Update the number of inventory for each menu item
export const updateMenuInventory = async (items) => {
  for (const item of items) {
    try {
      const menuItem = await Menu.findById(item._id);
      if (!menuItem) {
        throw new Error('No menu item found with the provided id');
      }

      if (menuItem.inventory < item.quantity) {
        throw new Error('Not enough inventory for the menu');
      }

      menuItem.inventory =
        menuItem.inventory - item.quantity > 0
          ? menuItem.inventory - item.quantity
          : 0;
      await menuItem.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

// Update the number of sales for each menu item
export const updateNumberOfSalesOfMenu = async (items) => {
  for (const item of items) {
    try {
      const menuItem = await Menu.findById(item._id);
      if (!menuItem) {
        throw new Error('No menu item found with the provided id');
      }

      menuItem.numberOfSales += item.quantity;
      await menuItem.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
