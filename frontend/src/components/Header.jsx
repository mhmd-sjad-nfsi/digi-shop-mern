import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material'; 
import { Link as RouterLink } from 'react-router-dom'; 

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"                 
            sx={{
              flexGrow: 1, 
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            دیجی شاپ
          </Typography>

          <Button color="inherit" component={RouterLink} to="/cart">
            سبد خرید
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            ورود
          </Button>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;