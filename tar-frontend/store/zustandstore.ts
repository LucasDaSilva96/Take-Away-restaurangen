import { JWT_SECRET, ROLE_KEY } from "@/constants/localStorageKeys";
import { User_Get } from "@/types/user";
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
  role: string;
  user: User_Get;
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
  currentRole: () => void;
  updateUser: (user: User_Get) => void;
}

//const cartKey = process.env.CART_KEY!;

const useCart = create<CartState & Actions>()((set) => ({
  cart: [],
  total: 0,
  amount: 0,
  menuOpen: false,
  navOpen: false,
  role: "Customer",
  user: {
    _id: "",
    id: "",
    email: "",
    password: "",
    role: "Customer",
    orders: [],
  },

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
  updateUser: (user) => {
    set((state) => {
      return {
        ...state,
        user,
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
    if (localStorage.getItem(JWT_SECRET)) {
      return true;
    } else {
      return false;
    }
  },
  currentRole() {
    set((state) => {
      let newRole = "";
      const role = localStorage.getItem(ROLE_KEY);

      console.log("Role", role);
      if (role === "Admin") {
        newRole = "Admin";
      } else {
        newRole = "Customer";
      }
      return {
        ...state,
        role: newRole,
      };
    });
  },
}));

export default useCart;
