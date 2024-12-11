import { CartProduct } from "@/store/zustandstore";

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
  chefNote: string;
  status: string;
  isLocked: boolean;
  chefNote: string;
  timestamp: string;
}

export interface Order_Update {
  id: string;
  order: {
    items: CartProduct[];
    message?: string;
    chefNote?: string;
    status?: string;
    isLocked?: boolean;
    total?: number;
  };
}
