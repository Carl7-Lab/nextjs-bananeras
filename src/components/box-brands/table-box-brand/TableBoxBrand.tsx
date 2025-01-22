import { Box } from '@mui/material';
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import DetailBoxBrand from './DetailBoxBrand';
import { useBoxBrands } from '../../../hooks/box-brand/getBoxBrands';
import { usePagination } from '../../../hooks/usePagination';
import { BoxBrandType } from '../../../types/box-brand/boxBrand';

const TableBoxBrand = ({
  width,
  windowSize,
}: {
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  const { paginationParams, filterProps } = usePagination();
  const {
    data = [],
    isLoading,
    refetch,
    error,
  } = useBoxBrands(paginationParams);
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

  const columns = useMemo<MRT_ColumnDef<Partial<BoxBrandType>>[]>(
    () => [
      {
        header: 'Marca de Caja',
        columns: [
          {
            accessorKey: 'name',
            header: 'Nombre de la Caja',
            muiTableHeadCellProps: { style: { color: 'green' } },
          },
          {
            accessorKey: 'brand.name',
            header: 'Marca Asociada',
            muiTableHeadCellProps: { style: { color: 'green' } },
          },
        ],
      },
      {
        header: 'Detalles',
        columns: [
          {
            accessorKey: 'boxQuantity',
            header: 'Cantidad de Cajas',
          },
          {
            accessorKey: 'netWeightBox',
            header: 'Peso Neto por Caja (kg)',
            Cell: ({ cell }) => {
              const value = cell.getValue<number>();
              return value ? `${value} kg` : 'N/A';
            },
          },
          {
            accessorKey: 'grossWeightBox',
            header: 'Peso Bruto por Caja (kg)',
            Cell: ({ cell }) => {
              const value = cell.getValue<number>();
              return value ? `${value} kg` : 'N/A';
            },
          },
          {
            accessorKey: 'seal.name',
            header: 'Sello',
          },
          {
            accessorKey: 'seal.type',
            header: 'Tipo de Sello',
          },
        ],
      },
      {
        header: 'Código',
        columns: [
          {
            accessorKey: 'brandCode',
            header: 'Código de Marca',
            muiTableHeadCellProps: { style: { color: 'green' } },
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
        right: ['brandCode'],
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
        <DetailBoxBrand
          detail={row.original}
          width={width}
          windowSize={windowSize}
        />
      </Box>
    ),
    localization: MRT_Localization_ES,
  });

  return <MaterialReactTable table={table} />;
};

export default TableBoxBrand;
