// Create a new menu item interface for the menu object
export interface Menu_Post {
  title: string;
  price: number;
  description: string;
  category: string;
  ingredients: string[];
  image: string;
  inventory: number;
  onSale?: boolean;
  quantity: number;
}

// Get the menu item interface for the menu object
export interface Menu_Get extends Menu_Post {
  _id: string;
  id: string;
  onSale: boolean;
  timestamp: string;
}
