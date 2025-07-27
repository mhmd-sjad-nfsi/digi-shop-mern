// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Badge, IconButton, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, AccountCircle, AdminPanelSettings } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/authSlice';
import SearchBox from './SearchBox'; // ✨


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  // State برای مدیریت منوی کاربری
  const [anchorElUser, setAnchorElUser] = useState(null);
  // State برای مدیریت منوی ادمین
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenAdminMenu = (event) => setAnchorElAdmin(event.currentTarget);
  const handleCloseAdminMenu = () => setAnchorElAdmin(null);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // ✨ فراخوانی API خروج
      dispatch(logout()); // ✨ پاک کردن state از authSlice و localStorage
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6" component={RouterLink} to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            دیجی شاپ
          </Typography>
          <SearchBox />

          <IconButton component={RouterLink} to="/cart" color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          

          {userInfo ? (
            <>
              {/* ✨ منوی ادمین - فقط اگر کاربر ادمین باشد نمایش داده می‌شود */}
              {userInfo.isAdmin && (
                <>
                  <IconButton onClick={handleOpenAdminMenu} color="inherit">
                    <AdminPanelSettings />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElAdmin}
                    open={Boolean(anchorElAdmin)}
                    onClose={handleCloseAdminMenu}
                  >
                    <MenuItem component={RouterLink} to='/admin/users' onClick={handleCloseAdminMenu}>کاربران</MenuItem>
                    <MenuItem component={RouterLink} to='/admin/products' onClick={handleCloseAdminMenu}>محصولات</MenuItem>
                    <MenuItem component={RouterLink} to='/admin/orders' onClick={handleCloseAdminMenu}>سفارشات</MenuItem>
                  </Menu>
                </>
              )}
              
              {/* منوی کاربری */}
              <IconButton onClick={handleOpenUserMenu} color="inherit">
                <Typography sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>{userInfo.name}</Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={RouterLink} to='/profile' onClick={handleCloseUserMenu}>پروفایل</MenuItem>
                <MenuItem onClick={logoutHandler}>خروج</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">ورود</Button>
              <Button color="inherit" component={RouterLink} to="/register">ثبت‌نام</Button>
            </>
          )}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;