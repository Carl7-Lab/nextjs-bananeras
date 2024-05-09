'use client';
import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import SelectBoxBrand from './SelectBoxBrand';
import SelectClient from './SelectClient';
import SelectHarbor from './SelectHarbor';
import SelectProducer from './SelectProducer';
import { useCreateExport } from '../../hooks/export/createExport';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  boxBrand: number | '';
  boxQuantity: number;
  merchant: number | '';
  destinationPort: number | '';
  client: number | '';
  logisticShipSteam: string;
  logisticShippingLineSeal: string;
  logisticExtraSeal: string;
}

const initialValues: ValuesProps = {
  boxBrand: '',
  boxQuantity: 0,
  merchant: '',
  destinationPort: '',
  client: '',
  logisticShipSteam: '',
  logisticShippingLineSeal: '',
  logisticExtraSeal: '',
};

const validationSchema = Yup.object({
  boxBrand: Yup.string().required('Required'),
  boxQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  merchant: Yup.string().required('Required'),
  destinationPort: Yup.string().required('Required'),
  client: Yup.string().required('Required'),
  logisticShipSteam: Yup.string().required('Required'),
  logisticShippingLineSeal: Yup.string().required('Required'),
  logisticExtraSeal: Yup.string().required('Required'),
});

const AddExportForm = () => {
  const { createExport } = useCreateExport();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addExport = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('addExport values: ', values);

    createExport(
      {
        boxQuantity: Number(values.boxQuantity),
        boxBrand: {
          id: values.boxBrand,
        },
        merchant: {
          id: values.merchant,
        },
        harbor: {
          id: values.destinationPort,
        },
        client: {
          id: values.client,
        },
        shipSteam: values.logisticShipSteam,
        shippingLineSeal: values.logisticShippingLineSeal,
        extraSeal: values.logisticExtraSeal,
      },
      {
        onError: (error) => {
          toast({
            title: 'Error.',
            description: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: 'Exportacion creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('exports');
          actions.resetForm();
        },
      }
    );

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addExport}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Marca de Caja
              </Heading>
              <Divider mb={'16px'} />

              <SelectBoxBrand name={'boxBrand'} name2={'boxQuantity'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Productor
              </Heading>
              <Divider mb={'16px'} />
              <SelectProducer name={'merchant'} isSubmitting={isSubmitting} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Puerto Destino
              </Heading>
              <Divider mb={'16px'} />
              <SelectHarbor name={'destinationPort'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Cliente
              </Heading>
              <Divider mb={'16px'} />
              <SelectClient name={'client'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Logística
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'logisticShipSteam'}
                  label={'Vapor del buque'}
                />
                <InputFieldText
                  name={'logisticShippingLineSeal'}
                  label={'Sello de Naviera'}
                />
                <InputFieldText
                  name={'logisticExtraSeal'}
                  label={'Sellos extra'}
                />
              </SimpleGrid>

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                variant={'purple'}
                isLoading={isSubmitting}
              >
                Enviar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddExportForm;
