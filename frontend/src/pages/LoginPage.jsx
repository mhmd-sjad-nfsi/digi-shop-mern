import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Box,
  Grid
} from '@mui/material';

import { useLoginMutation } from '../redux/slices/usersApiSlice'; // ✨ API call
import { setCredentials } from '../redux/slices/authSlice'; // ✨ ذخیره اطلاعات در Redux
import Loader from '../components/Loader';
import Message from '../components/Message'; // در صورت نیاز

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null); // ✨ مدیریت خطا محلی

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation(); // ✨ اتصال به API
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/');
    } catch (err) {
      setLoginError(err?.data?.message || 'ورود ناموفق بود');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={submitHandler} noValidate>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            ورود به حساب کاربری
          </Typography>

          {loginError && (
            <Message severity="error">{loginError}</Message>
          )}

          <Stack spacing={2} sx={{ mt: 2 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <Loader size={24} /> : 'ورود'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  حساب کاربری ندارید؟{' '}
                  <RouterLink to="/register">ثبت‌نام کنید</RouterLink>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
