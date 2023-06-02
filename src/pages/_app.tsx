import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/themes/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TypeAppProps } from '@/types/auth.types';
import { SessionProvider, getSession, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import AuthProvider from '@/providers/AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: false,
    },
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }: TypeAppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider Component={Component}>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
