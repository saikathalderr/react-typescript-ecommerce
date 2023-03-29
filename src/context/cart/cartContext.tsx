import { ICartContext, ICartItem, ICartProviderProps } from "./types";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({} as ICartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: ICartProviderProps) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  function isItemInCart(id: string) {
    return cartItems.find((item: ICartItem) => item.id === id);
  }
  function getQuantity({ id }: { id: string }) {
    return cartItems.find((item: ICartItem) => item.id === id)?.quantity || 0;
  }
  function addToCart({ id, quantity = 1 }: { id: string, quantity?: number }) {
    const hasItem = isItemInCart(id);
    if (!hasItem) setCartItems([...cartItems, { id, quantity }]);
    else increaseQuantity({ id })
  }
  function increaseQuantity({ id }: { id: string }) {
    const hasItem = isItemInCart(id);
    if (!hasItem) return;
    else {
      setCartItems((currentItems: ICartItem[]) => {
        return currentItems.map((item: ICartItem) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
      });
    }
  }
  function decreaseQuantity({ id }: { id: string }) {
    const hasItem = isItemInCart(id);
    if (!hasItem) return;
    else {
      setCartItems((currentItems: ICartItem[]) => {
        return currentItems.map((item: ICartItem) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
      });
    }
  }
  function removeFromCart({ id }: { id: string }) {
    setCartItems((currentItems: ICartItem[]) =>
      currentItems.filter((item: ICartItem) => item.id !== id)
    );
  }
  const cartQuantity = cartItems.reduce(
    (quantity, item: ICartItem) => item.quantity + quantity,
    0
  );

  useEffect(() => {
    console.log({ cartItems });
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        getQuantity,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
