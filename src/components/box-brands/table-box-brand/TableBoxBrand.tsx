import { Box } from '@mui/material';
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
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
        accessorKey: 'name',
        header: 'Nombre',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'brand.name',
        header: 'Marca',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'brandCode',
        header: 'Código',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'boxQuantity',
        header: 'Cantidad de Caja',
      },
      {
        accessorKey: 'netWeightBox',
        header: 'Peso Neto',
      },
      {
        accessorKey: 'grossWeightBox',
        header: 'Peso Bruto',
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilters: false,
    enableCellActions: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      columnPinning: {
        left: ['mrt-row-expand'],
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
        <DetailBoxBrand
          detail={row.original}
          width={width}
          windowSize={windowSize}
        />
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default TableBoxBrand;
