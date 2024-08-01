import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Text,
  CardFooter,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ExportSentType } from '../../../types/exportSent';

interface PendingPaymentCardProps {
  exportSentItem: Partial<ExportSentType>;
  pathname: string;
}

const PendingPaymentCard: React.FC<PendingPaymentCardProps> = ({
  exportSentItem,
  pathname,
}) => {
  const router = useRouter();

  const handleClick = () => {
    console.log(`export ${exportSentItem.id}: `, exportSentItem);
    router.push(`${pathname}/${exportSentItem.id}`);
  };

  const details = [
    {
      label: 'Productor',
      value: exportSentItem.export?.merchant?.businessName,
    },
    {
      label: 'Finca',
      value: exportSentItem.export?.business?.name,
    },
    {
      label: 'Puerto Salida',
      value: exportSentItem.export?.harborDeparture?.name,
    },
    {
      label: 'Puerto Destino',
      value: exportSentItem.export?.harborDestination?.name,
    },
    {
      label: 'Cliente',
      value: exportSentItem.export?.client?.businessName,
    },
  ];

  return (
    <Card boxShadow='md' borderRadius='md' width={'350px'}>
      <CardHeader>
        <Heading fontSize={'xl'} fontWeight={'extrabold'} color={'teal.500'}>
          Pago pendiente
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align='stretch'>
          {details.map((detail, index) => (
            <Box key={index}>
              <Heading fontSize='lg' display='inline-block'>
                {detail.label}:{' '}
                <Text
                  as='span'
                  fontSize='md'
                  fontWeight={'normal'}
                  color='gray.600'
                >
                  {detail.value}
                </Text>
              </Heading>
            </Box>
          ))}
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          w={'100%'}
          colorScheme='teal'
          variant={'outline'}
          onClick={handleClick}
        >
          Realizar pago
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingPaymentCard;
