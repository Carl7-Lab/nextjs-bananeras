'use client';
import { Box, Card, CardBody, Center, Heading } from '@chakra-ui/react';
import { redirect, useParams } from 'next/navigation';
import React, { useLayoutEffect } from 'react';
import SentMaterialsExportForm from '../../../../../components/export/SentMaterialsExportForm';
import { useExport } from '../../../../../hooks/export/getExport';
import { ExportType } from '../../../../../types/export';

const PendingExportPage = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useExport({ exportId: params.id });
  const pendingExport = data as Partial<ExportType>;

  useLayoutEffect(() => {
    if (!isLoading) {
      // console.log('PendingExportPage pendingExport', pendingExport);
      if (!pendingExport || !!pendingExport.done) {
        return redirect('/dashboard/settings/pending-exports');
      }
    }
  }, [isLoading, pendingExport]);

  return (
    <Box my={'20px'} mx={'auto'}>
      <Center>
        {!isLoading ? (
          <Card
            w={{
              base: '95%',
              sm: '95%',
              md: '90%',
              lg: '600px',
              xl: '600px',
              '2xl': '700px',
            }}
            mb={'20px'}
          >
            <CardBody w='100%'>
              <SentMaterialsExportForm exportSelected={pendingExport} />
            </CardBody>
          </Card>
        ) : (
          <Heading>Cargando...</Heading>
        )}
      </Center>
    </Box>
  );
};

export default PendingExportPage;
