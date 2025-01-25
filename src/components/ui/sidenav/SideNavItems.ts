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
      label: 'Iniciar Exportación',
      to: '/dashboard/export/add-export',
    },
    {
      label: 'Consultar Exportación',
      to: '/dashboard/export/search',
    },
  ];

  const liquidationMenu: SidenavMenuItem[] = [
    {
      label: 'Envío de Insumos',
      to: '/dashboard/export/add-supply-shipment',
    },
    {
      label: 'Envíos Realizados',
      to: '/liquidation/exports-sent',
    },
    {
      label: 'Pago a Productores',
      to: '/dashboard/export/producer-pending-payments',
    },
    {
      label: 'Pagos Realizados',
      to: '/liquidation/producer-payments',
    },
  ];

  const clientMenu: SidenavMenuItem[] = [
    {
      label: 'Consultar Puerto',
      to: '/dashboard/client/harbors',
    },
    {
      label: 'Agregar Puerto',
      to: '/dashboard/client/add-harbor',
    },
    {
      label: 'Consultar Cliente',
      to: '/dashboard/client/clients',
    },
    {
      label: 'Agregar Cliente',
      to: '/dashboard/client/add-client',
    },
    {
      label: 'Cuentas Bancarias',
      to: '/dashboard/client/bank-accounts',
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/client/add-bank-account',
    },
  ];

  const productorMenu: SidenavMenuItem[] = [
    {
      label: 'Consultar Productor',
      to: '/dashboard/producer/producers',
    },
    {
      label: 'Agregar Productor',
      to: '/dashboard/producer/add-producer',
    },
    {
      label: 'Consultar Finca',
      to: '/dashboard/producer/fincas',
    },
    {
      label: 'Agregar Finca',
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
      label: 'Consultar Marca',
      to: '/dashboard/box-brands/search',
    },
    {
      label: 'Agregar Marca de Caja',
      to: '/dashboard/box-brands/add-box-brand',
    },
    {
      label: 'Agregar Logo',
      to: '/dashboard/box-brands/upload-logo',
    },
    {
      label: 'Tipos de Corte',
      to: '/dashboard/box-brands/cutting-types',
    },
    {
      label: 'Agregar Tipo de Corte',
      to: '/dashboard/box-brands/add-cutting-type',
    },
  ];

  const cuttingSheetsMenu: SidenavMenuItem[] = [
    {
      label: 'Hojas de Corte',
      to: '/dashboard/export/cutting-sheets',
    },
    {
      label: 'Agregar Hoja de Corte',
      to: '/dashboard/export/add-cutting-sheet',
    },
  ];

  const settingsMenu: SidenavMenuItem[] = [];

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
      label: 'Cliente',
      isMenu: true,
      to: '/dashboard/client',
      menu: clientMenu,
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
      label: 'Exportaciones',
      isMenu: true,
      to: '/dashboard/export',
      menu: exportMenu,
    },
    {
      icon: BsBarChart,
      label: 'Hojas de Corte',
      isMenu: true,
      to: '/dashboard/export',
      menu: cuttingSheetsMenu,
    },
    {
      icon: BsBarChart,
      label: 'Liquidación',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: liquidationMenu,
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
