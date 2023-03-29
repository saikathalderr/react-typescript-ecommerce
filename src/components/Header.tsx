import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Badge, Drawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useCart } from "../context/cart/cartContext";
import Cart from "./Cart";

export default function Header() {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const { cartQuantity } = useCart();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" position="static" sx={{ boxShadow: 0 }}>
          <Toolbar variant="dense">
            <Box sx={{ flexGrow: 1 }}></Box>
            <IconButton aria-label="cart" onClick={() => setOpenCart(true)}>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingBag color="action" />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={"right"}
          open={openCart}
          onClose={() => setOpenCart(false)}
          PaperProps={{
            sx: { width: 700 },
          }}
        >
          <Cart />
        </Drawer>
      </Box>
    </>
  );
}
