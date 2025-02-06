import { Box, Center, Icon } from '@chakra-ui/react';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { BsImage } from 'react-icons/bs';
import DetailProducers from './DetailProducers';
import { useProducers } from '../../../hooks/merchants/getAllMerchant';
import { usePagination } from '../../../hooks/usePagination';

interface Business {
  id: number;
  name: string;
  city: string;
  address: string;
  fruitType: string;
  area: number;
  latitude: number;
  longitude: number;
  codeMAGAP: string;
  codeAGROCALIDAD: string;
}

interface BankAccount {
  id: number;
  bank: string;
  owner: string;
  ownerID: string;
  accountNumber: string;
  type: string;
  email: string;
}

interface Merchant {
  id: number;
  businessName: string;
  city: string;
  email: string;
  businessId: string;
  address: string;
  contractType: string;
  businesses: Business[];
  bankAccounts: BankAccount[];
}

const TableProducers = ({
  width,
  windowSize,
}: {
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data = [], isLoading, error } = useProducers(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const { response } = error as any;
      const { data: dataRes } = response;
      const { statusCode } = dataRes;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
  }, [error, router]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'businessName',
        header: 'Productor',
        columns: [
          {
            accessorKey: 'businessName',
            header: 'Nombre',
          },
          {
            accessorKey: 'city',
            header: 'Ciudad',
          },
          {
            accessorKey: 'email',
            header: 'Correo Electrónico',
          },
          {
            accessorKey: 'businessId',
            header: 'RUC',
          },
        ],
      },
      {
        accessorKey: 'details',
        header: 'Detalles de Negocio',
        columns: [
          {
            accessorKey: 'address',
            header: 'Dirección',
          },
          {
            accessorKey: 'businesses',
            header: 'Fincas',
            Cell: ({ cell }) => {
              const value = cell.getValue<any[]>();
              return <span>{value?.length || 0} asociadas</span>;
            },
          },
          {
            accessorFn: (row: Merchant) =>
              row.businesses
                .map((business: Business) => business.name)
                .join(', '),
            header: 'Nombres',
          },
          {
            accessorFn: (row: Merchant) =>
              row.businesses
                .map((business: Business) => business.fruitType)
                .join(', '),
            header: 'Tipo de Cultivo',
          },
          {
            accessorFn: (row: Merchant) =>
              row.businesses
                .map((business: Business) => `${business.area} ha`)
                .join(', '),
            header: 'Área',
          },
        ],
      },
      {
        header: 'Logo',
        columns: [
          {
            accessorKey: 'logoUrl',
            header: 'Acceso',
            Cell: ({ cell }) => {
              const url = cell.getValue() as string | undefined;
              return url ? (
                <a href={url} target='_blank' rel='noopener noreferrer'>
                  <button
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Ver Logo
                    <Icon as={BsImage} color='teal.500' ml={2} />
                  </button>
                </a>
              ) : (
                <span>No disponible</span>
              );
            },
            size: 150,
          },
        ],
      },
      {
        header: 'Contrato',
        columns: [
          {
            accessorKey: 'contractType',
            header: 'Tipo de Contrato',
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: false,
    enableColumnFilters: false,
    enableCellActions: false,
    enableDensityToggle: false,
    enableColumnPinning: true,
    enableColumnDragging: false,
    enableHiding: false,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      columnPinning: {
        left: ['mrt-row-expand'],
        right: ['contractType'],
      },
      density: 'compact',
    },
    muiTableContainerProps: { sx: { maxHeight: '575px' } },
    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        padding: '0px',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,210,244,0.1)'
            : 'rgba(0,0,0,0.1)',
      }),
    }),
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          left: '0px',
          maxWidth:
            windowSize.width && windowSize.width >= 768
              ? `${width.md}px`
              : `${width.sm}px`,
          position: 'sticky',
          width: '100%',
        }}
      >
        <DetailProducers business={row.original} width={width} />
      </Box>
    ),
    localization: MRT_Localization_ES,
  });

  return <MaterialReactTable table={table} />;
};

export default TableProducers;
