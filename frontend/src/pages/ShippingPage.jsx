import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Stack, Paper } from '@mui/material';
import { saveShippingAddress } from '../redux/slices/cartSlice';

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  // فرم را با اطلاعات قبلی (اگر وجود داشت) پر می‌کنیم
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment'); // در جلسه بعد این صفحه را می‌سازیم
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          آدرس ارسال
        </Typography>
        <Stack component="form" spacing={2} onSubmit={submitHandler}>
          <TextField
            label="آدرس" required fullWidth value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="شهر" required fullWidth value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            label="کد پستی" required fullWidth value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            label="کشور" required fullWidth value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            ادامه
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ShippingPage;