// frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Stack, Paper, Box, Grid } from '@mui/material';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Register Submit');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={submitHandler} noValidate>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            ایجاد حساب کاربری
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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