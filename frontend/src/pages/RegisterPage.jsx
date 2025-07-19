// frontend/src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { Container, Typography, TextField, Button, Stack, Paper, Box, Grid } from '@mui/material';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('رمزهای عبور یکسان نیستند');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        navigate('/');
      } catch (err) {
        setMessage(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={submitHandler} noValidate>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            ایجاد حساب کاربری
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {message && <Message severity="error">{message}</Message>}
            {isLoading && <Loader />}
            <TextField
              label="نام کامل"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="آدرس ایمیل"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="رمز عبور"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="تکرار رمز عبور"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
              ثبت‌نام
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  قبلاً ثبت‌نام کرده‌اید؟ <RouterLink to="/login">وارد شوید</RouterLink>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;