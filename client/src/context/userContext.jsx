import { useQueryClient } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';

import { decodeJwt } from "../auth.helpers";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const queryCLient = useQueryClient();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (token) {
            setCurrentUser({ userName: decodeJwt(token).username, id: decodeJwt(token).id })
        } else {
            setCurrentUser({})
        }

    }, [token])

    async function logout() {
        const id = decodeJwt(token).id;
        const response = await fetch(`http://localhost:4000/auth/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        localStorage.removeItem('token');
        setToken('');
        setToDos(() => []);
        queryCLient.invalidateQueries(['todos'])
        queryCLient.invalidateQueries(['archivedTodos'])
    }
    const r = { token, currentUser, setToken, logout, }
    return <UserContext.Provider value={r}>
        {children}
    </UserContext.Provider>;
}