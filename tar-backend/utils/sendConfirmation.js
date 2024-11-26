import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 587,
  secure: false,
  service: 'gmail',
  auth: {
    user: process.env.MAILTRAP_USER_NAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Function to send order confirmation email
export const sendConfirmation = async (email, orderId, total) => {
  try {
    await transporter.sendMail({
      from: '"🍕Take Away Restaurant🍕"<smtp@mailtrap.io>',
      to: email,
      subject: 'Order Confirmation✅',
      text: `Your order with id #${orderId} has been confirmed and is being processed. We will notify you once your order is ready for pickup. Est. time: 20 mins`,
      html: `
      <div style="background-color: #f8f9fa; padding: 20px;">
      <p>Your order with id <strong>#${orderId}</strong> has been confirmed and is being processed. We will notify you once your order is ready for pickup.</p>
      <p>Est. time: 20 mins</p>
      <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Pay now ${total}$</button>
      <p>Thank you for choosing Take Away Restaurant.</p>
      </div>
      `,
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
      html: `
      <div style="background-color: #f8f9fa; padding: 20px;">
      <p>Your order with id <strong>#${orderId}</strong> is ready for pickup. Please come to the restaurant to collect your order.</p>
      <p>Thank you for choosing Take Away Restaurant.</p>
      </div>
      `,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to inform user that order is locked
export const sendOrderLocked = async (email, orderId) => {
  try {
    await transporter.sendMail({
      from: '"🍕Take Away Restaurant🍕"<<smtp@mailtrap.io>',
      to: email,
      subject: 'Order Locked❗',
      text: `Your order with id #${orderId} is locked and cannot be cancelled.`,
      html: `
      <div style="background-color: #f8f9fa; padding: 20px;">
      <p>Your order with id <strong>#${orderId}</strong> is locked and cannot be cancelled.</p>
      <p>We are currently processing your order and will notify you once it is ready for pickup.</p>
      <p>If you have any questions, please contact us at 123-456-7890.</p>
      </div>
      `,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
