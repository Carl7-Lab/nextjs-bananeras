import { BsPersonGear } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { MenuItemProps } from './MenuIcon';
import { GetUser } from '../sidenav/SideNavItems';

export function getTopBarItems(): MenuItemProps[] {
  const user = GetUser();

  const menuItems: MenuItemProps[] = [
    {
      icon: BsPersonGear,
      label: 'Profile',
      to: `/dashboard/user/${user?.id}`,
    },
    {
      icon: FaPowerOff,
      label: 'Log out',
      to: '/api/auth/signout',
    },
  ];

  return menuItems;
}
