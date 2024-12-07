import { useSession } from 'next-auth/react';
import { BsBarChart } from 'react-icons/bs';

import { FaCogs } from 'react-icons/fa';
import { SidenavItem, SidenavMenuItem } from './sidenav-items';

export function GetUser() {
  const { data: session } = useSession();
  return session?.user;
}

export function getNavItems(): SidenavItem[] {
  const exportMenu: SidenavMenuItem[] = [
    {
      label: 'Consultar',
      to: '/dashboard/export/search',
    },
    {
      label: 'Iniciar Exportación',
      to: '/dashboard/export/add-export',
    },
    {
      label: 'Hoja de Corte',
      to: '/dashboard/export/cutting-sheet',
    },
    {
      label: 'Envío de Insumos',
      to: '/dashboard/export/supply-shipment',
    },
    {
      label: 'Pagos Pendientes a Productores',
      to: '/dashboard/export/producer-pending-payments',
    },
  ];

  const clientMenu: SidenavMenuItem[] = [
    {
      label: 'Clientes',
      to: '/dashboard/client/clients',
    },
    {
      label: 'Cuentas Bancarias',
      to: '/dashboard/client/bank-accounts',
    },
    {
      label: 'Puertos',
      to: '/dashboard/client/harbors',
    },
    {
      label: 'Agregar Cliente',
      to: '/dashboard/client/add-client',
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/client/add-bank-account',
    },
    {
      label: 'Agregar Puerto',
      to: '/dashboard/client/add-harbor',
    },
  ];

  const productorMenu: SidenavMenuItem[] = [
    {
      label: 'Fincas',
      to: '/dashboard/producer/fincas',
    },
    {
      label: 'Productores',
      to: '/dashboard/producer/producers',
    },
    {
      label: 'Agregar Productor',
      to: '/dashboard/producer/add-producer',
    },
    {
      label: 'Agregar Fincas',
      to: '/dashboard/producer/add-fincas',
    },
    {
      label: 'Agregar Logo',
      to: '/dashboard/producer/upload-logo',
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/producer/add-bank-account',
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

  const settingsMenu: SidenavMenuItem[] = [];

  const navItems: SidenavItem[] = [
    {
      icon: BsBarChart,
      label: 'Exportaciones',
      isMenu: true,
      to: '/dashboard/export',
      menu: exportMenu,
    },
    {
      icon: BsBarChart,
      label: 'Cliente',
      isMenu: true,
      to: '/dashboard/client',
      menu: clientMenu,
    },
    {
      icon: BsBarChart,
      label: 'Productor',
      isMenu: true,
      to: '/dashboard/producer',
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
      icon: FaCogs,
      label: 'Configuraciones',
      isMenu: true,
      to: '/dashboard/settings',
      menu: settingsMenu,
    },
  ];

  return navItems;
}
