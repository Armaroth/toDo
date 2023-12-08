import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { ToDoContext } from './todoContext';
import { decodeJwt } from "../auth.helpers";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const queryCLient = useQueryClient();
    const [toDos, setToDos] = useState([]);
    const [archivedToDos, setArchivedToDos] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const { refetch, archivedRefetch } = useContext(ToDoContext);

    const registerMutation = useMutation({
        mutationFn: async (credentials) => {
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
                const { accessToken } = await response.json();
                localStorage.setItem('token', JSON.stringify(accessToken));
                setToken(accessToken);
                refetch();
                archivedRefetch();
            }
        }
    })
    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch(`http://localhost:4000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            if (response.ok) {
                const { accessToken } = await response.json();
                localStorage.setItem('token', JSON.stringify(accessToken));
                setToken(accessToken);
                refetch();
                archivedRefetch();
            } else {
                const message = await response.text();
                setError(message);
            }
        }

    })

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
        setCurrentUser('')
        setToDos(() => []);
        queryCLient.invalidateQueries(['todos'])
        queryCLient.invalidateQueries(['archivedTodos'])

    }

    const r = { token, error, currentUser, setCurrentUser, setToken, setError, registerMutation, loginMutation, logout, toDos, setToDos, archivedToDos, setArchivedToDos }
    return <UserContext.Provider value={r}>
        {children}
    </UserContext.Provider>;
}