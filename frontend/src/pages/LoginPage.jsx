// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Stack, Paper, Box,Grid  } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Submit'); // فعلاً فقط یک لاگ می‌گیریم
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={submitHandler} noValidate>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            ورود به حساب کاربری
          </Typography>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              ورود
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  حساب کاربری ندارید؟ <RouterLink to="/register">ثبت‌نام کنید</RouterLink>
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