import React, { useState, useEffect } from 'react'; // ✨ useState و useEffect را ایمپورت می‌کنیم
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button, Paper, Divider } from '@mui/material';
import axios from 'axios'; // ✨ axios را ایمپورت می‌کنیم
import ProductRating from '../components/ProductRating';
import Loader from '../components/Loader'; // ✨ ایمپورت می‌کنیم
import Message from '../components/Message'; // ✨ ایمپورت می‌کنیم

const ProductDetailsPage = () => {
  const { id: productId } = useParams(); // ✨ نام id را برای خوانایی بیشتر به productId تغییر می‌دهیم

  const [product, setProduct] = useState({}); // ✨ حالت اولیه یک آبجکت خالی
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message); // ✨ خطای دقیق‌تری می‌گیریم
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // ✨ هر زمان productId تغییر کرد، این افکت دوباره اجرا شود

  // ✨ از اینجا به بعد، منطق نمایش بر اساس loading و error است
  return (
    <Container sx={{ py: 3 }} maxWidth="lg">
      <Button component={RouterLink} to="/" sx={{ mb: 3 }}>
        ← بازگشت به لیست محصولات
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container spacing={5}>
          {/* ستون اول: تصویر محصول */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: 3 }}
              src={product.image}
              alt={product.name}
            />
          </Grid>

          {/* ستون دوم: اطلاعات محصول */}
          <Grid item xs={12} md={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <ProductRating value={product.rating} text={`(${product.numReviews} نظر)`} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" sx={{ my: 2 }}>
              قیمت: {product.price?.toLocaleString('fa-IR')} تومان
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              توضیحات: {product.description}
            </Typography>
          </Grid>

          {/* ستون سوم: بخش اقدامات */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}><Typography>قیمت:</Typography></Grid>
                <Grid item xs={6}><Typography fontWeight="bold">{product.price?.toLocaleString('fa-IR')} تومان</Typography></Grid>
                <Grid item xs={6}><Typography>وضعیت:</Typography></Grid>
                <Grid item xs={6}><Typography fontWeight="bold">{product.countInStock > 0 ? 'موجود در انبار' : 'ناموجود'}</Typography></Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth disabled={product.countInStock === 0}>
                    افزودن به سبد خرید
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductDetailsPage;