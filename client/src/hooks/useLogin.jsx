import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { decodeJwt } from "../auth.helpers";

export function useLogin() {
    const { setToken, setError, setCurrentUser } = useContext(UserContext);
    const mutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch(`http://localhost:4000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            // if (response.ok) {
            //     const { accessToken } = await response.json();
            //     localStorage.setItem('token', JSON.stringify(accessToken));
            //     setToken(accessToken);
            //     refetch();
            //     archivedRefetch();
            // } else {
            //     const message = await response.text();
            //     setError(message);
            // }
            return response
        }, onSuccess: async (response) => {
            const { accessToken } = await response.json();
            const currentUser = decodeJwt(accessToken).id
            setCurrentUser(() => currentUser)
            localStorage.setItem('token', JSON.stringify(accessToken));
            setToken(accessToken);
        }, onError: async () => {
            const message = await response.text();
            setError(message);
        }
    });
    return mutation;
}




