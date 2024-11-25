import { Order } from '../models/order.js';
import User from '../models/Users.js';
import {
  sendCancellation,
  sendConfirmation,
} from '../utils/sendConfirmation.js';

// Get all orders
export const getOrders = async (_req, res) => {
  try {
    const orders = await Order.find().populate('user');
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
    const order = await Order.findOne({ id }).populate('user');
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
  const { items, message, userId, email } = req.body;
  try {
    // Count the total price of the items
    const total = items.reduce(
      (acc, item) => (acc + item.price) * item.quantity,
      0
    );
    if (total === 0) throw new Error('Total cannot be 0');

    // If userId is provided, find the user and create an order for them
    if (userId) {
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      items.forEach((obj) => (obj.numberOfSales += 1));

      const newOrder = {
        items,
        total,
        message,
        user: user._id,
      };
      const order = await Order.create(newOrder);

      user.orders.push(order);
      await user.save();

      return res.status(201).json({
        message: 'Successfully created order',
        data: newOrder,
      });
    }

    // If userId is not provided, create an order without a user
    const newOrder = {
      items,
      total,
      message,
    };

    const order = await Order.create(newOrder);

    if (email) {
      await sendConfirmation(email, order.id);
    }

    res.status(201).json({
      message: 'Successfully created order',
      data: order,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  // This is the allowed keys that the user can send
  const allowedKeys = ['items', 'total', 'status', 'isLocked', 'message'];
  const { id } = req.params;
  const { isLocked } = req.body;

  try {
    if (!id) throw new Error('No id provided');
    if (isLocked === true) throw new Error('This order is locked.');

    for (const key in req.body) {
      if (!allowedKeys.includes(key)) {
        return res.status(400).json({ message: `invalid key: ${key}` });
      }
    }

    const order = await Order.findOne({ id });
    if (!order) throw new Error('No order found with the provided id');

    const total = req.body.items.reduce(
      (acc, obj) => (acc + obj.price) * obj.quantity,
      0
    );

    const updatedOrder = await Order.findOneAndUpdate(
      { id },
      {
        ...order._doc,
        ...req.body,
        total,
      },
      {
        new: true,
      }
    );

    if (order.user) {
      const user = await User.findById(order.user);
      if (!user) throw new Error('No user found with the provided id');

      const indexOfOrder = user.orders.findIndex(
        (item) => item.id === order.id
      );
      if (indexOfOrder < 0)
        throw new Error(
          'No order found in the user collection with the provided id'
        );

      user.orders[indexOfOrder] = updatedOrder;
      await user.save();
    }

    res.status(200).json({
      message: 'Order successfully updated',
      data: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('No id provided');

    const order = await Order.findOne({ id }).populate('user');

    if (!order) throw new Error('No order found with the provided id.');

    if (order.user) {
      const user = await User.findById(order.user);
      if (!user) throw new Error('No user found with the provided id');

      user.orders = user.orders.filter((el) => el.id !== order.id);
      await user.save();
    }
    await Order.findByIdAndDelete(order._id);

    if (order.user) {
      await sendCancellation(order.user.email, order.id);
    }

    res.status(200).json({
      message: 'Order successfully deleted',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
