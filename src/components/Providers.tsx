'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from '@/theme';
import SidenavProvider from './ui/sidenav/sidenav-context';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SidenavProvider>{children}</SidenavProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default Providers;
