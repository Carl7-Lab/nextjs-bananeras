import { BiChalkboard } from 'react-icons/bi';
import { BsBarChart } from 'react-icons/bs';

import { SidenavItem, SidenavMenuItem } from './sidenav-items';

export function getNavItems(idUser: number): SidenavItem[] {
  const dashboardMenu: SidenavMenuItem[] = [
    {
      label: 'opcion1',
      to: '/dashboard',
    },
    {
      label: 'opcion2',
      to: '/dashboard/opcion2',
    },
    {
      label: 'opcion3',
      to: '/dashboard/opcion3',
    },
  ];
  const navItems: SidenavItem[] = [
    {
      icon: BsBarChart,
      label: 'Dashboard',
      //   to: '/dashboard',
      isMenu: true,
      menu: dashboardMenu,
    },
    {
      icon: BiChalkboard,
      label: 'Profile',
      to: `/dashboard/user/${idUser}`,
    },
  ];

  return navItems;
}
