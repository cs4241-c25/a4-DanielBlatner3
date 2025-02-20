import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

const AuthRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default AuthRoute;