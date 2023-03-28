import { ReactNode } from "react";

export interface ICartProviderProps {
  children: ReactNode;
}

export type ICartContext = {
  getQuantity: ({ id }: { id: string }) => number;
  addToCart: ({ id }: { id: string }) => void;
  increaseQuantity: ({ id }: { id: string }) => void;
  decreaseQuantity: ({ id }: { id: string }) => void;
  removeFromCart: ({ id }: { id: string }) => void;
  cartQuantity: number
  cartItems: ICartItem[]
};

export type ICartItem = {
  id: string;
  quantity: number;
};
