import { Box } from '@chakra-ui/react';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import DetailCuttingTypes from './DetailCuttingTypes';
import { useCuttingTypes } from '../../../../hooks/export/cutting-type/getCuttingTypes';
import { usePagination } from '../../../../hooks/usePagination';

const TableCuttingTypes = ({
  width,
  windowSize,
}: {
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data = [], isLoading, error } = useCuttingTypes(paginationParams);
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
        accessorKey: 'shipmentType',
        header: 'Tipo de Corte',
      },
      {
        accessorKey: 'leavesAtHarvest',
        header: 'Hojas en Cosecha',
      },
      {
        accessorKey: 'maxAgeAtCut',
        header: 'Edad Máxima al Corte',
      },
      {
        accessorKey: 'fingerLength',
        header: 'Longitud de Dedo',
      },
      {
        accessorKey: 'minCaliber',
        header: 'Calibre Mínimo',
      },
      {
        accessorKey: 'maxCaliber',
        header: 'Calibre Máximo',
      },
      {
        accessorKey: 'quality',
        header: 'Calidad',
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
        right: ['fingerLength'],
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
        <DetailCuttingTypes cuttingType={row.original} width={width} />
      </Box>
    ),
    localization: MRT_Localization_ES,
  });

  return <MaterialReactTable table={table} />;
};

export default TableCuttingTypes;
