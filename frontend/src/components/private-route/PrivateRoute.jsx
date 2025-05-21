import { selectUserRole } from '../../selectors';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkAccess } from '../../utils/check-access';
import { ERROR, ROLE } from '../../constants';
import { Error } from '../error/Error';

export const PrivateRoute = ({ access, children }) => {
  const userRole = useSelector(selectUserRole);
  const location = useLocation();

  if (userRole === ROLE.GUEST) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (access && !checkAccess(access, userRole)) {
    return <Error error={ERROR.ACCESS_DENIED} />;
  }

  return children || <Outlet />;
};