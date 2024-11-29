import { Menu_Post } from './menu';

// Create a new order item interface for the order object
export interface Order_Post {
  items: Menu_Post[];
  message?: string;
  userId?: string;
  guestEmail?: string;
}

// Get the order item interface for the order object
export interface Order_Get extends Order_Post {
  _id: string;
  id: string;
  total: number;
  status: string;
  isLocked: boolean;
  timestamp: string;
}
