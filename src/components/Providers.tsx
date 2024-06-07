'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createTheme as createMuiTheme, THEME_ID } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SidenavProvider from './ui/sidenav/sidenav-context';

interface Props {
  children: ReactNode;
}

const muiTheme = createMuiTheme();
const theme = extendTheme();

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ChakraProvider theme={{ ...theme, [THEME_ID]: muiTheme }} resetCSS>
        <QueryClientProvider client={queryClient}>
          <SidenavProvider>{children}</SidenavProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default Providers;
