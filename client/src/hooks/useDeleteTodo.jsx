import { fetchWithAuth } from "../auth.helpers";
import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useDeleteTodo() {
    const queryCLient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ id, table }) => {
            await fetchWithAuth(`http://localhost:4000/user/${table}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
        },
        onSuccess: async () => {
            await queryCLient.invalidateQueries({ queryKey: ['todos'] });
            await queryCLient.invalidateQueries({ queryKey: ['archivedTodos'] });
        }
    });
    return mutation;
}