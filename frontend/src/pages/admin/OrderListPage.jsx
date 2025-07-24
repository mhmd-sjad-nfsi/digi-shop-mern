// frontend/src/pages/admin/OrderListPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../redux/slices/ordersApiSlice';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <Typography variant="h4" gutterBottom>سفارشات</Typography>
      {isLoading ? <Loader /> : error ? <Message /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>شناسه</TableCell>
                <TableCell>کاربر</TableCell>
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
                  <TableCell>{order.user && order.user.name}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</TableCell>
                  <TableCell>{Number(order.totalPrice).toLocaleString('fa-IR')} تومان</TableCell>
                  <TableCell>
                    {order.isPaid ? (
                      new Date(order.paidAt).toLocaleDateString('fa-IR')
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered ? (
                      new Date(order.deliveredAt).toLocaleDateString('fa-IR')
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
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
    </>
  );
};

export default OrderListPage;