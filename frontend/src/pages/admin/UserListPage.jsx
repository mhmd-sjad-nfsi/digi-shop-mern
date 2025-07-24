// frontend/src/pages/admin/UserListPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Typography
} from '@mui/material';
import { FaTrash, FaEdit, FaCheck, FaTimes, } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/slices/usersApiSlice';

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
      try {
        await deleteUser(id);
        toast.success('کاربر حذف شد');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>کاربران</Typography>
      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message severity="error">{error?.data?.message || error.error}</Message> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>شناسه</TableCell>
                <TableCell>نام</TableCell>
                <TableCell>ایمیل</TableCell>
                <TableCell>ادمین</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton component={RouterLink} to={`/admin/user/${user._id}/edit`} sx={{ mr: 1 }}>
                      <FaEdit />
                    </IconButton>
                    <IconButton color="error" onClick={() => deleteHandler(user._id)}>
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserListPage;