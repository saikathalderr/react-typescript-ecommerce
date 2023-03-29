import { Box, Divider, List, Typography } from "@mui/material";
import { useCart } from "../context/cart/cartContext";
import { ICartItem } from "../context/cart/types";
import CartItem from "./CartItem";
import NoResults from "./NoResults";
import { _getGrandTotal, _getTotalPrice } from "../helper";

function Cart() {
  const { cartItems } = useCart();

  return (
    <Box sx={{ p: 10 }}>
      {cartItems.length ? (
        <>
          <List>
            {cartItems.map((item: ICartItem, idx: number) => (
              <CartItem item={item} key={item.id + "-" + idx + 1} />
            ))}
          </List>
          <Divider />
          <Box sx={{ position: 'sticky', bottom: 0, background: '#FFF' }}>
            <Box sx={{ display: "flex", p: 2 }}>
              <Box sx={{ flexGrow: "1" }}></Box>
              <Box>
                <Typography variant="h6">
                  <b>Total: ${_getGrandTotal({ items: cartItems })}</b>
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <NoResults />
      )}
    </Box>
  );
}

export default Cart;
