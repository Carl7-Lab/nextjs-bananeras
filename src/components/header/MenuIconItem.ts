import { BsPersonGear } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { MenuItemProps } from './MenuIcon';

export function getTopBarItems(idUser: number): MenuItemProps[] {
  const menuItems: MenuItemProps[] = [
    {
      icon: BsPersonGear,
      label: 'Profile',
      to: `/dashboard/user/${idUser || '1'}`,
    },
    {
      icon: FaPowerOff,
      label: 'Log out',
      to: '/api/auth/signout',
    },
  ];

  return menuItems;
}
