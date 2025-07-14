// src/components/Loader.jsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" my={5}>
    <CircularProgress />
  </Box>
);

export default Loader;