// frontend/src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // ✨ ایمپورت هوک‌های Redux
import { Container, Grid, Typography } from '@mui/material';
import { fetchProducts } from '../redux/slices/productsSlice'; // ✨ ایمپورت Thunk
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
  const dispatch = useDispatch();
  
  // ✨ با useSelector، داده‌ها را مستقیماً از Redux Store می‌خوانیم
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // ✨ به جای فراخوانی مستقیم API، اکشن مربوطه را dispatch می‌کنیم
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        آخرین محصولات
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;