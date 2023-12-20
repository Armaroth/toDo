import { fetchWithAuth } from "../auth.helpers";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useArchiveTodo() {
    const queryCLient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id) => {
            fetchWithAuth('http://localhost:4000/user/archived', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }), credentials: 'include'

            }).then(data => data.json());
        },
        onSuccess: async () => {
            await queryCLient.invalidateQueries({ queryKey: ['archivedTodos'] });
        }
    });
    return mutation;
}