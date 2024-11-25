import mongoose from 'mongoose';
import { menuSchema } from './menu.js';
import { v4 as uuidv4 } from 'uuid';

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
  },
  items: {
    type: [menuSchema],
    required: [true, 'Items are required'],
  },
  total: {
    type: Number,
    required: [true, 'Total is required'],
  },
  status: {
    type: String,
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
});

// Create a model for the order
const Order = mongoose.model('Order', orderSchema);

export { Order };
