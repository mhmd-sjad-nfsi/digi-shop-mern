import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3, // padding top and bottom
        px: 2, // padding left and right
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          {'کپی‌رایت © '}
          دیجی شاپ {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;