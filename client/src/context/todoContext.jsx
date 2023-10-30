import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext } from 'react';
import { fetchWithAuth } from "../auth.helpers";

export const ToDoContext = createContext(null);

export function ToDoProvider({ children }) {

    const queryCLient = useQueryClient();
    //*******************************************************************QUERIES*******************************************************************************

    //todos
    const { data, status, isFetching, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return fetchWithAuth('http://localhost:4000/user').then(data => data.json());
        }
    });

    //archived todos
    const archivedQuery = useQuery({
        queryKey: ['archivedTodos'],
        queryFn: async () => {
            return fetchWithAuth('http://localhost:4000/user/archived').then(data => data.json());
        }
    });

    //*******************************************************************MUTATIONS*******************************************************************************

    //todos
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
        mutationFn: (id) => {
            fetchWithAuth('http://localhost:4000/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
        },
        onSuccess: () => {
            queryCLient.invalidateQueries(['todos']);
        }
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

    //archived todos

    const postArchivedMutation = useMutation({
        mutationFn: (value) => {
            fetchWithAuth('http://localhost:4000/user/archived', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value })
            })
        },
        onSuccess: () => {
            queryCLient.invalidateQueries(['archivedTodos'])
        }

    });

    const deleteArchivedMutation = useMutation({
        mutationFn: (id) => fetchWithAuth('http://localhost:4000/user/archived', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }),
        onSuccess: () => queryCLient.invalidateQueries(['archivedTodos'])
    });

    const r = {
        data, status, isFetching, refetch, postMutation, deleteMutation, editMutation,
        archivedData: archivedQuery.data
        , archivedStatus: archivedQuery.status
        , archivedIsFetching: archivedQuery.isFetching,
        postArchivedMutation,
        deleteArchivedMutation
    }
    return (
        <div>
            <ToDoContext.Provider value={r}>
                {children}
            </ToDoContext.Provider>
        </div>)
}