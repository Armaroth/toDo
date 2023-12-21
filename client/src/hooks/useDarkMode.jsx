import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../auth.helpers';
export function useDarkMode() {
    const query = useQuery({
        queryKey: ['darkMode'],
        queryFn: async () => {
            return await fetchWithAuth('http://localhost:4000/user/dark-mode', { credentials: 'include' }).then(data => data.json());
        }
    });
    return query;
}