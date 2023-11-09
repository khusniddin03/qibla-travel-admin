import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { onStorage } from '../../utils/onStorage';
import { USER_DATA_KEY } from '@/consts';

interface IProps {
    requireds?: string[];
}

const ProtectedRoute = ({ children }: React.PropsWithChildren<IProps>) => {
    const { user } = useAppContext();
    const userdata = onStorage(USER_DATA_KEY);
    // const navigate = useNavigate();
    
    if (userdata) return children;
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // if (requireds.includes(role?.[0]?.role_code) === false) {
    //   return navigate("/404");
    // }
    return children;
}

export default ProtectedRoute;