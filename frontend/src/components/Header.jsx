import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/slices/usersApiSlice'; // ✨
import { logout } from '../redux/slices/authSlice'; // ✨

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth); // ✨ خواندن وضعیت ورود

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // ✨ مدیریت منوی کشویی برای نام کاربر
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

          {/* ✨ آیکون سبد خرید */}
          <IconButton
            component={RouterLink}
            to="/cart"
            color="inherit"
            sx={{ mr: 1 }}
          >
            <Badge
              badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)}
              color="secondary"
            >
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* ✨ اگر کاربر وارد شده باشد، نام او را نمایش بده و منوی خروج */}
          {userInfo ? (
            <>
              <Button
                color="inherit"
                onClick={handleMenuClick}
              >
                {userInfo.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/profile');
                  }}
                >
                  پروفایل
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    logoutHandler();
                  }}
                >
                  خروج
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              ورود
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
