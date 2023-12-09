import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../auth.helpers';

export function useToDos() {
    const query = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return fetchWithAuth('http://localhost:4000/user/todos').then(data => data.json());
        }
    });
    return query;
}