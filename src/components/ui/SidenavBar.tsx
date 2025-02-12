'use client';
import { Box, Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { AppBar } from './header/AppBar';
import Sidenav from './sidenav/sidenav';
import SidenavContainer from './sidenav/sidenav-container';
import { getNavItems } from './sidenav/SideNavItems';
import { useMenuCounts } from '../../hooks/useMenuCounts';
import { useExporter } from '../../hooks/useUserProfile';

export default function SidenavBar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const counts = useMenuCounts();
  const { data: session } = useSession();
  const navItems = getNavItems(counts.counts, session);
  const exporterData = useExporter();

  return (
    <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
      <Box as='main' m='0px' p='0px' width='100%'>
        <Box as='div' m='0px' p='0px' width='100%' className='App'>
          <AppBar exporter={exporterData} />
          <Flex height='90vh' overflow='auto' mt='4px'>
            {children}
          </Flex>
        </Box>
      </Box>
    </SidenavContainer>
  );
}
