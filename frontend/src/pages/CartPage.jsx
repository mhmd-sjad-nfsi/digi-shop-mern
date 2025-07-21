// frontend/src/pages/CartPage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Paper, Button, IconButton, List, ListItem, ListItemText,
  Card, CardMedia, CardContent, FormControl, Select, MenuItem
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import Message from '../components/Message';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

 const checkoutHandler = () => {
    navigate('/shipping'); // ✨ به جای لاگین، مستقیماً به صفحه آدرس می‌رود
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        سبد خرید
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={8}>
          {cartItems.length === 0 ? (
            <Message>سبد خرید شما خالی است. <RouterLink to="/">بازگشت</RouterLink></Message>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem key={item._id} disablePadding sx={{ mb: 2 }}>
                  <Paper sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={2}>
                        <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography component={RouterLink} to={`/product/${item._id}`}>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Typography>{Number(item.price).toLocaleString('fa-IR')} تومان</Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={item.qty}
                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <IconButton edge="end" aria-label="delete" onClick={() => removeFromCartHandler(item._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                جمع کل سبد
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemText primary={`مجموع (${cartItems.reduce((acc, item) => acc + item.qty, 0)}) آیتم`} secondary={`${Number(itemsPrice).toLocaleString('fa-IR')} تومان`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="هزینه ارسال" secondary={`${Number(shippingPrice).toLocaleString('fa-IR')} تومان`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="مالیات" secondary={`${Number(taxPrice).toLocaleString('fa-IR')} تومان`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="قیمت نهایی" primaryTypographyProps={{ fontWeight: 'bold' }} secondary={<Typography fontWeight="bold">{`${Number(totalPrice).toLocaleString('fa-IR')} تومان`}</Typography>} />
                </ListItem>
                <ListItem disablePadding>
                  <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    sx={{ mt: 2 }}
                  >
                    ادامه جهت تسویه حساب
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;