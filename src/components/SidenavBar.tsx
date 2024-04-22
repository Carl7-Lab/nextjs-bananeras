'use client';
import { IconButton } from '@chakra-ui/react';
import { BiChalkboard, BiMap } from 'react-icons/bi';
import { BsBarChart } from 'react-icons/bs';
import { FiSettings, FiMenu } from 'react-icons/fi';
import Sidenav from './sidenav/sidenav';
import SidenavContainer from './sidenav/sidenav-container';
import { useSidenav } from './sidenav/sidenav-context';
import { SidenavItem } from './sidenav/sidenav-items';

export default function SidenavBar({
  children,
  idUser,
}: Readonly<{
  children: React.ReactNode;
  idUser?: number;
}>) {
  const navItems: SidenavItem[] = [
    { icon: BsBarChart, label: 'Dashboard', to: '/dashboard' },
    {
      icon: BiChalkboard,
      label: 'Profile',
      to: `/dashboard/user/${idUser}`,
    },
  ];

  const { onOpen } = useSidenav();

  return (
    <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
      <main>
        <div className='App'>
          <h1>Hello CodeSandbox!</h1>
          <h2>Start editing to see some magic happen!</h2>
          {children}
        </div>
      </main>
      <IconButton
        aria-label='menu'
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        icon={<FiMenu />}
      />
    </SidenavContainer>
  );
}
