import { useSession } from 'next-auth/react';
import { BsBarChart } from 'react-icons/bs';

import { FaCogs } from 'react-icons/fa';
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

  const boxBrandsMenu: SidenavMenuItem[] = [
    {
      label: 'Consultar',
      to: '/dashboard/box-brands/search',
    },
    {
      label: 'Agregar',
      to: '/dashboard/box-brands/add',
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

  const penalidadesMenu: SidenavMenuItem[] = [
    {
      label: 'Cajas Maduras',
      to: '/dashboard/penalidades/cajas-maduras',
    },
    {
      label: 'Cajas Estropeadas',
      to: '/dashboard/penalidades/cajas-estropeadas',
    },
  ];
  const settingsMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Marca',
      to: '/dashboard/settings/add-brand',
    },
  ];

  const navItems: SidenavItem[] = [
    {
      icon: BsBarChart,
      label: 'Productor',
      isMenu: true,
      to: '/dashboard/productor',
      menu: productorMenu,
    },
    {
      icon: BsBarChart,
      label: 'Marcas de Caja',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: boxBrandsMenu,
    },
    {
      icon: BsBarChart,
      label: 'Produccion',
      isMenu: true,
      to: '/dashboard/produccion',
      menu: produccionMenu,
    },
    {
      icon: BsBarChart,
      label: 'Materiales',
      isMenu: true,
      to: '/dashboard/materiales',
      menu: materialesMenu,
    },
    {
      icon: BsBarChart,
      label: 'Penalidades',
      isMenu: true,
      to: '/dashboard/penalidades',
      menu: penalidadesMenu,
    },
    {
      icon: FaCogs,
      label: 'Configuraciones',
      isMenu: true,
      to: '/dashboard/settings',
      menu: settingsMenu,
    },
  ];

  return navItems;
}
