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
import { useCreateBoxBrand } from '@/hooks/box-brand/createBoxBrand';
import InputFieldBrandSelect from './InputFieldBrandSelect';
import InputFieldBooleanSelector from '../ui/form/InputFieldBooleanSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  brandId: number | '';
  name: string;
  brandCode: string;
  materialBottomType: string;
  materialLidType: string;
  materialLabelType: string;
  materialCoverType: string;
  materialCardboardType: string;
  materialBandType: string;
  materialCornerType: string;
  hasPads: boolean | '';
  hasSponges: boolean | '';
}

const initialValues: ValuesProps = {
  brandId: '',
  name: '',
  brandCode: '',
  materialBottomType: '',
  materialLidType: '',
  materialLabelType: '',
  materialCoverType: '',
  materialCardboardType: '',
  materialBandType: '',
  materialCornerType: '',
  hasPads: '',
  hasSponges: '',
};

const validationSchema = Yup.object({
  brandId: Yup.number()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  brandCode: Yup.string().required('Required'),
  materialBottomType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  materialLidType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  materialLabelType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  materialCoverType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  materialCardboardType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  materialBandType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  materialCornerType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  hasPads: Yup.boolean().required('Required'),
  hasSponges: Yup.boolean().required('Required'),
});

export default function AddBoxBrandsForm() {
  const toast = useToast();
  const { createBoxBrand } = useCreateBoxBrand();
  const queryClient = useQueryClient();

  const addBoxBrands = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const { brandId, ...rest } = values;

    const sendValues = {
      ...rest,
      brand: {
        id: Number(values.brandId),
      },
    };

    createBoxBrand(
      {
        ...sendValues,
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
            title: 'Marca de caja creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('brands');
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
        onSubmit={addBoxBrands}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregando Marca de Cajas
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldBrandSelect
                  name={'brandId'}
                  label={'Marca'}
                  placeholder={'Seleccione la marca'}
                />
                <InputFieldText name={'name'} label={'Nombre'} />
                <InputFieldText name={'brandCode'} label={'Código'} />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'materialBottomType'}
                  label={'Tipo de fondo'}
                />
                <InputFieldText
                  name={'materialLidType'}
                  label={'Tipo de tapa'}
                />
                <InputFieldText
                  name={'materialLabelType'}
                  label={'Tipo de etiqueta'}
                />
                <InputFieldText
                  name={'materialCoverType'}
                  label={'Tipo de funda'}
                />
                <InputFieldText
                  name={'materialCardboardType'}
                  label={'Tipo de cartulina'}
                />
                <InputFieldText
                  name={'materialBandType'}
                  label={'Tipo de liga'}
                />
                <InputFieldText
                  name={'materialCornerType'}
                  label={'Tipo de esquinero'}
                />
              </SimpleGrid>

              <Divider my={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldBooleanSelector
                  name={'hasPads'}
                  label={'Tiene pads?'}
                />
                <InputFieldBooleanSelector
                  name={'hasSponges'}
                  label={'Tiene esponjas?'}
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
}
