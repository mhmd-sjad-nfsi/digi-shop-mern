import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Badge, IconButton } from '@mui/material'; // ✨ Badge و IconButton را ایمپورت می‌کنیم
import { ShoppingCart } from '@mui/icons-material'; // ✨ آیکون سبد خرید را ایمپورت می‌کنیم
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; // ✨ ایمپورت useSelector

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart); // ✨ خواندن آیتم‌های سبد از state

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            دیجی شاپ
          </Typography>

          {/* ✨ دکمه سبد خرید را با آیکون و Badge جایگزین می‌کنیم */}
          <IconButton component={RouterLink} to="/cart" color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          <Button color="inherit" component={RouterLink} to="/login">
            ورود
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;