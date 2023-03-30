import { useCart } from '../context/cart/cartContext';
import { IProduct } from '../interface';
import AmountSlider from './AmountSlider';
import ProductAutocomplete from './ProductAutocomplete';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { _getTotalPrice } from '../helper';

function ProductList() {
  const [product, setProduct] = useState<IProduct | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { addToCart } = useCart();

  const reset = () => {
    setProduct(undefined);
    setQuantity(1);
    setTotalPrice(0);
  };

  const handleProductSelect = (product: IProduct) => {
    setProduct(product);
    setQuantity(1);
  };
  const handleQuantity = (quantity: number) => {
    setQuantity(quantity);
  };
  const handleAddingToCart = () => {
    if (!product) return;

    addToCart({ id: product.id, quantity });
    reset();
  };

  useEffect(() => {
    if (product)
      setTotalPrice(
        _getTotalPrice({
          price: product.price,
          quantity,
          taxRate: product.taxRate,
        }),
      );
    else reset();
  }, [product, quantity]);

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <ProductAutocomplete handleProductSelect={handleProductSelect} />
        </Grid>
        <Grid item xs={6}>
          <AmountSlider
            handleQuantity={handleQuantity}
            quantity={quantity}
            product={product}
            totalPrice={totalPrice}
            disabled={!product}
          />
        </Grid>
        <Grid item xs='auto'>
          <Button variant='contained' disabled={!product} onClick={handleAddingToCart}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductList;
