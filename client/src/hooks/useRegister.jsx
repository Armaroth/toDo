import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { ToDoContext } from "../context/todoContext";

export function use() {
    const { setToken, setError } = useContext(UserContext);
    const { refetch, archivedRefetch } = useContext(ToDoContext);
    const mutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch(`http://localhost:4000/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, username: credentials.username, password: credentials.password })
            })

        }, onSuccess: async () => {
            const { accessToken } = await response.json();
            localStorage.setItem('token', JSON.stringify(accessToken));
            setToken(accessToken);
        }, onError: async () => {
            const message = await response.text();
            setError(message);
        }
    });
    return mutation;
}