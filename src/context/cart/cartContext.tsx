import { ICartContext, ICartItem, ICartProviderProps } from "./types";
import { createContext, useContext, useState } from "react";
import db from "../../data/products.json";
import { IProduct } from "../../interface";
import { toast } from "react-toastify";
import {
  exceedMaxNumbersOfProductsError,
  maxCartItemsAllowedError,
  maxQuantityAllowedWarning,
  productIsOosError,
} from "./errors";
import { MAX_CART_ITEM } from "../../constant";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const CartContext = createContext({} as ICartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: ICartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>("cart", []);
  const [openCart, setOpenCart] = useState<boolean>(false);

  function getItemMaxAmount(id: string) {
    return db.find((product: IProduct) => product.id === id)?.maxAmount || 0;
  }
  function isItemInCart(id: string) {
    return cartItems.find((item: ICartItem) => item.id === id);
  }
  function getQuantity({ id }: { id: string }) {
    return cartItems.find((item: ICartItem) => item.id === id)?.quantity || 0;
  }
  function addToCart({ id, quantity = 1 }: { id: string; quantity?: number }) {
    const hasItem = isItemInCart(id);
    if (cartQuantity >= MAX_CART_ITEM) {
      return toast.error(maxCartItemsAllowedError);
    } else if (!hasItem) {
      const maxQty = getItemMaxAmount(id);
      if (maxQty <= 0) {
        return toast.error(productIsOosError);
      } else if (quantity >= maxQty) {
        quantity = maxQty;
        toast.warning(maxQuantityAllowedWarning + maxQty);
      }
      setCartItems([...cartItems, { id, quantity }]);
    } else increaseQuantity({ id });
  }
  function increaseQuantity({ id }: { id: string }) {
    const hasItem = isItemInCart(id);
    const maxQty = getItemMaxAmount(id);

    if (!hasItem) return;
    else if (cartQuantity >= MAX_CART_ITEM) {
      return toast.error(maxCartItemsAllowedError);
    } else {
      if (maxQty <= 0) {
        return toast.error(productIsOosError);
      } else if (hasItem.quantity >= maxQty)
        return toast.error(exceedMaxNumbersOfProductsError);

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
  function clearCart() {
    return setCartItems([]);
  }
  function handleOpenCart() {
    setOpenCart(true)
  }
  function handleCloseCart() {
    setOpenCart(false)
  }
  const cartQuantity = cartItems.reduce(
    (quantity, item: ICartItem) => item.quantity + quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        getQuantity,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        handleOpenCart,
        handleCloseCart,
        openCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
