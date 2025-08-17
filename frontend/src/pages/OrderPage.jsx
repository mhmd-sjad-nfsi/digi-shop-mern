import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Grid, List, ListItem, ListItemText, CardMedia,
  Button, Card, CardContent, Container,
} from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from '../redux/slices/ordersApiSlice';
const OrderPage = () => {
  const { id: orderId } = useParams();
  const location = useLocation();

  const {
    data: order, refetch, isLoading, error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // بررسی پارامترهای بازگشتی از درگاه پرداخت در URL
    const params = new URLSearchParams(location.search);
    const paymentError = params.get('error');

    if (paymentError) {
      if (paymentError === 'payment_failed') {
        toast.error('پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.');
      } else if (paymentError === 'payment_cancelled') {
        toast.warning('پرداخت توسط شما لغو شد.');
      }
      // برای جلوگیری از نمایش مجدد toast، پارامتر خطا را از URL حذف می‌کنیم
      window.history.replaceState(null, '', `/order/${orderId}`);
    } else if (order && order.isPaid && !toast.isActive('payment-success')) {
      // این حالت برای زمانی است که پرداخت موفق بوده و از درگاه برگشته‌ایم
      toast.success('پرداخت با موفقیت انجام شد!', { toastId: 'payment-success' });
    }
  }, [location.search, order, orderId]);

  const payHandler = async () => {
    try {
      const res = await payOrder(orderId).unwrap();
      window.location.href = res.url; // ✨ هدایت کاربر به درگاه پرداخت
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };



  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('وضعیت سفارش به ارسال شده تغییر یافت');
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
                      onClick={payHandler} // ✨ اتصال به تابع جدید
                      variant="contained"
                      fullWidth
                    >
                      پرداخت با زرین‌پال
                    </Button>
                  </ListItem>
                )}
                {/* ✨ بخش عملیات ادمین */}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListItem>
                  <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    onClick={deliverOrderHandler}
                  >
                    علامت‌گذاری به عنوان ارسال شده
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