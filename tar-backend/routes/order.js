import express from 'express';
import { getOrders } from '../controllers/oder.js';
const router = express.Router();

// Get all orders
router.get('/', getOrders);

export default router;
