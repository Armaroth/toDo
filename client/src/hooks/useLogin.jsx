import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export function useLogin() {
    const { setToken, setError } = useContext(UserContext);
    const mutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch(`http://localhost:4000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            if (response.ok) {
                const { accessToken } = await response.json()
                localStorage.setItem('token', JSON.stringify(accessToken));
                setToken(accessToken);
            } else {
                const message = await response.text();
                setError(message);
            }
        }
    });
    return mutation;
}




