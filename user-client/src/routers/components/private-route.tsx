import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelectors } from '~modules/user';

function PrivateRoute() {
    const user = useSelector(userSelectors.data);
    return user ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute;
