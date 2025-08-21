// frontend/src/pages/admin/ProductListPage.jsx
import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'; // ✨ useParams را اضافه کنید
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Typography, Box
} from '@mui/material';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate'; // ✨ کامپوننت Paginate را ایمپورت کنید
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../redux/slices/productsApiSlice';

const ProductListPage = () => {
  const { pageNumber } = useParams(); // ✨ شماره صفحه را از URL بخوانید
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber }); // ✨ pageNumber را به هوک پاس دهید
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      try {
        await deleteProduct(id);
        toast.success('محصول حذف شد');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('آیا برای ساخت یک محصول جدید آماده‌اید؟')) {
      try {
        const newProduct = await createProduct().unwrap();
        navigate(`/admin/product/${newProduct._id}/edit`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>محصولات</Typography>
        <Button variant="contained" onClick={createProductHandler}>
          <FaEdit style={{ marginRight: '8px' }} /> ایجاد محصول
        </Button>
      </Box>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message /> : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شناسه</TableCell>
                  <TableCell>نام</TableCell>
                  <TableCell>قیمت</TableCell>
                  <TableCell>دسته‌بندی</TableCell>
                  <TableCell>برند</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{Number(product.price).toLocaleString('fa-IR')}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <IconButton component={RouterLink} to={`/admin/product/${product._id}/edit`} sx={{ mr: 1 }}>
                        <FaEdit />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteHandler(product._id)}>
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* ✨ کامپوننت Paginate را اینجا رندر کنید */}
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListPage;