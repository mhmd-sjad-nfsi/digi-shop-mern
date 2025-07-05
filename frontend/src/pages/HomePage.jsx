import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import productsData from '../productsData';
import ProductCard from '../components/ProductCard'; 

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        آخرین محصولات
      </Typography>
      <Grid container spacing={3}> 
        {productsData.map((product) => (
         
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;