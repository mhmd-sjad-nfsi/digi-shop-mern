// frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Typography, TextField, Button, Stack, Paper, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useUpdateProfileMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useGetMyOrdersQuery } from '../redux/slices/ordersApiSlice';
import { Link as RouterLink } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';


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
    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message severity="error">{errorOrders?.data?.message || errorOrders.error}</Message>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شناسه</TableCell>
                  <TableCell>تاریخ</TableCell>
                  <TableCell>مبلغ کل</TableCell>
                  <TableCell>وضعیت پرداخت</TableCell>
                  <TableCell>وضعیت تحویل</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</TableCell>
                    <TableCell>{Number(order.totalPrice).toLocaleString('fa-IR')} تومان</TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        new Date(order.paidAt).toLocaleDateString('fa-IR')
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered ? (
                        new Date(order.deliveredAt).toLocaleDateString('fa-IR')
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" component={RouterLink} to={`/order/${order._id}`}>
                        جزئیات
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
