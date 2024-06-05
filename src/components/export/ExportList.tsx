import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ExportCard from './ExportCard';
import { useExportsNotSent } from '../../hooks/export/getExportsNotSend';
import { usePagination } from '../../hooks/usePagination';
import { ExportType } from '../../types/export';

const ExportList = () => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useExportsNotSent(paginationParams);

  useEffect(() => {
    if (!isLoading) {
      console.log('ExportList isLoading: ', isLoading);
      console.log('ExportList data: ', data);
    }
  }, [data, isLoading]);

  return (
    <>
      {!isLoading ? (
        <VStack spacing={4} alignItems='center' justifyContent='center'>
          <Heading width='100%' textAlign='center'>
            Lista de exportaciones pendientes
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
            spacing={4}
          >
            {(data as Partial<ExportType>[]).map((item) => (
              <ExportCard key={item.id} exportItem={item} />
            ))}
          </SimpleGrid>
        </VStack>
      ) : (
        <Heading>Cargando...</Heading>
      )}
    </>
  );
};

export default ExportList;
