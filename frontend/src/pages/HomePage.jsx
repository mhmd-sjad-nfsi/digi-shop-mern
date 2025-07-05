import React from 'react';
import { Container, Typography } from '@mui/material';
// import productsData from '../productsData';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        آخرین محصولات
      </Typography>
      {/* در جلسات بعدی، اینجا محصولات را با map کردن نمایش می‌دهیم */}
    </Container>
  );
};

export default HomePage;