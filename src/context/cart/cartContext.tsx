import { ICartContext, ICartItem, ICartProviderProps } from "./types";
import { createContext, useContext, useState } from "react";

const CartContext = createContext({} as ICartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: ICartProviderProps) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  function getQuantity({ id }: { id: number }) {
    return cartItems.find((item: ICartItem) => item.id === id)?.quantity || 0;
  }

  // getQuantity
  function increaseQuantity({ id }: { id: number }) {
    return setCartItems((currentItems: ICartItem[]) => {
      if (currentItems.find((item: ICartItem) => item.id === id) === null) {
        return [...currentItems, { id, quantity: 1 }]
      } else {
        return currentItems.map((item: ICartItem) => {
          if (item.id === id) return { ...item, quantity: item.quantity+1 }
          else return item
        })
      }
    });
  }
  function decreaseQuantity({ id }: { id: number }) {
    return setCartItems((currentItems: ICartItem[]) => {
      if (currentItems.find((item: ICartItem) => item.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id)
      } else {
        return currentItems.map((item: ICartItem) => {
          if (item.id === id) return { ...item, quantity: item.quantity-1 }
          else return item
        })
      }
    });
  }
  function removeFromCart({ id }: { id: number }) {
    setCartItems((currentItems: ICartItem[]) => currentItems.filter((item: ICartItem) => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
