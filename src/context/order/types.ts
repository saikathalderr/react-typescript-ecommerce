import { ReactNode } from 'react';

export interface IOrderProviderProps {
  children: ReactNode;
}

export type IOrderContext = {
  handleOrder: ({ items }: { items: IOrderItem[] }) => Promise<unknown>;
  getOrder: ({ orderId }: { orderId: string }) => IOrder;
};

export type IOrderItem = {
  id: string;
  quantity: number;
};

export type IOrder = {
  orderId: string;
  items: IOrderItem[];
};
