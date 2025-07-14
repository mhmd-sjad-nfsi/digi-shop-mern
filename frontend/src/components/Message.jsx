import React from 'react';
import { Alert } from '@mui/material';

const Message = ({ severity = 'info', children }) => (
  <Alert severity={severity} variant="filled" sx={{ width: '100%', my: 2 }}>
    {children}
  </Alert>
);

export default Message;