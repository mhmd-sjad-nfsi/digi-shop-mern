// frontend/src/pages/admin/ProductEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/slices/productsApiSlice';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation(); // ✨


  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);
   const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId, name, price, image, brand, category, countInStock, description,
      }).unwrap();
      toast.success('محصول با موفقیت به‌روزرسانی شد');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container maxWidth="md">
      <Button component={RouterLink} to="/admin/products" sx={{ mb: 2 }}>
        بازگشت
      </Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>ویرایش محصول</Typography>
        {loadingUpdate && <Loader />}
        {loadingUpload && <Loader />}
        {isLoading ? <Loader /> : error ? <Message /> : (
          <form onSubmit={submitHandler}>
            <TextField label="نام" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ mb: 2 }} />
            <TextField label="قیمت" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth sx={{ mb: 2 }} />
            <TextField label="آدرس تصویر" value={image} onChange={(e) => setImage(e.target.value)} fullWidth sx={{ mb: 2 }} />
            
            {/* ✨ فیلد آپلود فایل */}
            <Button component="label" variant="contained" sx={{ mb: 2 }}>
              انتخاب فایل
              <input type="file" hidden onChange={uploadFileHandler} />
            </Button>            <TextField label="برند" value={brand} onChange={(e) => setBrand(e.target.value)} fullWidth sx={{ mb: 2 }} />
            <TextField label="دسته‌بندی" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth sx={{ mb: 2 }} />
            <TextField label="موجودی" type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} fullWidth sx={{ mb: 2 }} />
            <TextField label="توضیحات" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={4} sx={{ mb: 2 }} />
            <Button type="submit" variant="contained">به‌روزرسانی</Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ProductEditPage;