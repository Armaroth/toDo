import { useQuery } from '@tanstack/react-query';

export function useToDos() {
    const query = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return fetchWithAuth('http://localhost:4000/user/todos').then(data => data.json());
        }
    });
    console.log(query)
    return query;
}