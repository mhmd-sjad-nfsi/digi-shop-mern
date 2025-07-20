// frontend/src/components/common/PrivateRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // اگر کاربر لاگین کرده بود، کامپوننت فرزند (صفحه مورد نظر) را نمایش بده
  // در غیر این صورت، او را به صفحه لاگین هدایت کن
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;