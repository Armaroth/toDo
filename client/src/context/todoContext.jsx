import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { fetchWithAuth } from "../auth.helpers";
import { useEffect, useState } from "react";

export const ToDoContext = createContext(null);


export function ToDoProvider({ children }) {
    const [toDos, setToDos] = useState([]);
    const { data, status } = useQuery({
        queryKey: ['todos'],
        queryFn: () => {
            return fetchWithAuth('http://localhost:4000/user').then(data => data.json());
        }
    })

    useEffect(() => {
        if (status === 'success') {
            setToDos(data);
        }
    }, [status]);
    return <>
        <ToDoContext.Provider value={toDos}>
            {children}
        </ToDoContext.Provider>
    </>



}