// frontend/src/pages/PlaceOrderPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Grid, List, ListItem, ListItemText, Typography, Card, CardMedia } from '@mui/material';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CheckoutSteps from '../components/common/CheckoutSteps';
import { useCreateOrderMutation } from '../redux/slices/usersApiSlice';
import { clearCartItems } from '../redux/slices/cartSlice';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <CheckoutSteps activeStep={3} />
      <Grid container spacing={4}>
        <Grid item md={8}>
          <List>
            <ListItem>
              <ListItemText primary={<Typography variant="h6">آدرس ارسال</Typography>} secondary={`${cart.shippingAddress.address}, ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={<Typography variant="h6">روش پرداخت</Typography>} secondary={`روش: ${cart.paymentMethod}`} />
            </ListItem>
            <ListItem>
              <Typography variant="h6">آیتم‌های سفارش</Typography>
              {cart.cartItems.length === 0 ? (
                <Message>سبد خرید شما خالی است</Message>
              ) : (
                <List>
                  {cart.cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <Grid container alignItems="center">
                        <Grid item md={1}><CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 50, height: 50 }} /></Grid>
                        <Grid item><Typography component={RouterLink} to={`/product/${item._id}`}>{item.name}</Typography></Grid>
<Grid item md={4} textAlign="right">
  {/* ✨ sx={{ direction: 'ltr' }} را به این Typography اضافه کنید */}
  <Typography sx={{ direction: 'ltr' }}>
    {item.qty} x {Number(item.price).toLocaleString('fa-IR')} = {Number(item.qty * item.price).toLocaleString('fa-IR')} تومان
  </Typography>
</Grid>                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          </List>
        </Grid>
        <Grid item md={4}>
          <Card>
            <List>
              <ListItem><Typography variant="h5">خلاصه سفارش</Typography></ListItem>
              <ListItem><ListItemText primary="مجموع قیمت آیتم‌ها:" secondary={`${Number(cart.itemsPrice).toLocaleString('fa-IR')} تومان`} /></ListItem>
              <ListItem><ListItemText primary="هزینه ارسال:" secondary={`${Number(cart.shippingPrice).toLocaleString('fa-IR')} تومان`} /></ListItem>
              <ListItem><ListItemText primary="مالیات:" secondary={`${Number(cart.taxPrice).toLocaleString('fa-IR')} تومان`} /></ListItem>
              <ListItem><ListItemText primary="قیمت نهایی:" secondary={`${Number(cart.totalPrice).toLocaleString('fa-IR')} تومان`} /></ListItem>
              
              {error && <ListItem><Message severity="error">{error?.data?.message || error.error}</Message></ListItem>}

              <ListItem>
                <Button type="button" variant="contained" fullWidth disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
                  ثبت سفارش
                </Button>
                {isLoading && <Loader />}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderPage;