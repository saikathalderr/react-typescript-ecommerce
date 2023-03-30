import { Box, Button, Divider, List, Typography } from "@mui/material";
import { _getGrandTotal, _getTotalPrice } from "../helper";
import { useOrder } from "../context/order/orderContext";
import { useCart } from "../context/cart/cartContext";
import { ICartItem } from "../context/cart/types";
import { IOrder } from "../context/order/types";
import { ClearAll } from "@mui/icons-material";
import CartItem from "./CartItem";
import NoResults from "./NoResults";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems, clearCart, uiCloseCartDrawer } = useCart();
  const { handleOrder } = useOrder();
  const navigate = useNavigate();

  const handleCheckout = () => {
    handleOrder({ items: cartItems })
      .then((resp) => {
        const { orderId } = resp as IOrder;
        navigate(`/order-success/${orderId}`);
        uiCloseCartDrawer()
      })
      .catch((error) => toast.error(error.message));
  };

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
                  onClick={() => {
                    clearCart();
                    uiCloseCartDrawer();
                  }}
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
              <Button fullWidth variant="contained" onClick={handleCheckout}>
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
