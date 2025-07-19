// frontend/src/pages/HomePage.jsx
import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
// ✨ ایمپورت هوک جدید از productsApiSlice
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
  // ✨ تمام منطق قبلی با این یک خط جایگزین می‌شود!
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        آخرین محصولات
      </Typography>
      {/* ✨ به جای 'loading' از 'isLoading' استفاده می‌کنیم */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error?.data?.message || error.error}</Message>
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