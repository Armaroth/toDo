import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import { fetchWithAuth } from "../auth.helpers";

export const ToDoContext = createContext(null);

export function ToDoProvider({ children }) {

    const { data, status, isFetching } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return fetchWithAuth('http://localhost:4000/user').then(data => data.json());
        }
    });
    const queryCLient = useQueryClient();

    const postMutation = useMutation({
        mutationFn: (value) => fetchWithAuth('http://localhost:4000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value })
        }),
        onSuccess: () => queryCLient.invalidateQueries(['todos'])
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => fetchWithAuth('http://localhost:4000/user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }),
        onSuccess: () => queryCLient.invalidateQueries(['todos'])
    });
    const editMutation = useMutation({
        mutationFn: (payload) => fetchWithAuth('http://localhost:4000/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload })
        }),
        onSuccess: () => queryCLient.invalidateQueries(['todos'])
    });



    const r = { data, status, isFetching, postMutation, deleteMutation, editMutation }
    return (
        <div>
            <ToDoContext.Provider value={r}>
                {children}
            </ToDoContext.Provider>
        </div>)



}