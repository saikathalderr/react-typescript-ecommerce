import { ICartItem } from "../context/cart/types";
import db from "../data/products.json";
import { IProduct } from "../interface";

export function _getTotalPrice({
  price,
  quantity,
  taxRate,
}: {
  price: number;
  quantity: number;
  taxRate: number;
}): number {
  const regularPrice = price * quantity;
  const finalPrice = regularPrice * (1 + taxRate / 100);
  return Number(finalPrice.toFixed(2));
}

export function _getGrandTotal({ items }: { items: ICartItem[] }): number {
  let total = 0;

  items.forEach((item) => {
    const { id, quantity } = item;
    const product: IProduct | undefined = db.find(
      (product) => product.id === id
    );
    if (!product) return;
    const { price = 0, taxRate = 0 } = product;

    total = total + _getTotalPrice({ price, quantity, taxRate });
  });

  return Number(Number(total).toFixed(2));
}
