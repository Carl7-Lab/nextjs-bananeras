import { useSession } from 'next-auth/react';
import { BiChalkboard } from 'react-icons/bi';
import { BsBarChart } from 'react-icons/bs';

import { SidenavItem, SidenavMenuItem } from './sidenav-items';

export function GetUser() {
  const { data: session } = useSession();
  return session?.user;
}

export function getNavItems(): SidenavItem[] {
  const productorMenu: SidenavMenuItem[] = [
    {
      label: 'Fincas',
      to: '/dashboard/productor/fincas',
    },
  ];

  const marcasCajaMenu: SidenavMenuItem[] = [
    {
      label: 'Dole',
      to: '/dashboard/marcas-de-cajas/dole',
    },
    {
      label: 'Chiquita',
      to: '/dashboard/marcas-de-cajas/chiquita',
    },
    {
      label: 'Del Monte',
      to: '/dashboard/marcas-de-cajas/del-monte',
    },
  ];

  const produccionMenu: SidenavMenuItem[] = [
    {
      label: 'Enfunde',
      to: '/dashboard/produccion/enfunde',
    },
    {
      label: 'Estimaciones',
      to: '/dashboard/produccion/estimaciones',
    },
    {
      label: 'Merma',
      to: '/dashboard/produccion/merma',
    },
  ];

  const materialesMenu: SidenavMenuItem[] = [
    {
      label: 'Carton',
      to: '/dashboard/materiales/carton',
    },
    {
      label: 'Funda',
      to: '/dashboard/materiales/funda',
    },
    {
      label: 'Etiqueta',
      to: '/dashboard/materiales/etiqueta',
    },
  ];

  const penlidadesMenu: SidenavMenuItem[] = [
    {
      label: 'Cajas Maduras',
      to: '/dashboard/penalidades/cajas-maduras',
    },
    {
      label: 'Cajas Estropeadas',
      to: '/dashboard/penalidades/cajas-estropeadas',
    },
  ];

  const navItems: SidenavItem[] = [
    {
      icon: BsBarChart,
      label: 'Productor',
      isMenu: true,
      menu: productorMenu,
    },
    {
      icon: BsBarChart,
      label: 'Marcas de Caja',
      isMenu: true,
      menu: marcasCajaMenu,
    },
    {
      icon: BsBarChart,
      label: 'Produccion',
      isMenu: true,
      menu: produccionMenu,
    },
    {
      icon: BsBarChart,
      label: 'Materiales',
      isMenu: true,
      menu: materialesMenu,
    },
    {
      icon: BsBarChart,
      label: 'Penalidades',
      isMenu: true,
      menu: penlidadesMenu,
    },
  ];

  return navItems;
}
