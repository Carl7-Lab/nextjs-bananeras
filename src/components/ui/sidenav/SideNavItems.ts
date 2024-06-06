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
      to: '/dashboard/producer/fincas',
    },
    {
      label: 'Agregar Productor',
      to: '/dashboard/producer/add-producer',
    },
    {
      label: 'Agregar Fincas ',
      to: '/dashboard/producer/add-fincas',
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/producer/add-bank-account',
    },
  ];

  const exportMenu: SidenavMenuItem[] = [
    {
      label: 'Consultar',
      to: '/dashboard/export/search',
    },
    {
      label: 'Agregar',
      to: '/dashboard/export/add-export',
    },
  ];

  const boxBrandsMenu: SidenavMenuItem[] = [
    {
      label: 'Consultar',
      to: '/dashboard/box-brands/search',
    },
    {
      label: 'Agregar Tipo de Caja',
      to: '/dashboard/box-brands/add-box-brand',
    },
    {
      label: 'Agregar Marca de Caja',
      to: '/dashboard/box-brands/add-brand',
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
      label: 'Agregar Puerto',
      to: '/dashboard/settings/add-harbor',
    },
    {
      label: 'Agregar Cliente',
      to: '/dashboard/settings/add-client',
    },
    {
      label: 'Exportaciones Pendientes',
      to: '/dashboard/settings/pending-exports',
    },
    {
      label: 'Pagos de Exportaciones Pendientes',
      to: '/dashboard/settings/pending-payments',
    },
  ];

  const navItems: SidenavItem[] = [
    {
      icon: BsBarChart,
      label: 'Productor',
      isMenu: true,
      to: '/dashboard/producer',
      menu: productorMenu,
    },
    {
      icon: BsBarChart,
      label: 'Exportaciones',
      isMenu: true,
      to: '/dashboard/export',
      menu: exportMenu,
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
