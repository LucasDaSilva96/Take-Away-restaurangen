import { Order } from "../models/order.js";
import { v4 as uuidv4 } from "uuid";
import User from "../models/Users.js";
import {
  sendCancellation,
  sendConfirmation,
  sendReadyForPickup,
} from "../utils/sendConfirmation.js";
import {
  updateMenuInventory,
  updateNumberOfSalesOfMenu,
} from "../utils/updateMenuStats.js";

// Get all orders, or filter by today, this week, this month, this year
export const getOrders = async (req, res) => {
  try {
    let orders = null;
    const today = new Date();
    const query = req.query;

    if (query.sort === "today") {
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      orders = await Order.find({
        timestamp: { $gte: today, $lt: tomorrow },
      }).populate("user");
    } else if (query.sort === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      orders = await Order.find({
        timestamp: { $gte: startOfWeek, $lt: endOfWeek },
      }).populate("user");
    } else if (query.sort === "month") {
      const startOfMonth = new Date(today);
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      orders = await Order.find({
        timestamp: { $gte: startOfMonth, $lt: endOfMonth },
      }).populate("user");
    } else if (query.sort === "year") {
      const startOfYear = new Date(today);
      startOfYear.setMonth(0, 1);
      startOfYear.setHours(0, 0, 0, 0);
      const endOfYear = new Date(startOfYear);
      endOfYear.setFullYear(endOfYear.getFullYear() + 1);
      orders = await Order.find({
        timestamp: { $gte: startOfYear, $lt: endOfYear },
      }).populate("user");
    } else {
      orders = await Order.find()
        .sort({
          timestamp: "desc",
        })
        .populate("user");
    }

    res.status(200).json({
      message: "Successfully fetched orders",
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
    const order = await Order.findOne({ id }).populate("user");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Successfully fetched order",
      data: order,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const { items, message, userId, guestEmail } = req.body;
  try {
    // Count the total price of the items
    const total = items.reduce(
      (acc, item) => (acc + item.price) * item.quantity,
      0
    );
    if (total === 0) throw new Error("Total cannot be 0");

    if (items.length === 0) throw new Error("Items cannot be empty");

    // If userId is provided, find the user and create an order for them
    if (userId) {
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newOrder = {
        id: uuidv4(),
        items,
        total,
        message,
        user: user._id,
      };

      const order = await Order.create(newOrder);
      // Check if the inventory is enough for the items, and update the inventory
      await updateMenuInventory(order.items);

      // Update the number of sales for the items
      await updateNumberOfSalesOfMenu(order.items);

      user.orders.push(order);
      await user.save();

      await sendConfirmation(user.email, order.id, order.total);

      return res.status(201).json({
        message: "Successfully created order",
        id: order.id,
        data: order,
      });
    }

    if (!guestEmail) throw new Error("Email is required for guest orders");

    // If userId is not provided, create an order without a user
    const newOrder = {
      id: uuidv4(),
      items,
      total,
      message,
      guestEmail: guestEmail,
    };

    const order = await Order.create(newOrder);

    // Check if the inventory is enough for the items, and update the inventory
    await updateMenuInventory(order.items);

    // Update the number of sales for the items
    await updateNumberOfSalesOfMenu(order.items);

    await sendConfirmation(guestEmail, order.id);

    res.status(201).json({
      message: "Successfully created order",
      data: order,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  // This is the allowed keys that the user can send
  const allowedKeys = ["items", "total", "status", "isLocked", "message"];
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!id) throw new Error("No id provided");

    for (const key in req.body) {
      if (!allowedKeys.includes(key)) {
        return res.status(400).json({ message: `invalid key: ${key}` });
      }
    }

    const order = await Order.findOne({ id });
    if (!order) throw new Error("No order found with the provided id");

    if (order.isLocked && !status) throw new Error("This order is locked.");

    if (req.body.status === "cancelled" && order.status === "cancelled")
      throw new Error("This order is already cancelled.");

    // If the order is locked, send an email to the user
    if (req.body.locked === true) {
      if (order.user) {
        const user = await User.findById(order.user);
        if (!user) throw new Error("No user found with the provided id");
        await sendOrderLocked(user.email, order.id);
      }
    }

    let updatedOrder = null;

    if (req.body.items) {
      const total = req.body.items.reduce(
        (acc, obj) => (acc + obj.price) * obj.quantity,
        0
      );

      updatedOrder = await Order.findOneAndUpdate(
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
    } else {
      updatedOrder = await Order.findOneAndUpdate(
        { id },
        {
          ...order._doc,
          ...req.body,
        },
        {
          new: true,
        }
      );
    }

    if (order.user) {
      const user = await User.findById(order.user);
      if (!user) throw new Error("No user found with the provided id");

      const indexOfOrder = user.orders.findIndex(
        (item) => item.id === order.id
      );
      if (indexOfOrder < 0)
        throw new Error(
          "No order found in the user collection with the provided id"
        );

      user.orders[indexOfOrder] = updatedOrder;
      await user.save();

      if (req.body.status === "cancelled") {
        await sendCancellation(user.email, order.id);
      }
      if (req.body.status === "ready") {
        await sendReadyForPickup(user.email, order.id);
      }
    }

    res.status(200).json({
      message: "Order successfully updated",
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
    if (!id) throw new Error("No id provided");

    const order = await Order.findOne({ id }).populate("user");

    if (!order) throw new Error("No order found with the provided id.");

    if (order.user) {
      const user = await User.findById(order.user);
      if (!user) throw new Error("No user found with the provided id");

      user.orders = user.orders.filter((el) => el.id !== order.id);
      await user.save();
    }
    await Order.findByIdAndDelete(order._id);

    if (order.user && order.status !== "cancelled") {
      await sendCancellation(order.user.email, order.id);
    }

    res.status(200).json({
      message: "Order successfully deleted",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
