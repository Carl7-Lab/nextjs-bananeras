import { Box } from '@chakra-ui/react';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import DetailBankAccounts from './DetailBankAccounts';
import { useBankAccounts } from '../../../hooks/bank-account/getBankAccounts';
import { usePagination } from '../../../hooks/usePagination';

const TableBankAccounts = ({
  width,
  windowSize,
}: {
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data = [], isLoading, error } = useBankAccounts(paginationParams);
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
        accessorKey: 'merchant.businessName',
        header: 'Nombre del Negocio',
      },
      {
        accessorKey: 'merchant.businessId',
        header: 'RUC del Negocio',
      },
      {
        accessorKey: 'merchant.city',
        header: 'Ciudad',
      },
      {
        accessorKey: 'merchant.address',
        header: 'Dirección',
      },
      {
        accessorKey: 'bank',
        header: 'Banco',
      },
      {
        accessorKey: 'owner',
        header: 'Propietario',
      },
      {
        accessorKey: 'accountNumber',
        header: 'Número de Cuenta',
      },
      {
        accessorKey: 'type',
        header: 'Tipo de Cuenta',
      },
      {
        accessorKey: 'email',
        header: 'Correo Electrónico',
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
      pagination: { pageSize: 5, pageIndex: 0 },
      columnPinning: {
        left: ['mrt-row-expand'],
        right: ['type'],
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
        <DetailBankAccounts account={row.original} width={width} />
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default TableBankAccounts;
