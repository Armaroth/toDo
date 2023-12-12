import { fetchWithAuth } from "../auth.helpers";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteTodo() {
    const queryCLient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, table }) => {
            return fetchWithAuth(`http://localhost:4000/user/${table}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
        },
        onSuccess: async () => {
            await queryCLient.invalidateQueries(['todos']);
        }
    });
    return mutation;
}