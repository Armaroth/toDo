import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../auth.helpers';
export function useArchivedToDos() {
    const query = useQuery({
        queryKey: ['archivedTodos'],
        queryFn: async () => await fetchWithAuth('http://localhost:4000/user/archived',
            { credentials: 'include' })
            .then(data => data.json())
    });
    return query;
}