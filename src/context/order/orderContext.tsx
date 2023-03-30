import { createContext, useContext } from 'react';
import { IOrder, IOrderContext, IOrderItem, IOrderProviderProps } from './types';
import { noItemsToOrderError } from './errors';
import { toast } from 'react-toastify';
import uniqid from 'uniqid';
import { useCart } from '../cart/cartContext';

const OrderContext = createContext({} as IOrderContext);

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }: IOrderProviderProps) {
  const { clearCart } = useCart();

  function handleOrder({ items }: { items: IOrderItem[] }) {
    return new Promise((resolve, reject) => {
      try {
        const orderId = uniqid();
        if (!items) throw new Error(noItemsToOrderError);
        const orderPayload: IOrder = {
          orderId,
          items,
        };
        localStorage.setItem(orderId, JSON.stringify(orderPayload));
        clearCart();
        resolve(orderPayload);
      } catch (error: any) {
        toast.error(error?.message);
        reject(error);
      }
    });
  }

  function getOrder({ orderId }: { orderId: string }): IOrder {
    const json = localStorage.getItem(orderId) || '';
    return JSON.parse(json) || [];
  }

  return (
    <OrderContext.Provider
      value={{
        handleOrder,
        getOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
