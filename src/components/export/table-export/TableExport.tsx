import { Center } from '@chakra-ui/react';
import { Box } from '@mui/material';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { BsFillSendCheckFill, BsFillSendDashFill } from 'react-icons/bs';
import DetailExport from './DetailExport';
import { useExports } from '../../../hooks/export/getExports';
import { usePagination } from '../../../hooks/usePagination';
import { ExportType } from '../../../types/export';

const TableExport = ({
  width,
  windowSize,
}: {
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data = [], isLoading, refetch, error } = useExports(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data: dataRes } = response;
      const { statusCode } = dataRes;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const columns = useMemo<MRT_ColumnDef<Partial<ExportType>>[]>(
    () => [
      {
        id: 'boxes',
        header: 'Cajas',
        size: 50,
        columns: [
          {
            id: 'boxQuantity',
            header: '📦',
            accessorKey: 'boxQuantity',
            size: 50,
            enableColumnActions: false,
          },
        ],
      },
      {
        id: 'boxBrand',
        header: 'Tipo de Caja',
        columns: [
          {
            accessorKey: 'boxBrand.name',
            header: 'Nombre',
          },
          {
            accessorKey: 'boxBrand.brand.name',
            header: 'Marca',
          },
          {
            accessorKey: 'boxBrand.brandCode',
            header: 'Código',
          },
        ],
      },
      {
        id: 'producer',
        header: 'Productor',
        columns: [
          {
            accessorKey: 'merchant.businessName',
            header: 'Razon Social',
          },
          {
            accessorKey: 'merchant.businessId',
            header: 'RUC',
          },
          {
            accessorKey: 'business.name',
            header: 'Finca',
          },
        ],
      },
      {
        id: 'harborDeparture',
        header: 'Puerto Salida',
        columns: [
          {
            accessorKey: 'harborDeparture.name',
            header: 'Nombre',
          },
          {
            accessorKey: 'harborDeparture.city',
            header: 'Ciudad',
          },
        ],
      },
      {
        id: 'harborDestination',
        header: 'Puerto Destino',
        columns: [
          {
            accessorKey: 'harborDestination.name',
            header: 'Nombre',
          },
          {
            accessorKey: 'harborDestination.country',
            header: 'Ciudad',
          },
          {
            accessorKey: 'harborDestination.city',
            header: 'Ciudad',
          },
        ],
      },
      {
        id: 'client',
        header: 'Cliente',
        columns: [
          {
            accessorKey: 'client.businessName',
            header: 'Razon Social',
          },
          {
            accessorKey: 'client.type',
            header: 'Tipo',
          },
          {
            accessorKey: 'client.businessId',
            header: 'ID',
          },
          {
            accessorKey: 'client.email',
            header: 'Email',
            enableClickToCopy: true,
          },
          {
            accessorKey: 'client.phone',
            header: 'Telefono',
            enableClickToCopy: true,
          },
        ],
      },
      {
        header: 'Enviado',
        size: 50,
        columns: [
          {
            accessorFn: (row) => `${row.pendingExportSent}`,
            id: 'pendingExportSent',
            header: '🚛',
            enableColumnActions: false,
            size: 50,
            Cell: ({ renderedCellValue, row }) => (
              <span>
                {renderedCellValue === 'false' ? (
                  <Center>
                    <BsFillSendCheckFill color='green' />
                  </Center>
                ) : (
                  <Center>
                    <BsFillSendDashFill color='orange' />
                  </Center>
                )}
              </span>
            ),
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
      pagination: { pageSize: 5, pageIndex: 0 },
      columnPinning: {
        left: ['mrt-row-expand', 'boxQuantity'],
        right: ['pendingExportSent'],
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
            Number(windowSize.width) >= 768 ? `${width.md}px` : `${width.sm}px`,
          position: 'sticky',
          width: '100%',
        }}
      >
        <DetailExport
          boxBrand={row.original.boxBrand!}
          supply={row.original.exportSent!}
          businessContacts={row.original.business?.contacts!}
          pendingSent={row.original.pendingExportSent!}
          width={width}
          windowSize={windowSize}
        />
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default TableExport;
