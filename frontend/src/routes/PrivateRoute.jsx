import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import Loading from '../components/Loading'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading />;

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute