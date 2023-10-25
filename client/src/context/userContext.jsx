import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState({});


    const queryCLient = useQueryClient();
    // const postMutation = useMutation({
    //     mutationFn: (value) => fetchWithAuth('http://localhost:4000/user', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ value })
    //     }),
    //     onSuccess: () => queryCLient.invalidateQueries(['todos'])
    // });


    const registerMutation = useMutation({
        mutationFn: async (credentials) => {
            console.log(credentials.email, credentials.username, credentials.password)
            const response = await fetch(`http://localhost:4000/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, username: credentials.username, password: credentials.password })
            })
            if (!response.ok) {
                const error = await response.text();
                setError(error);
            }
            else {
                const token = await response.json();
                console.log(token)
                localStorage.setItem('token', JSON.stringify(token));
                setToken(token);
            }
        },
        onSuccess: () => queryCLient.invalidateQueries(['todos'])
    })



    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            console.log(credentials.email, credentials.password)
            const response = await fetch(`http://localhost:4000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            if (response.ok) {
                const token = await response.json();
                localStorage.setItem('token', JSON.stringify(token))
                setToken(token);
            } else {
                const message = await response.text();
                setError(message);
            }
        },
        onSuccess: () => queryCLient.invalidateQueries(['todos'])
    })
    // async function login(email, password) {
    //     const response = await fetch(`http://localhost:4000/auth/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email, password })
    //     })
    //     if (response.ok) {
    //         const token = await response.json();
    //         localStorage.setItem('token', JSON.stringify(token))
    //         setToken(token);
    //     } else {
    //         const message = await response.text();
    //         setError(message);
    //     }
    // }

    const r = { token, error, currentUser, setCurrentUser, setToken, setError, registerMutation, loginMutation }
    return <UserContext.Provider value={r}>
        {children}
    </UserContext.Provider>;
}