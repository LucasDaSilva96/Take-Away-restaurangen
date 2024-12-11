import { Order_Get } from './order';

// Create a new user item interface for the user object
export interface User_Post {
  email: string;
  password: string;
  role?: 'Admin' | 'Customer';
  username: string;
  image?: string;
}

// Get the user item interface for the user object
export interface User_Get extends User_Post {
  _id: string;
  id: string;
  role: 'Admin' | 'Customer';
  orders: Order_Get[];
  image: string;
  email: string;
  username: string;
}

// Create a new user login interface for the user object
export interface User_login_Post {
  email: string;
  password: string;
}
