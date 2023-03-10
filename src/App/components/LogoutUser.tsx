import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hook/redux';
import { logOut } from '../store/actions/auth.actions';

const LogoutUser = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log('logout');
        dispatch(logOut());
        navigate('/');
    }, []);
    return (
        <h1 className="text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]">
            you are got logout
        </h1>
    );
};

export default LogoutUser;
