import { ICartItem } from "../context/cart/types";
import db from '../data/products.json'

export function _getTotalPrice({ price, quantity }: { price: number, quantity: number }): number {
    return Number(Number(price * quantity).toFixed(2))
}

export function _getGrandTotal({ items }: { items: ICartItem[] }): number {
    let total = 0

    items.forEach(item => {
        const { id, quantity } = item
        const price = db.find(product => product.id === id)?.price || 0
        total = total + _getTotalPrice({ price, quantity })
    })

    return Number(Number(total).toFixed(2))
}