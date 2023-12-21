import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "../auth.helpers";

export function useToggleDarkMode() {
    const queryCLient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            await fetchWithAuth(`http://localhost:4000/user/dark-mode`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
        },
        onSuccess: async () => {
            await queryCLient.invalidateQueries({ queryKey: ['darkMode'] });
        }
    });
    return mutation;
}