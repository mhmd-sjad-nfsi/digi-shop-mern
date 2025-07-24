// frontend/src/pages/admin/UserEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Paper,
  FormControlLabel, Checkbox,
} from '@mui/material';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/slices/usersApiSlice';

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('کاربر با موفقیت به‌روزرسانی شد');
      refetch();
      navigate('/admin/users');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Button component={RouterLink} to="/admin/users" sx={{ mb: 2 }}>
        بازگشت
      </Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>ویرایش کاربر</Typography>
        {loadingUpdate && <Loader />}
        {isLoading ? <Loader /> : error ? <Message severity="error">{error?.data?.message || error.error}</Message> : (
          <form onSubmit={submitHandler}>
            <TextField
              label="نام" fullWidth required sx={{ mb: 2 }}
              value={name} onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="email" label="ایمیل" fullWidth required sx={{ mb: 2 }}
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
              label="ادمین است"
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained">به‌روزرسانی</Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default UserEditPage;