// frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, TextField, Button, Stack, Paper, Grid } from '@mui/material';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // وقتی اطلاعات کاربر از Redux گرفته شد، فرم را با آن پر می‌کنیم
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // منطق به‌روزرسانی در جلسه بعد پیاده‌سازی می‌شود
    console.log('Update Profile...');
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>پروفایل کاربری</Typography>
          <Stack component="form" spacing={2} onSubmit={submitHandler}>
            <TextField
              label="نام" value={name} onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="email" label="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password" label="رمز عبور جدید" value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="password" label="تکرار رمز عبور جدید" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained">به‌روزرسانی</Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item md={8}>
        <Typography variant="h5" sx={{ mb: 2 }}>سفارشات من</Typography>
        {/* در جلسات آینده، لیست سفارشات اینجا نمایش داده می‌شود */}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;