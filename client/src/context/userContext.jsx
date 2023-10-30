import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { ToDoContext } from './todoContext';
export const UserContext = createContext(null);

export function UserProvider({ children }) {

    const [toDos, setToDos] = useState([]);
    const [archivedToDos, setArchivedToDos] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const { refetch } = useContext(ToDoContext);

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
                refetch();
            }
            else {
                const token = await response.json();
                console.log(token)
                localStorage.setItem('token', JSON.stringify(token));
                setToken(token);

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
                const token = await response.json();
                localStorage.setItem('token', JSON.stringify(token))
                setToken(token);
                refetch();
            } else {
                const message = await response.text();
                setError(message);
            }
        }

    })

    async function logout() {
        localStorage.removeItem('token')
        setToken('');
        setCurrentUser('')
        setToDos([]);
    }

    const r = { token, error, currentUser, setCurrentUser, setToken, setError, registerMutation, loginMutation, logout, toDos, setToDos, archivedToDos, setArchivedToDos }
    return <UserContext.Provider value={r}>
        {children}
    </UserContext.Provider>;
}