/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import DateGrid from './cutting-sheet/DateGrid';
import SelectCuttingType from './cutting-type/SelectCuttingType';
import { useCreateExport } from '../../hooks/export/createExport';
import { getWeekInfo } from '../../utils/getWeekInfo';
import SelectBoxBrand from '../box-brands/SelectBoxBrand';
import SelectBusiness from '../business/SelectBusiness';
import SelectClient from '../client/SelectClient';
import SelectHarbor from '../harbor/SelectHarbor';
import SelectProducer from '../producer/SelectProducer';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldDate from '../ui/form/InputFieldDate';
import InputFieldText from '../ui/form/InputFieldText';

interface WeekCuttingProps {
  description: string;
  daysOfWeek: string[];
  boxesOfDay: number[];
  total: number;
}

interface ValuesProps {
  cuttingDate: Date | '';
  weekCutting: WeekCuttingProps;
  boxBrandId: number | '';
  boxQuantity: number | '';
  merchantId: number | '';
  businessId: number | '';
  // harborId: number | '';
  cuttingTypeId: number | '';
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
  cuttingDate: '',
  weekCutting: {
    description: '',
    daysOfWeek: ['', '', '', '', '', '', ''],
    boxesOfDay: [0, 0, 0, 0, 0, 0, 0],
    total: 0,
  },
  // harborId: '',
  cuttingTypeId: '',
  departureHarborId: '',
  destinationHarborId: '',
  clientId: '',
  shipSteam: '',
  shippingLineSeal: '',
  extraSeal: '',
  dataReviewed: false,
};

const weekCuttingSchema = Yup.object().shape({
  description: Yup.string().required('La descripción es requerida'),
  daysOfWeek: Yup.array()
    .of(Yup.string().required('La fecha es requerida'))
    .length(7, 'Debe contener exactamente 7 elementos')
    .required('Los días de la semana son requeridos'),
  boxesOfDay: Yup.array()
    .of(Yup.number().required('La cantidad de cajas es requerida'))
    .length(7, 'Debe contener exactamente 7 elementos')
    .required('La cantidad de cajas por día es requerida'),
});

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
  cuttingDate: Yup.date().required('Requerido'),
  weekCutting: weekCuttingSchema.test(
    'boxesOfDay-sum',
    'La sumatoria de cajas por día debe ser igual al total de cajas',
    function (value) {
      if (!value) return false;
      const { boxesOfDay } = value;
      const boxQuantity = this.parent.boxQuantity;
      const totalBoxes = boxesOfDay.reduce((acc, curr) => acc + curr, 0);
      return totalBoxes === boxQuantity;
    }
  ),
  cuttingTypeId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
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

const AddExportForm = (): React.JSX.Element => {
  const { createExport, isLoading } = useCreateExport();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ): Promise<void> => {
    const {
      weekCutting,
      cuttingDate,
      boxQuantity,
      dataReviewed,
      ...restExportData
    } = values;

    const exportData = {
      ...restExportData,
      cuttingDate,
      weekDescription: weekCutting.description,
      weekDaysOfWeek: weekCutting.daysOfWeek,
      weekBoxesOfDay: weekCutting.boxesOfDay,
      weekTotal: Number(boxQuantity),
      boxQuantity: Number(boxQuantity),
    };

    createExport(exportData, {
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

        if (model && prop) {
          formikHelpers.setFieldError(`${prop}`, message);
        }
      },
      onSuccess: () => {
        toast({
          title: 'Exportación creada con éxito',
          description: 'La exportación ha sido registrada correctamente.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        queryClient.invalidateQueries('exports');
        queryClient.invalidateQueries('exportsPending');
        queryClient.invalidateQueries('cuttingSheets');
        queryClient.invalidateQueries('cuttingSheetsPending');

        formikHelpers.resetForm();
        router.push('/dashboard/export/search');
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, errors }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
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
                Marca de Caja
              </Heading>
              <Divider mb={'16px'} />

              <SelectBoxBrand name={'boxBrandId'} name2={'boxQuantity'} />
              <Heading fontSize={'2xl'} p={'12px'}>
                Fecha de Corte
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldDate
                  name={'cuttingDate'}
                  label={'Fecha de Corte'}
                  flexDirection='row'
                />
                {values.cuttingDate && (
                  <Box w={{ base: '98%' }}>
                    <InputFieldText
                      name={'weekCutting.description'}
                      isReadOnly
                      defaultValue={
                        getWeekInfo({ date: values.cuttingDate }).week
                      }
                    />
                  </Box>
                )}
              </SimpleGrid>
              {values.cuttingDate && values.weekCutting && (
                <DateGrid
                  nameWeek={'weekCutting.daysOfWeek'}
                  nameBoxes={'weekCutting.boxesOfDay'}
                  boxQuantity={Number(values.boxQuantity)}
                  dateSelected={values.cuttingDate}
                  startDate={
                    getWeekInfo({ date: values.cuttingDate }).startDate
                  }
                />
              )}
              {!errors.weekCutting?.description &&
                !!values.cuttingDate &&
                !!values.weekCutting &&
                !!errors.weekCutting && (
                  <Text color={'#E53E3E'} fontSize={'14px'}>
                    {errors.weekCutting ? (errors.weekCutting as string) : ''}
                  </Text>
                )}

              <Heading fontSize={'2xl'} p={'12px'}>
                Tipo de Corte
              </Heading>
              <Divider mb={'16px'} />
              <SelectCuttingType name={'cuttingTypeId'} />

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
                  isLoading={isLoading}
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
