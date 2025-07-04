import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}
    >
      <Header />
      <Container component="main" sx={{ mt: 2, mb: 2 }}>
        <h1>به فروشگاه دیجی شاپ خوش آمدید</h1>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;