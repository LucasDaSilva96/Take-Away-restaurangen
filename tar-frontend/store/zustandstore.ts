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

export interface CartProduct extends menuItemResponse {
  quantity: number;
}

export type CartState = {
  cart: CartProduct[];
  total: number;
  amount: number;
  menuOpen: boolean;
  navOpen: boolean;
};

interface Actions {
  addToCart: (product: CartProduct) => void;
  removeFromCart: (product: CartProduct) => void;
  clearItemFromCart: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
  toggleMenu: () => void;
  toggleNav: () => void;
  isSignedIn: () => boolean;
  currentRole: () => string;
}

//const cartKey = process.env.CART_KEY!;

const useCart = create<CartState & Actions>()((set) => ({
  cart: [],
  total: 0,
  amount: 0,
  menuOpen: false,
  navOpen: false,

  toggleMenu: () => {
    set((state) => {
      return {
        ...state,
        menuOpen: !state.menuOpen,
        navOpen: false,
      };
    });
  },
  toggleNav: () => {
    set((state) => {
      return {
        ...state,
        navOpen: !state.navOpen,
        menuOpen: false,
      };
    });
  },

  addToCart: (product) =>
    set((state) => {
      const prevCart = [...state.cart];
      const itemExists = [...state.cart].find((item) => item.id === product.id);

      if (itemExists) {
        console.log("Item exists", itemExists);
        itemExists.quantity += 1;
        state.amount += itemExists.price;
        state.total += 1;
      } else {
        const newEntry = { ...product, quantity: 1 };
        state.cart = [...prevCart, newEntry];
        state.amount += product.price;
        state.total += 1;
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

      if (itemExists) {
        if (itemExists.quantity > 1) {
          itemExists.quantity -= 1;
          state.amount -= itemExists.price;
          state.total -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== product.id);
          state.total -= 1;
          state.amount -= itemExists.price;
        }
      }

      return {
        ...state,
        prevCart,
      };
    });
  },

  clearItemFromCart: (productId) => {
    set((state) => {
      const target = state.cart.find((item) => item.id == productId);
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== productId),
        total: (state.total -= target!.quantity),
        amount: (state.amount -= target!.price * target!.quantity),
      };
    });
  },

  clearCart: () => {
    set((state) => {
      console.log("Cleared cart", state.cart);
      return {
        ...state,
        cart: [],
        total: 0,
        amount: 0,
      };
    });
  },

  getQuantity(productId) {
    const item = useCart
      .getState()
      .cart.find((item) => item.id === productId) as CartProduct | undefined;
    return item ? item.quantity : 0;
  },
  isSignedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  },
  currentRole() {
    const role = localStorage.getItem("role");
    if (role === "Admin") {
      return "Admin";
    } else {
      return "Customer";
    }
  },
}));

export default useCart;
