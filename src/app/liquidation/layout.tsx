import { Box, Flex } from '@chakra-ui/react';
import SidenavBar from '../../components/ui/SidenavBar';

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box as='div' bgColor={'gray.50'}>
      <Flex>
        <SidenavBar>{children}</SidenavBar>
      </Flex>
    </Box>
  );
}
