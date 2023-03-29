import { Box, Button, Divider, List, Typography } from "@mui/material";
import { ClearAll } from "@mui/icons-material";
import { useCart } from "../context/cart/cartContext";
import { ICartItem } from "../context/cart/types";
import CartItem from "./CartItem";
import NoResults from "./NoResults";
import { _getGrandTotal, _getTotalPrice } from "../helper";

function Cart() {
  const { cartItems, clearCart } = useCart();

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
          <Box sx={{ position: "sticky", bottom: 0, background: "#FFF" }}>
            <Box sx={{ display: "flex", p: 2 }}>
              <Box sx={{ flexGrow: "1" }}>
                <Button
                  startIcon={<ClearAll />}
                  color="error"
                  size="small"
                  onClick={() => clearCart()}
                >
                  Clear
                </Button>
              </Box>
              <Box>
                <Typography variant="h6">
                  <b>Total: ${_getGrandTotal({ items: cartItems })}</b>
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button fullWidth variant="contained">
                Buy
              </Button>
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
