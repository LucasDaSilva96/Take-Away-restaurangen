import mongoose, { Schema } from 'mongoose';
import { menuSchema } from './menu.js';

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  guestEmail: {
    type: String,
    default: '',
  },
});

// Create a model for the order
const Order = mongoose.model('Order', orderSchema);

export { Order };
