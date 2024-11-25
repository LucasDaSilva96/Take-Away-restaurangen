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

// Get a single order
export const getSingleOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({
      message: 'Successfully fetched order',
      data: order,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const order = req.body;

  try {
    const newOrder = await Order.create(order);
    res.status(201).json({
      message: 'Successfully created order',
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
