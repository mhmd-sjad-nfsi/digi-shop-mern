// frontend/src/pages/HomePage.jsx
import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
// ✨ ایمپورت هوک جدید از productsApiSlice
import { useGetProductsQuery } from '../redux/slices/productsApiSlice'; // ✨
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom'; // ✨
import Paginate from '../components/Paginate'; // ✨

import Message from '../components/Message';

const HomePage = () => {
  const { pageNumber, keyword } = useParams(); // ✨ keyword را از URL می‌خوانیم
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber }); // ✨
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        آخرین محصولات
      </Typography>
       {isLoading ? <Loader /> : error ? <Message /> : (
        <>
          <Grid container spacing={3}>
            {data.products.map((product) => ( // ✨ data.products
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} /> {/* ✨ */}
        </>
      )}
    </Container>
  );
};

export default HomePage;