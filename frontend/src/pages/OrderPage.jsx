// frontend/src/pages/OrderPage.jsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Button,
  Card,
  CardContent,
  Container, // ✨ Make sure Container is imported
} from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from '../redux/slices/ordersApiSlice';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const onApproveTest = async () => {
    try {
      await payOrder({ orderId, details: { payer: {} } }).unwrap();
      refetch();
      toast.success('پرداخت با موفقیت انجام شد');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message severity="error">{error?.data?.message || error.error}</Message>
  ) : (
    // ✨ The missing Container component wrapping everything
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        سفارش شماره: {order._id}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <List>
            <ListItem>
              <ListItemText
                primary={<Typography variant="h6">آدرس ارسال</Typography>}
                secondary={
                  <>
                    <Typography component="span" display="block">
                      نام: {order.user.name}
                    </Typography>
                    <Typography component="span" display="block">
                      ایمیل: {order.user.email}
                    </Typography>
                    <Typography component="span" display="block">
                      آدرس: {order.shippingAddress.address},{' '}
                      {order.shippingAddress.city}{' '}
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.country}
                    </Typography>
                    {order.isDelivered ? (
                      <Message severity="success">
                        تحویل داده شده در {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message severity="warning">هنوز تحویل داده نشده</Message>
                    )}
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="h6">روش پرداخت</Typography>}
                secondary={
                  <>
                    <Typography>روش: {order.paymentMethod}</Typography>
                    {order.isPaid ? (
                      <Message severity="success">
                        پرداخت شده در {order.paidAt}
                      </Message>
                    ) : (
                      <Message severity="warning">هنوز پرداخت نشده</Message>
                    )}
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <Typography variant="h6">آیتم‌های سفارش</Typography>
              <List>
                {order.orderItems.map((item, index) => (
                  <ListItem key={index}>
                    <Grid container alignItems="center">
                      <Grid item md={1}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ width: 50, height: 50 }}
                        />
                      </Grid>
                      <Grid item flex={1}>
                        <Typography
                          component={RouterLink}
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item md={4} textAlign="right">
                        <Typography sx={{ direction: 'ltr' }}>
                          {item.qty} x{' '}
                          {Number(item.price).toLocaleString('fa-IR')} ={' '}
                          {Number(item.qty * item.price).toLocaleString(
                            'fa-IR'
                          )}{' '}
                          تومان
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  <Typography variant="h5">خلاصه سفارش</Typography>
                </ListItem>
                {/* ... خلاصه قیمت‌ها ... */}
                {!order.isPaid && (
                  <ListItem>
                    {loadingPay && <Loader />}
                    <Button
                      onClick={onApproveTest}
                      variant="contained"
                      fullWidth
                    >
                      پرداخت شبیه‌سازی شده
                    </Button>
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderPage;