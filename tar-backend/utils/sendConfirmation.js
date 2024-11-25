import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER_NAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Function to send order confirmation email
export const sendConfirmation = async (email, orderId) => {
  try {
    await transporter.sendMail({
      from: '"🍕Take Away Restaurant🍕"<smtp@mailtrap.io>',
      to: email,
      subject: 'Order Confirmation✅',
      text: `Your order with id #${orderId} has been confirmed and is being processed. We will notify you once your order is ready for pickup.`,
      html: `<b>Your order with id #${orderId} has been confirmed and is being processed. We will notify you once your order is ready for pickup.</b>`,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to send cancellation email
export const sendCancellation = async (email, orderId) => {
  try {
    await transporter.sendMail({
      from: '"🍕Take Away Restaurant🍕"<smtp@mailtrap.io>',
      to: email,
      subject: 'Order Cancellation❌',
      text: `Your order with id #${orderId} has been cancelled.`,
      html: `<b>Your order with id #${orderId} has been cancelled.</b>`,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to send ready for pickup email
export const sendReadyForPickup = async (email, orderId) => {
  try {
    await transporter.sendMail({
      from: '"🍕Take Away Restaurant🍕"<smtp@mailtrap.io>',
      to: email,
      subject: 'Order Ready for Pickup🚗',
      text: `Your order with id #${orderId} is ready for pickup. Please come to the restaurant to collect your order.`,
      html: `<b>Your order with id #${orderId} is ready for pickup. Please come to the restaurant to collect your order.</b>`,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
