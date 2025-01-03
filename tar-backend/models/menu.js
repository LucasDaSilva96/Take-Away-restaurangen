import mongoose from 'mongoose';

// Define the schema for the menu
const menuSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  image: {
    type: String,
    default: 'https://placehold.co/600x400',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  numberOfSales: {
    type: Number,
    default: 0,
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  inventory: {
    type: Number,
    required: [true, 'Inventory is required'],
    min: 0,
  },
  imageName: {
    type: String,
  },
});

// Create a model for the menu
const Menu = mongoose.model('Menu', menuSchema);
// Export the model
export { Menu, menuSchema };
