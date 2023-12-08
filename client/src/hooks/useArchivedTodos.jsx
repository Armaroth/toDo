import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../auth.helpers';
export function useArchivedToDos() {
    const query = useQuery({
        queryKey: ['archivedTodos'],
        queryFn: async () => {
            return fetchWithAuth('http://localhost:4000/user/archived').then(data => data.json());
        }
    });
    return query;
}