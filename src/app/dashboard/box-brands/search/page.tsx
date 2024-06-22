'use client';
import { Box, Center } from '@chakra-ui/react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import React from 'react';
import { useMemo } from 'react';
import IsOnboarding from '../../../../components/ui/IsOnboarding';
import { useBrands } from '../../../../hooks/box-brand/specifications/brand/getBrands';
import { usePagination } from '../../../../hooks/usePagination';
import { BrandType } from '../../../../types/box-brand/specifications/brand';

function SearchBoxBrandPage() {
  const { paginationParams, filterProps } = usePagination();
  const { data = [], isLoading, refetch } = useBrands(paginationParams);

  console.log(data);

  const columns = useMemo<MRT_ColumnDef<Partial<BrandType>>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
  });

  return (
    <Box my={'auto'} mx={'auto'}>
      <Center>
        <MaterialReactTable table={table} />
      </Center>
    </Box>
  );
}

export default IsOnboarding(SearchBoxBrandPage);
