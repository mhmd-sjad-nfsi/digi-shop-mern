import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ✨ ایمپورت هوک‌ها
import { Container, Typography, Grid, Box, Button, Paper, Divider } from '@mui/material';
import { fetchProductDetails } from '../redux/slices/productsSlice'; // ✨ ایمپورت Thunk
import ProductRating from '../components/ProductRating';
import Loader from '../components/Loader';
import Message from '../components/Message';
const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  // ✨ با useSelector، داده‌ها را مستقیماً از Redux Store می‌خوانیم
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // ✨ اکشن مربوط به دریافت جزئیات را با ارسال productId دیسپچ می‌کنیم
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);
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
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
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
            <ProductRating
              value={product.rating}
              text={`(${product.numReviews} نظر)`}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" sx={{ my: 2 }}>
              قیمت: {product.price?.toLocaleString("fa-IR")} تومان
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
                <Grid item xs={6}>
                  <Typography>قیمت:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">
                    {product.price?.toLocaleString("fa-IR")} تومان
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>وضعیت:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">
                    {product.countInStock > 0 ? "موجود در انبار" : "ناموجود"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={product.countInStock === 0}
                  >
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
