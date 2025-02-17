import { useSession } from 'next-auth/react';
import { BsBarChart } from 'react-icons/bs';

import { FaBoxOpen, FaCashRegister, FaCogs, FaUserTie } from 'react-icons/fa';
import {
  MdContentCut,
  MdFlightTakeoff,
  MdOutlineAgriculture,
} from 'react-icons/md';
import { SidenavItem, SidenavMenuItem } from './sidenav-items';
import { useExporter } from '../../../hooks/useUserProfile';

export function GetUser() {
  const { data: session } = useSession();
  return session?.user;
}

export function getNavItems(counts: any, session: any): SidenavItem[] {
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
      to: '/dashboard/liquidation/add-supply-shipment',
      count: counts.addSupplyShipment,
    },
    {
      label: 'Envíos Realizados',
      to: '/dashboard/liquidation/exports-sent',
    },
    {
      label: 'Pago a Productores',
      to: '/dashboard/liquidation/producer-pending-payments',
      count: counts.producerPendingPayments,
    },
    {
      label: 'Pagos Realizados',
      to: '/dashboard/liquidation/producer-payments',
    },
  ];

  const clientMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Puerto',
      to: '/dashboard/client/add-harbor',
    },
    {
      label: 'Consultar Puerto',
      to: '/dashboard/client/harbors',
    },
    {
      label: 'Agregar Cliente',
      to: '/dashboard/client/add-client',
    },
    {
      label: 'Consultar Cliente',
      to: '/dashboard/client/clients',
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/client/add-bank-account',
    },
    {
      label: 'Cuentas Bancarias',
      to: '/dashboard/client/bank-accounts',
    },
  ];

  const productorMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Productor',
      to: '/dashboard/producer/add-producer',
    },
    {
      label: 'Consultar Productor',
      to: '/dashboard/producer/producers',
    },
    {
      label: 'Agregar Finca',
      to: '/dashboard/producer/add-fincas',
    },
    {
      label: 'Consultar Finca',
      to: '/dashboard/producer/fincas',
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
      label: 'Agregar Marca de Caja',
      to: '/dashboard/box-brands/add-box-brand',
    },
    {
      label: 'Consultar Marca',
      to: '/dashboard/box-brands/search',
    },
    {
      label: 'Agregar Logo',
      to: '/dashboard/box-brands/upload-logo',
    },
    {
      label: 'Agregar Tipo de Corte',
      to: '/dashboard/box-brands/add-cutting-type',
    },
    {
      label: 'Tipos de Corte',
      to: '/dashboard/box-brands/cutting-types',
    },
  ];

  const cuttingSheetsMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Hoja de Corte',
      to: '/dashboard/export/add-cutting-sheet',
      count: counts.addCuttingSheet,
    },
    {
      label: 'Hojas de Corte',
      to: '/dashboard/export/cutting-sheets',
    },
  ];

  const settingsMenu: SidenavMenuItem[] = [
    {
      label: 'Modificar Logo',
      to: '/dashboard/settings/upload-logo',
    },
    {
      label: 'Modificar Ubicación',
      to: `/dashboard/user/update-user/${session?.user?.exporterId}`,
    },
  ];

  const navItems: SidenavItem[] = [
    {
      icon: MdOutlineAgriculture,
      label: 'Productor',
      isMenu: true,
      to: '/dashboard/producer',
      menu: productorMenu,
    },
    {
      icon: FaUserTie,
      label: 'Cliente',
      isMenu: true,
      to: '/dashboard/client',
      menu: clientMenu,
    },

    {
      icon: FaBoxOpen,
      label: 'Marcas de Caja',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: boxBrandsMenu,
    },
    {
      icon: MdFlightTakeoff,
      label: 'Exportaciones',
      isMenu: true,
      to: '/dashboard/export',
      menu: exportMenu,
    },
    {
      icon: MdContentCut,
      label: 'Hojas de Corte',
      isMenu: true,
      to: '/dashboard/export',
      menu: cuttingSheetsMenu,
      count: counts.addCuttingSheet,
    },
    {
      icon: FaCashRegister,
      label: 'Liquidación',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: liquidationMenu,
      count: counts.addSupplyShipment + counts.producerPendingPayments,
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
