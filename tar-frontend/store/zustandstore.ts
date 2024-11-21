import { create } from "zustand";

interface menuItemResponse {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  ingredients: string[];
  numberOfSales: number;
  onSale: boolean;
}

interface CartProduct extends menuItemResponse {
  quantity: number;
}

export type CartState = {
  cart: CartProduct[];
  total: number;
  amount: number;
};

interface Actions {
  addToCart: (product: CartProduct) => void;
  removeFromCart: (product: CartProduct) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
}

//const cartKey = process.env.CART_KEY!;

const useCart = create<CartState & Actions>()((set) => ({
  cart: [],
  total: 0,
  amount: 0,

  addToCart: (product) =>
    set((state) => {
      const prevCart = [...state.cart];
      const itemExists = [...state.cart].find((item) => item.id === product.id);

      if (itemExists) {
        console.log("Item exists", itemExists);
        itemExists.quantity += 1;
        state.total += itemExists.price;
      } else {
        const newEntry = { ...product, quantity: 1 };
        state.cart = [...prevCart, newEntry];
        state.total += product.price;
      }

      console.log("Added item", prevCart);

      return {
        ...state,
      };
    }),

  removeFromCart: (product) => {
    set((state) => {
      const prevCart = [...state.cart];
      const itemExists = [...state.cart].find((item) => item.id === product.id);

      if (itemExists && itemExists.quantity > 1) {
        itemExists.quantity -= 1;
        state.amount -= itemExists.price;
        state.total -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== product.id);
      }

      return {
        ...state,
        prevCart,
      };
    });
  },

  clearCart: () => {
    set((state) => {
      console.log("Cleared cart", state.cart);
      return {
        ...state,
        cart: [],
      };
    });
  },

  getQuantity(productId) {
    const item = useCart
      .getState()
      .cart.find((item) => item.id === productId) as CartProduct | undefined;
    return item ? item.quantity : 0;
  },
}));

export default useCart;
