import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from "react";
import { UserContext } from "../context/userContext";
export function useLogout() {
    const { setToken } = useContext(UserContext)
    const queryCLient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id) => await fetch(`http://localhost:4000/auth/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }),
        onSuccess: async () => {
            await queryCLient.cancelQueries({ queryKey: ['todos'] });
            await queryCLient.cancelQueries({ queryKey: ['archivedTodos'] });
            localStorage.removeItem('token');
            setToken('');
        }
    });
    return mutation;
}
