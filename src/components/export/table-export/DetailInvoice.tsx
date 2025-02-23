import {
  Box,
  Card,
  Divider,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { ProducerPaymentType } from '../../../types/producerPayment';

interface props {
  payment: Partial<ProducerPaymentType>;
}

const DetailInvoice = ({ payment }: props): React.JSX.Element => {
  return (
    <Card
      w={{
        base: '95%',
        sm: '95%',
        md: '90%',
        lg: '100%',
        xl: '100%',
        '2xl': '700px',
      }}
      mb={'10px'}
      pb={'30px'}
    >
      <Heading fontSize={'2xl'} p={'12px'} m={'16px'}>
        Liquidación a Productor
      </Heading>
      <Divider mb={'16px'} />

      <Heading fontSize={'2xl'} p={'12px'}>
        Productor
      </Heading>
      <Divider mb={'16px'} />

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacingX={5}
        spacingY={3}
        px={'20px'}
      >
        <Box>
          <FormLabel>Productor/Razón Social:</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.merchant?.businessName || ''}
          />
        </Box>
        <Box>
          <FormLabel>RUC:</FormLabel>
          <Input isReadOnly={true} value={payment.merchant?.businessId || ''} />
        </Box>
        <Box>
          <FormLabel>Ciudad:</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.merchant?.city || ''}
            placeholder={
              payment.merchant?.city ? 'No se ha agregado información' : ''
            }
          />
        </Box>
        <Box>
          <FormLabel>Dirección:</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.merchant?.address || ''}
            placeholder={
              payment.merchant?.address ? 'No se ha agregado información' : ''
            }
          />
        </Box>
      </SimpleGrid>

      <Heading fontSize={'2xl'} p={'12px'}>
        Puerto de Salida
      </Heading>
      <Divider mb={'16px'} />

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacingX={5}
        spacingY={3}
        px={'20px'}
      >
        <Box>
          <FormLabel>Nombre</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.harborDeparture?.name || ''}
          />
        </Box>
        <Box>
          <FormLabel>País</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.harborDeparture?.country || ''}
          />
        </Box>
        <Box>
          <FormLabel>Latitud</FormLabel>
          <Input
            isReadOnly={true}
            value={
              payment.harborDeparture?.latitude !== undefined &&
              payment.harborDeparture?.latitude !== null
                ? `${payment.harborDeparture?.latitude}`
                : ''
            }
            placeholder={
              payment.harborDeparture?.latitude !== undefined &&
              payment.harborDeparture?.latitude === null
                ? 'No se ha ingresado el valor'
                : ''
            }
          />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.harborDeparture?.city || ''}
          />
        </Box>
        <Box>
          <FormLabel>Longitud</FormLabel>
          <Input
            isReadOnly={true}
            value={
              payment.harborDeparture?.longitude !== undefined &&
              payment.harborDeparture?.longitude !== null
                ? `${payment.harborDeparture?.longitude}`
                : ''
            }
            placeholder={
              payment.harborDeparture?.longitude !== undefined &&
              payment.harborDeparture?.longitude === null
                ? 'No se ha ingresado el valor'
                : ''
            }
          />
        </Box>
      </SimpleGrid>

      <Heading fontSize={'2xl'} p={'12px'}>
        Puerto de Destino
      </Heading>
      <Divider mb={'16px'} />

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacingX={5}
        spacingY={3}
        px={'20px'}
      >
        <Box>
          <FormLabel>Nombre</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.harborDestination?.name || ''}
          />
        </Box>
        <Box>
          <FormLabel>País</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.harborDestination?.country || ''}
          />
        </Box>
        <Box>
          <FormLabel>Latitud</FormLabel>
          <Input
            isReadOnly={true}
            value={
              payment.harborDestination?.latitude !== undefined &&
              payment.harborDestination?.latitude !== null
                ? `${payment.harborDestination?.latitude}`
                : ''
            }
            placeholder={
              payment.harborDestination?.latitude !== undefined &&
              payment.harborDestination?.latitude === null
                ? 'No se ha ingresado el valor'
                : ''
            }
          />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.harborDestination?.city || ''}
          />
        </Box>
        <Box>
          <FormLabel>Longitud</FormLabel>
          <Input
            isReadOnly={true}
            value={
              payment.harborDestination?.longitude !== undefined &&
              payment.harborDestination?.longitude !== null
                ? `${payment.harborDestination?.longitude}`
                : ''
            }
            placeholder={
              payment.harborDestination?.longitude !== undefined &&
              payment.harborDestination?.longitude === null
                ? 'No se ha ingresado el valor'
                : ''
            }
          />
        </Box>
      </SimpleGrid>

      <Heading fontSize={'2xl'} p={'12px'}>
        Compra
      </Heading>
      <Divider mb={'16px'} />

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacingX={5}
        spacingY={3}
        px={'20px'}
      >
        <Box>
          <FormLabel>Precio:</FormLabel>
          <InputGroup width={'100%'}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.400'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <NumberInput
              value={Number(payment.price).toFixed(2)}
              width={'100%'}
              isReadOnly={true}
              step={0.01}
            >
              <NumberInputField textAlign={'right'} />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          <FormLabel>Subtotal1</FormLabel>
          <InputGroup width={'100%'}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.400'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <NumberInput
              value={Number(payment.subtotal1).toFixed(2)}
              width={'100%'}
              isReadOnly={true}
              step={0.01}
            >
              <NumberInputField textAlign={'right'} />
            </NumberInput>
          </InputGroup>
        </Box>
      </SimpleGrid>

      <Heading fontSize={'2xl'} p={'12px'}>
        Gastos
      </Heading>
      <Divider mb={'16px'} />

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacingX={5}
        spacingY={3}
        px={'20px'}
      >
        <Box>
          <FormLabel>Transporte:</FormLabel>
          <InputGroup width={'100%'}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.400'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <NumberInput
              value={Number(payment.transport).toFixed(2)}
              width={'100%'}
              isReadOnly={true}
              step={0.01}
            >
              <NumberInputField textAlign={'right'} />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          <FormLabel>Materiales:</FormLabel>
          <InputGroup width={'100%'}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.400'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <NumberInput
              value={Number(payment.materials).toFixed(2)}
              width={'100%'}
              isReadOnly={true}
              step={0.01}
            >
              <NumberInputField textAlign={'right'} />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          <FormLabel>Varios:</FormLabel>
          <InputGroup width={'100%'}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.400'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <NumberInput
              value={Number(payment.others).toFixed(2)}
              width={'100%'}
              isReadOnly={true}
              step={0.01}
            >
              <NumberInputField textAlign={'right'} />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          <FormLabel>Subtotal2:</FormLabel>
          <InputGroup width={'100%'}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.400'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <NumberInput
              value={Number(payment.subtotal2).toFixed(2)}
              width={'100%'}
              isReadOnly={true}
              step={0.01}
            >
              <NumberInputField textAlign={'right'} />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box></Box>
        <Box>
          <FormLabel>Total:</FormLabel>
          <InputGroup width={'100%'}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.400'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <NumberInput
              value={Number(payment.total).toFixed(2)}
              width={'100%'}
              isReadOnly={true}
              step={0.01}
            >
              <NumberInputField textAlign={'right'} />
            </NumberInput>
          </InputGroup>
        </Box>
      </SimpleGrid>

      <Box px={'20px'} mt={3}>
        <FormLabel>Descripción de los gastos:</FormLabel>
        <Textarea value={payment.description} isReadOnly={true} />
      </Box>

      <Heading fontSize={'2xl'} p={'12px'}>
        Cuenta Bancaria Origen
      </Heading>
      <Divider mb={'16px'} />

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacingX={5}
        spacingY={3}
        px={'20px'}
      >
        <Box>
          <FormLabel>Tipo</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.sourceBankAccount?.bank || ''}
          />
        </Box>
        <Box>
          <FormLabel>Tipo</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.sourceBankAccount?.type || ''}
          />
        </Box>
        <Box>
          <FormLabel>Propietario</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.sourceBankAccount?.owner || ''}
          />
        </Box>
        <Box>
          <FormLabel>Identificación</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.sourceBankAccount?.ownerID || ''}
          />
        </Box>
      </SimpleGrid>

      <Heading fontSize={'2xl'} p={'12px'}>
        Cuenta Bancaria Destino
      </Heading>
      <Divider mb={'16px'} />

      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacingX={5}
        spacingY={3}
        px={'20px'}
      >
        <Box>
          <FormLabel>Tipo</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.destinationBankAccount?.bank || ''}
          />
        </Box>
        <Box>
          <FormLabel>Tipo</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.destinationBankAccount?.type || ''}
          />
        </Box>
        <Box>
          <FormLabel>Propietario</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.destinationBankAccount?.owner || ''}
          />
        </Box>
        <Box>
          <FormLabel>Identificación</FormLabel>
          <Input
            isReadOnly={true}
            value={payment.destinationBankAccount?.ownerID || ''}
          />
        </Box>
      </SimpleGrid>
    </Card>
  );
};

export default DetailInvoice;
