'use client';
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

interface Person {
  name: string;
  age: number;
}

const dataP: Person[] = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Sara',
    age: 25,
  },
];

function SearchBoxBrandPage() {
  const { paginationParams, filterProps } = usePagination();
  const { data: dataB, isLoading, refetch } = useBrands(paginationParams);

  console.log(dataB);

  const columnsP = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorFn: (originalRow) => Number(originalRow.age),
        id: 'age',
        header: 'Age',
        Header: <i style={{ color: 'red' }}>Age</i>,
        Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>,
      },
    ],
    []
  );

  const columnsB = useMemo<MRT_ColumnDef<Partial<BrandType>>[]>(
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

  const tableP = useMaterialReactTable({
    columns: columnsP,
    data: dataP,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
  });

  return (
    <div style={{ padding: '2rem' }}>
      <MaterialReactTable table={tableP} />
    </div>
  );
}

export default IsOnboarding(SearchBoxBrandPage);
