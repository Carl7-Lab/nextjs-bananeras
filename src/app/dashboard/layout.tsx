import { Box } from '@chakra-ui/react';
import { getServerSession } from 'next-auth/next';
import SidenavBar from '../../components/SidenavBar';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <Box as='div' bgColor={'gray.50'}>
      <SidenavBar idUser={session?.user?.id}>{children}</SidenavBar>
    </Box>
  );
}
