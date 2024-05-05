'use client';
import { Box, Center, Flex } from '@chakra-ui/react';
import { AppBar } from './header/AppBar';
import Sidenav from './sidenav/sidenav';
import SidenavContainer from './sidenav/sidenav-container';
import { getNavItems } from './sidenav/SideNavItems';

export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export default function SidenavBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = getNavItems();

  return (
    <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
      <Box as='main' m='0px' p='0px' width='100%'>
        <Box as={'div'} m='0px' p='0px' width='100%' className='App'>
          <AppBar />
          <Flex height='90vh' overflow='auto' mt='4px'>
            {children}
          </Flex>
        </Box>
      </Box>
    </SidenavContainer>
  );
}
