import { LocalMallOutlined } from '@mui/icons-material';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IOrderItem } from '../context/order/types';
import db from '../data/products.json';
import { _getTotalPrice } from '../helper';
import { IProduct } from '../interface';

function OrderItem({ item }: { item: IOrderItem }) {
  const product: IProduct | undefined = db.find((e) => e.id === item.id);

  if (!product) return null;

  return (
    <ListItem dense>
      <ListItemButton>
        <ListItemIcon>
          <LocalMallOutlined />
        </ListItemIcon>
        <ListItemText
          primary={product?.productName}
          secondary={
            <>
              <Box sx={{ display: 'flex' }}>
                <Box> ${product?.price}</Box>
                <Box sx={{ px: 0.5 }}></Box>
                <Box>
                  <b>x{item.quantity}</b>
                </Box>
                <Box sx={{ flexGrow: '1' }}></Box>
                <Box>
                  <small>{product.taxRate}% Tax</small>
                </Box>
                <Box sx={{ px: 0.5 }}></Box>
                <Box>
                  $
                  {_getTotalPrice({
                    price: product?.price,
                    quantity: item.quantity,
                    taxRate: product?.taxRate,
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

export default OrderItem;
