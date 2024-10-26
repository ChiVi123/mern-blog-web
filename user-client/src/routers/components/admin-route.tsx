import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelectors } from '~modules/user';

function AdminRoute() {
    const user = useSelector(userSelectors.data);
    return user?.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default AdminRoute;
