import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/userContext';

export function AppProviders({ children }) {
    const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, refetchInterval: (1000 * 60) * 15, refetchIntervalInBackground: true } } })
    return (
        <QueryClientProvider client={queryClient} >
            <UserProvider>
                {children}
            </UserProvider>
        </QueryClientProvider>
    )
}

