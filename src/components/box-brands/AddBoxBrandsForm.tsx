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
import InputFieldQuatity from '../ui/form/InputFieldQuatity';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  brandId: number | '';
  name: string;
  brandCode: string;
  boxQuantity: number | '';
  netWeightBox: number | '';
  grossWeightBox: number | '';
  isOrganic: boolean | '';

  bottomType: string;
  // bottomTypeQuantity: number | '';
  lidType: string;
  // lidTypeQuantity: number | '';
  coverType: string;
  // coverTypeQuantity: number | '';
  cardboardType: string;
  // cardboardTypeQuantity: number | '';
  labelId: string;
  labelIdQuantity: number | '';
  bandId: string;
  bandIdQuantity: number | '';

  cornerType: string;
  cornerTypeQuantity: number | '';
  palletType: string;
  palletTypeQuantity: number | '';
}

const initialValues: ValuesProps = {
  brandId: '',
  name: '',
  brandCode: '',
  boxQuantity: '',
  netWeightBox: '',
  grossWeightBox: '',
  isOrganic: '',

  bottomType: '',
  // bottomTypeQuantity: '',
  lidType: '',
  // lidTypeQuantity: '',
  coverType: '',
  // coverTypeQuantity: '',
  cardboardType: '',
  // cardboardTypeQuantity: '',
  labelId: '',
  labelIdQuantity: '',
  bandId: '',
  bandIdQuantity: '',

  cornerType: '',
  cornerTypeQuantity: '',
  palletType: '',
  palletTypeQuantity: '',
};

const validationSchema = Yup.object({
  brandId: Yup.number()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  brandCode: Yup.string().required('Required'),
  boxQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
  netWeightBox: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(100, 'Must be lower than 100 pounds')
    .required('Required'),
  grossWeightBox: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  isOrganic: Yup.boolean().required('Required'),

  bottomType: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  // bottomTypeQuantity: Yup.number()
  //   .moreThan(0, 'Must be greater than 0')
  //   .required('Required'),
  lidType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  // lidTypeQuantity: Yup.number()
  //   .moreThan(0, 'Must be greater than 0')
  //   .required('Required'),
  coverType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  // coverTypeQuantity: Yup.number()
  //   .moreThan(0, 'Must be greater than 0')
  //   .required('Required'),
  cardboardType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  // cardboardTypeQuantity: Yup.number()
  //   .moreThan(0, 'Must be greater than 0')
  //   .required('Required'),
  labelId: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  labelIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  bandId: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  bandIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),

  cornerType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  cornerTypeQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  palletType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  palletTypeQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
});

export default function AddBoxBrandsForm() {
  const toast = useToast();
  const { createBoxBrand } = useCreateBoxBrand();
  const queryClient = useQueryClient();

  const addBoxBrands = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('AddBoxBrandsForm values: ', values);
    // const { brandId, ...rest } = values;

    // const sendValues = {
    //   ...rest,
    //   brand: {
    //     id: Number(values.brandId),
    //   },
    // };

    // createBoxBrand(
    //   {
    //     ...sendValues,
    //   },
    //   {
    //     onError: (error) => {
    //       toast({
    //         title: 'Error.',
    //         description: `${error.message}`,
    //         status: 'error',
    //         duration: 5000,
    //         isClosable: true,
    //       });
    //     },
    //     onSuccess: () => {
    //       toast({
    //         title: 'Marca de caja creada',
    //         status: 'success',
    //         duration: 5000,
    //         isClosable: true,
    //       });

    //       queryClient.invalidateQueries('brands');
    //       actions.resetForm();
    //     },
    //   }
    // );

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addBoxBrands}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
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
                <InputFieldText
                  name={'boxQuantity'}
                  label={'Número de cajas/Contenedor'}
                />

                <InputFieldText
                  name={'netWeightBox'}
                  label={'Peso Neto de Caja'}
                />
                <InputFieldText
                  name={'grossWeightBox'}
                  label={'Peso Bruto de Caja'}
                />
                <InputFieldBooleanSelector
                  name={'isOrganic'}
                  label={'Organico'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiaes por caja
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                {[
                  {
                    name1: 'bottomType',
                    label1: 'Fondo',
                    name2: 'boxQuantity',
                    label2: 'Cantidad',
                  },
                  {
                    name1: 'lidType',
                    label1: 'Tapa',
                    name2: 'boxQuantity',
                    label2: 'Cantidad',
                  },
                  {
                    name1: 'coverType',
                    label1: 'Funda',
                    name2: 'boxQuantity',
                    label2: 'Cantidad',
                  },
                  {
                    name1: 'cardboardType',
                    label1: 'Cartulina',
                    name2: 'boxQuantity',
                    label2: 'Cantidad',
                  },
                ].map(({ name1, label1, name2, label2 }, index) => (
                  <Flex key={index} gap={2}>
                    <InputFieldText name={name1} label={label1} />
                    <InputFieldQuatity
                      isReadOnly={true}
                      name={name2}
                      label={label2}
                    />
                  </Flex>
                ))}
                {[
                  {
                    name1: 'labelId',
                    label1: 'Etiqueta',
                    name2: 'labelIdQuantity',
                    label2: 'Cantidad',
                  },
                  {
                    name1: 'bandId',
                    label1: 'Liga',
                    name2: 'bandIdQuantity',
                    label2: 'Cantidad',
                  },
                ].map(({ name1, label1, name2, label2 }, index) => (
                  <Flex key={index} gap={2}>
                    <InputFieldText name={name1} label={label1} />
                    <InputFieldQuatity name={name2} label={label2} />
                  </Flex>
                ))}
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiaes post cosecha
              </Heading>
              <Divider mb={'16px'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiaes por pallet
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                {[
                  {
                    name1: 'cornerType',
                    label1: 'Esquinero',
                    name2: 'cornerTypeQuantity',
                    label2: 'Cantidad',
                  },
                  {
                    name1: 'palletType',
                    label1: 'Tipo de Pallet',
                    name2: 'palletTypeQuantity',
                    label2: 'Cantidad',
                  },
                ].map(({ name1, label1, name2, label2 }, index) => (
                  <Flex key={index} gap={2}>
                    <InputFieldText name={name1} label={label1} />
                    <InputFieldQuatity name={name2} label={label2} />
                  </Flex>
                ))}
              </SimpleGrid>

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                variant={'purple'}
                isLoading={isSubmitting}
                onClick={() =>
                  console.log('AddBoxBrandsForm onClick values: ', values)
                }
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
