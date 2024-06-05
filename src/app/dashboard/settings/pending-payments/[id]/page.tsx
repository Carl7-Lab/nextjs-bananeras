'use client';
import { Box, Card, CardBody, Center, Heading } from '@chakra-ui/react';
import { redirect, useParams } from 'next/navigation';
import React, { useLayoutEffect } from 'react';
import PendingPaymentForm from '../../../../../components/export/export-payments/PendingPaymentForm';
import { useExportSent } from '../../../../../hooks/export/export-sent/getExportSent';
import { ExportSentType } from '../../../../../types/exportSent';

function ExportPaymentPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useExportSent({
    exportSentId: params.id,
  });
  const pendingPayment = data as Partial<ExportSentType>;

  useLayoutEffect(() => {
    if (!isLoading) {
      // console.log('PendingExportPage pendingExport', pendingExport);
      if (!pendingPayment || !!pendingPayment.done) {
        return redirect('/dashboard/settings/pending-exports');
      }
    }
  }, [isLoading, pendingPayment]);

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
              <PendingPaymentForm paymentSelected={pendingPayment} />
            </CardBody>
          </Card>
        ) : (
          <Heading>Cargando...</Heading>
        )}
      </Center>
    </Box>
  );
}

export default ExportPaymentPage;
