import { DeleteOutline, LocalMallOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useCart } from "../context/cart/cartContext";
import { ICartItem } from "../context/cart/types";
import db from "../data/products.json";
import { _getTotalPrice } from "../helper";
import { IProduct } from "../interface";

function CartItem({ item }: { item: ICartItem }) {
  const { removeFromCart } = useCart();

  const product: IProduct | undefined = db.find((e) => e.id === item.id);

  if (!product) return null;

  return (
    <ListItem
      dense
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          color="error"
          onClick={() => removeFromCart({ id: item.id })}
        >
          <DeleteOutline />
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <LocalMallOutlined />
        </ListItemIcon>
        <ListItemText
          primary={product?.productName}
          secondary={
            <>
              <Box sx={{ display: "flex" }}>
                <Box> ${product?.price}</Box>
                <Box sx={{ px: 0.5 }}></Box>
                <Box>
                  <b>x{item.quantity}</b>
                </Box>
                <Box sx={{ flexGrow: "1" }}></Box>
                <Box><small>{product.taxRate}% Tax</small></Box>
                <Box sx={{ px: 0.5 }}></Box>
                <Box>
                  $
                  {_getTotalPrice({
                    price: product?.price,
                    quantity: item.quantity,
                    taxRate: product.taxRate
                  })}
                </Box>
              </Box>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default CartItem;
