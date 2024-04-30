'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import theme from '@/theme';
import SidenavProvider from './ui/sidenav/sidenav-context';

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <SidenavProvider>{children}</SidenavProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default Providers;
