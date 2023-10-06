import { useContext, createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);


export function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('')

    async function register(email, username, password) {
        const response = await fetch(`http://localhost:4000/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
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
    }

    async function login(email, password) {
        const response = await fetch(`http://localhost:4000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (response.ok) {
            const token = await response.json();
            localStorage.setItem('token', JSON.stringify(token))
            setToken(token);
        } else {
            const message = await response.text();
            console.log(message);
            setError(message);
        }
    }



    const r = { token, error, setToken, setError, register, login }
    return <UserContext.Provider value={r}>
        {children}
    </UserContext.Provider>

}