import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box, Container } from '@mui/material';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* ... بقیه مسیرها */}
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
}