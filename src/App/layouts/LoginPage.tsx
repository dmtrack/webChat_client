import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { useInput } from '../hook/input';
import { useAppDispatch } from '../hook/redux';
import { login } from '../store/actions/auth.actions';
import { fetchMessages } from '../store/actions/messageActions';
import socket from '../utils/socket';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const username = useInput('');
    const dispatch = useAppDispatch();

    const isFormValid = (): string => username.value;
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (isFormValid()) {
            dispatch(
                login({
                    username: username.value,
                })
            )
                .then(() => navigate('/main'))
                .catch((e) => console.log(e.message));
            socket.emit('USER:JOIN', username);
        } else alert('Please, fill up all fields');
        socket.on('MESSAGES:RECEIVED', (messages) => {
            console.log(messages);
            dispatch(fetchMessages(messages, username.value));
        });
    };

    useEffect(() => {
        return () => {
            socket.removeAllListeners();
        };
    }, []);

    return (
        <form
            className="container pt-10 mt-40
             text-sm text-left text-gray-500 dark:text-gray-400 mx-auto max-w-[300px]"
            onSubmit={submitHandler}
        >
            <div className="">
                <label className="block" htmlFor="username">
                    username
                </label>
                <input
                    className="border py-1 px-2 w-full  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    type="text"
                    {...username}
                    id="username"
                />

                <div className="py-4">
                    <Button
                        onClick={() => submitHandler}
                        variant="info"
                        size="sm"
                        type="submit"
                    >
                        Enter
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LoginPage;
