import { ReactNode } from "react";

export interface ICartProviderProps {
  children: ReactNode;
}

export type ICartContext = {
  getQuantity: ({ id }: { id: number }) => number;
  increaseQuantity: ({ id }: { id: number }) => void;
  decreaseQuantity: ({ id }: { id: number }) => void;
  removeFromCart: ({ id }: { id: number }) => void;
};

export type ICartItem = {
  id: number;
  quantity: number;
};
