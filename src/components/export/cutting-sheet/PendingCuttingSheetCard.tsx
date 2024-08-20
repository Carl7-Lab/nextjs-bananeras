import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ExportType } from '../../../types/export';

interface Props {
  exportItem: Partial<ExportType>;
  pathname: string;
}

const PendingCuttingSheetCard = ({ exportItem, pathname }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    console.log(`export ${exportItem.id}: `, exportItem);
    router.push(`${pathname}/${exportItem.id}`);
  };

  const details = [
    {
      label: 'Productor',
      value: exportItem.merchant?.businessName,
    },
    {
      label: 'Finca',
      value: exportItem.business?.name,
    },
    {
      label: 'Puerto Salida',
      value: exportItem.harborDeparture?.name,
    },
    {
      label: 'Puerto Destino',
      value: exportItem.harborDestination?.name,
    },
    {
      label: 'Cliente',
      value: exportItem.client?.businessName,
    },
  ];

  return (
    <Card boxShadow='md' borderRadius='md' width={'350px'}>
      <CardHeader>
        <Heading fontSize={'xl'} fontWeight={'extrabold'} color={'teal.500'}>
          Hoja de Corte pendiente
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
          Realizar Hoja de Corte
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingCuttingSheetCard;
