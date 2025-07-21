import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Button, Paper, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Stack
} from '@mui/material';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/common/CheckoutSteps';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress, paymentMethod: paymentMethodFromState } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromState || 'Zarinpal');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder'); // در جلسه بعد این صفحه را می‌سازیم
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
      <CheckoutSteps activeStep={2} />
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          روش پرداخت
        </Typography>
        <Stack component="form" spacing={2} onSubmit={submitHandler}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="payment method"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="Zarinpal" control={<Radio />} label="زرین‌پال یا کارت اعتباری" />
              {/* در آینده می‌توان گزینه‌های بیشتری اضافه کرد */}
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            ادامه
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default PaymentPage;