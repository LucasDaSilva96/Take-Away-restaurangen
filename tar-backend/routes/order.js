import express from 'express';
import {
  getOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/order.js';
const router = express.Router();

// Get all orders
router.get('/', getOrders);
// Get a single order
router.get('/:id', getSingleOrder);
// Create a new order
router.post('/', createOrder);
// Update order
router.patch('/:id', updateOrder);
// Delete order
router.delete('/:id', deleteOrder);

export default router;
