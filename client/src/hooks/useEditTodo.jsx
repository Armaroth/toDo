import { fetchWithAuth } from "../auth.helpers";
import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useEditTodo() {
    const queryCLient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (payload) => await fetchWithAuth('http://localhost:4000/user/todos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload }),
            credentials: 'include'
        }),
        onSuccess: () => queryCLient.invalidateQueries({ queryKey: ['todos'] })
    });
    return mutation;
}