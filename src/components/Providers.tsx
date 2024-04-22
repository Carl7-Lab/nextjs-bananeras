'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import theme from '@/theme';
import SidenavProvider from './sidenav/sidenav-context';

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ChakraProvider theme={theme}>
      <SidenavProvider>
        <SessionProvider>{children}</SessionProvider>
      </SidenavProvider>
    </ChakraProvider>
  );
};

export default Providers;
