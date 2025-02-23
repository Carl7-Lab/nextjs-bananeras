'use client';
import { Box, Flex } from '@chakra-ui/react';
import SidenavBar from '../../components/ui/SidenavBar';
interface DashboardProviderProps {
  children: React.ReactNode;
}

export default function DashboardProvider({
  children,
}: DashboardProviderProps): JSX.Element {
  return (
    <Box as='div' bgColor={'gray.50'}>
      <Flex>
        <SidenavBar>{children}</SidenavBar>
      </Flex>
    </Box>
  );
}
