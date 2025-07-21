// frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, TextField, Button, Stack, Paper, Grid } from '@mui/material';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useUpdateProfileMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error('رمزهای عبور یکسان نیستند');
      return;
    }
    try {
      // ✨ مشکل امنیتی حل شد: دیگر _id ارسال نمی‌شود
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success('پروفایل با موفقیت به‌روزرسانی شد');

      // ✨ مشکل UX حل شد: فیلدهای رمز عبور پاک می‌شوند
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>پروفایل کاربری</Typography>
          {isLoading && <Loader />}
          <Stack component="form" spacing={2} onSubmit={submitHandler}>
            <TextField
              label="نام" value={name} onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="email" label="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password" label="رمز عبور جدید" placeholder="برای تغییر، وارد کنید"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="password" label="تکرار رمز عبور جدید" placeholder="برای تغییر، وارد کنید"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" disabled={isLoading}>به‌روزرسانی</Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item md={8}>
        <Typography variant="h5" sx={{ mb: 2 }}>سفارشات من</Typography>
        {/* لیست سفارشات اینجا نمایش داده می‌شود */}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;