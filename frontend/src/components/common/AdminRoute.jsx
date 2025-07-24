// frontend/src/components/common/AdminRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // اگر کاربر لاگین کرده و ادمین بود، صفحه مورد نظر را نمایش بده
  // در غیر این صورت، او را به صفحه لاگین هدایت کن
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;