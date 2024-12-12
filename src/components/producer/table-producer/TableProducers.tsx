import { Box } from '@chakra-ui/react';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import DetailProducers from './DetailProducers';
import { useProducers } from '../../../hooks/merchants/getAllMerchant';
import { usePagination } from '../../../hooks/usePagination';

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
        header: 'Nombre Productor',
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
      {
        accessorKey: 'address',
        header: 'Dirección',
      },
      {
        accessorKey: 'contractType',
        header: 'Tipo de Contrato',
      },
      {
        accessorKey: 'businesses',
        header: 'Asociados',
        Cell: ({ cell }) => {
          const value = cell.getValue<any[]>();
          return <span>{value?.length || 0} asociados</span>;
        },
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
  });

  return <MaterialReactTable table={table} />;
};

export default TableProducers;
