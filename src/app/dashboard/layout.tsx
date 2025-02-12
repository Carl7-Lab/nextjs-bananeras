'use client';
import { Box, Flex } from '@chakra-ui/react';
import SidenavBar from '../../components/ui/SidenavBar';
import { useExporter } from '../../hooks/useUserProfile';

interface DashboardProviderProps {
  children: React.ReactNode;
}

export default function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const exporterData = useExporter();

  return (
    <Box as='div' bgColor={'gray.50'}>
      <Flex>
        <SidenavBar>{children}</SidenavBar>
      </Flex>
    </Box>
  );
}
