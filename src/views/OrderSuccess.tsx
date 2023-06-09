import { Box, Button, Divider, List, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import OrderItem from '../components/OrderItem';
import { useOrder } from '../context/order/orderContext';
import { IOrder, IOrderItem } from '../context/order/types';
import { _getGrandTotal } from '../helper';

function OrderSuccess() {
  const { getOrder } = useOrder();
  const { orderId } = useParams();
  const navigate = useNavigate();

  if (!orderId) navigate('/404');

  const order: IOrder = getOrder({ orderId: orderId || '' });
  const orderItems: IOrderItem[] = order.items;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 10,
        }}
      >
        <Typography variant='h4'>
          <b>Thank you for you order</b>
        </Typography>

        <Box sx={{ width: 500, my: 5 }}>
          <List>
            {orderItems.map((item: IOrderItem, idx: number) => (
              <OrderItem item={item} key={item.id + '-' + idx + 1} />
            ))}
          </List>
          <Divider />
          <Box sx={{ display: 'flex', p: 2 }}>
            <Box sx={{ flexGrow: '1' }}></Box>
            <Box>
              <Typography variant='h6'>
                <b>Total: ${_getGrandTotal({ items: orderItems })}</b>
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', p: 2 }}>
            <Box>
              <Button variant='text' onClick={() => navigate('/')}>
                Continue shopping
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default OrderSuccess;
