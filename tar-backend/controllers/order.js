import { Order } from '../models/order.js';

// Get all orders
export const getOrders = async (_req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      message: 'Successfully fetched orders',
      data: orders,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
