'use client';
import { Box, IconButton } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { AppBar } from '../header/AppBar';
import Sidenav from '../sidenav/sidenav';
import SidenavContainer from '../sidenav/sidenav-container';
import { useSidenav } from '../sidenav/sidenav-context';
import { getNavItems } from '../sidenav/SideNavItems';

export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export default function SidenavBar({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: UserProps;
}>) {
  const { onOpen } = useSidenav();
  const navItems = getNavItems(user!.id);

  return (
    <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
      <Box as='main' m='0px' p='0px' width='100%'>
        <Box as={'div'} m='0px' p='0px' width='100%' className='App'>
          <AppBar user={user} />
          {children}
        </Box>
      </Box>
      <IconButton
        aria-label='menu'
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        icon={<FiMenu />}
      />
    </SidenavContainer>
  );
}
