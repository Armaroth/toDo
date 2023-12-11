import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { ToDoContext } from './todoContext';
import { decodeJwt } from "../auth.helpers";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const queryCLient = useQueryClient();
    const [toDos, setToDos] = useState([]);
    const [archivedToDos, setArchivedToDos] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        if (token) {
            setCurrentUser({ userName: decodeJwt(token).username, id: decodeJwt(token).id })
        } else {
            setCurrentUser({})
        }

    }, [token])
    // const currentUser = token ? { userName: decodeJwt(token).username, id: decodeJwt(token).id } : {}
    const { refetch, archivedRefetch } = useContext(ToDoContext);

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

    const r = { token, error, currentUser, setToken, setError, logout, toDos, setToDos, archivedToDos, setArchivedToDos }
    return <UserContext.Provider value={r}>
        {children}
    </UserContext.Provider>;
}