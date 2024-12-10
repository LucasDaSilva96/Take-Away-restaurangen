import { CartProduct } from "@/store/zustandstore";
import { Menu_Get } from "./menu";

// Create a new order item interface for the order object
export interface Order_Post {
  items: CartProduct[];
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

export interface Order_Update {
  id: string;
  order: {
    items: Menu_Get[];
    message?: string;
    status?: string;
    isLocked?: boolean;
    total?: number;
  };
}
