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
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateExport } from '../../hooks/export/createExport';
import SelectBoxBrand from '../box-brands/SelectBoxBrand';
import SelectBusiness from '../business/SelectBusiness';
import SelectClient from '../client/SelectClient';
import SelectHarbor from '../harbor/SelectHarbor';
import SelectProducer from '../producer/SelectProducer';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  boxBrandId: number | '';
  boxQuantity: number | '';
  merchantId: number | '';
  businessId: number | '';
  // harborId: number | '';
  departureHarborId: number | '';
  destinationHarborId: number | '';
  clientId: number | '';
  shipSteam: string;
  shippingLineSeal: string;
  extraSeal: string;
  dataReviewed: boolean;
}

const initialValues: ValuesProps = {
  boxBrandId: '',
  boxQuantity: 0,
  merchantId: '',
  businessId: '',
  // harborId: '',
  departureHarborId: '',
  destinationHarborId: '',
  clientId: '',
  shipSteam: '',
  shippingLineSeal: '',
  extraSeal: '',
  dataReviewed: false,
};

const validationSchema = Yup.object({
  boxBrandId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  boxQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
  merchantId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  businessId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  departureHarborId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  destinationHarborId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  clientId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  shipSteam: Yup.string()
    .max(20, 'Debe tener 10 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  shippingLineSeal: Yup.string()
    .max(20, 'Debe tener 10 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  extraSeal: Yup.string()
    .max(20, 'Debe tener 10 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

const AddExportForm = () => {
  const { createExport } = useCreateExport();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addExport = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const { boxQuantity, dataReviewed, ...exportData } = values;

    createExport(
      {
        ...exportData,
        boxQuantity: Number(boxQuantity),
      },
      {
        onError: (error: any) => {
          const { response } = error;
          const { data } = response;
          const { statusCode, message, error: errorTitle, model, prop } = data;

          toast({
            title: `Error ${statusCode}: ${errorTitle} `,
            description: `${message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

          if (statusCode === 401) {
            router.push('/api/auth/signout');
          }
        },
        onSuccess: () => {
          toast({
            title: 'Exportacion creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('exports');
          queryClient.invalidateQueries('exportsPending');
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
        {({ isSubmitting, values }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Marca de Caja
              </Heading>
              <Divider mb={'16px'} />

              <SelectBoxBrand name={'boxBrandId'} name2={'boxQuantity'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Productor
              </Heading>
              <Divider mb={'16px'} />
              <SelectProducer name={'merchantId'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Finca
              </Heading>
              <Divider mb={'16px'} />
              <SelectBusiness
                name={'businessId'}
                merchant={
                  values?.merchantId ? Number(values.merchantId) : undefined
                }
              />

              <Heading fontSize={'2xl'} p={'12px'}>
                Puerto Salida
              </Heading>
              <Divider mb={'16px'} />
              <SelectHarbor name={'departureHarborId'} type={'Nacional'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Puerto Destino
              </Heading>
              <Divider mb={'16px'} />
              <SelectHarbor
                name={'destinationHarborId'}
                type={'Internacional'}
              />

              <Heading fontSize={'2xl'} p={'12px'}>
                Cliente
              </Heading>
              <Divider mb={'16px'} />
              <SelectClient
                name={'clientId'}
                harbor={
                  values?.destinationHarborId
                    ? Number(values.destinationHarborId)
                    : undefined
                }
                isHarbor
              />

              <Heading fontSize={'2xl'} p={'12px'}>
                Logística
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'shipSteam'} label={'Vapor del buque'} />
                <InputFieldText
                  name={'shippingLineSeal'}
                  label={'Sello de Naviera'}
                />
                <InputFieldText name={'extraSeal'} label={'Sellos extra'} />
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, sm: 1 }}>
                <CheckboxForm
                  name='dataReviewed'
                  label='He revisado los datos agregados'
                />
                <Button
                  mt='12px'
                  py='8px'
                  px='16px'
                  type='submit'
                  colorScheme='teal'
                  isLoading={isSubmitting}
                >
                  Enviar
                </Button>
              </SimpleGrid>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddExportForm;
