import ShoppingBag from '@mui/icons-material/ShoppingBag';
import { Badge, Drawer } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useCart } from '../context/cart/cartContext';
import Cart from './Cart';

export default function Header() {
  const { cartQuantity, openCart, uiOpenCartDrawer, uiCloseCartDrawer } = useCart();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color='transparent' position='static' sx={{ boxShadow: 0 }}>
          <Toolbar variant='dense'>
            <Box sx={{ flexGrow: 1 }}></Box>
            <IconButton aria-label='cart' onClick={() => uiOpenCartDrawer()}>
              <Badge badgeContent={cartQuantity} color='primary'>
                <ShoppingBag color='action' />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={'right'}
          open={openCart}
          onClose={() => uiCloseCartDrawer()}
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
