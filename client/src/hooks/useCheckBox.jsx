import { fetchWithAuth } from "../auth.helpers";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCheckBox() {
    const queryCLient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload) => fetchWithAuth('http://localhost:4000/user/todos/check', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload })
        }),
        onSuccess: () => queryCLient.invalidateQueries(['todos'])
    });
    return mutation;
}