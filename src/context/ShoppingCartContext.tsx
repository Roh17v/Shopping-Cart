import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import CartItem from "../components/CartItem";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./auth-context";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  cartQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsopen] = useState(false);

  const { user } = useAuth();

  function getItemQuantity(id: number) {
    return cartItems.find((currItem) => currItem.id == id)?.quantity || 0;
  }

  function incrementItemQuantity(id: number) {
    if (!user) {
      toast.error(
        "You must be signed in before you can add items to the cart",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return [...currItem, { id, quantity: 1 }];
      } else {
        return currItem.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
      }
    });
  }

  function decrementItemQuantity(id: number) {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return currItem.filter((item) => item.id !== id);
      } else {
        return currItem.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItem) => {
      return currItem.filter((item) => item.id !== id);
    });
  }

  const openCart = () => setIsopen(true);
  const closeCart = () => setIsopen(false);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        incrementItemQuantity,
        decrementItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        closeCart,
        openCart,
        setCartItems,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
