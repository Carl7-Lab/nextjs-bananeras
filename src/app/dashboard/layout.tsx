import { Box, Flex } from '@chakra-ui/react';
import { getServerSession } from 'next-auth/next';
import SidenavBar from '../../components/ui/SidenavBar';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  console.log('inf sessio', session);
  return (
    <Box as='div' bgColor={'gray.50'}>
      <Flex>
        <SidenavBar user={session!.user}>{children}</SidenavBar>
      </Flex>
    </Box>
  );
}
