import { fetchWithAuth } from "../auth.helpers";
import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useNewTodo() {
    const queryCLient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (value) => {
            if (!value) {
                return
            }
            return await fetchWithAuth('http://localhost:4000/user/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value }),
                credentials: 'include'
            }).then(data => {
                if (data.ok) {
                    return data.json()
                }
            });
        },
        onSuccess: async () => await queryCLient.invalidateQueries({ queryKey: ['todos'] })
    });
    return mutation;
}