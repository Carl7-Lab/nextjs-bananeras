import { Box } from '@chakra-ui/react';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import DetailHarbors from './DetailHarbors';
import { useHarbors } from '../../../hooks/export/harbor/getHarbors';
import { usePagination } from '../../../hooks/usePagination';

const TableHarbors = ({
  width,
  windowSize,
}: {
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data = [], isLoading, error } = useHarbors(paginationParams);
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
        accessorKey: 'name',
        header: 'Nombre del Puerto',
      },
      {
        accessorKey: 'country',
        header: 'País',
      },
      {
        accessorKey: 'city',
        header: 'Ciudad',
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
      },
      {
        accessorKey: 'clients',
        header: 'Clientes',
        Cell: ({ cell }) => {
          const clients = cell.getValue<any[]>();
          return (
            <span>
              {clients?.map((client) => client.businessName).join(', ') ||
                'N/A'}
            </span>
          );
        },
      },
      {
        accessorKey: 'latitude',
        header: 'Latitud',
      },
      {
        accessorKey: 'longitude',
        header: 'Longitud',
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
        <DetailHarbors business={row.original} width={width} />
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default TableHarbors;
