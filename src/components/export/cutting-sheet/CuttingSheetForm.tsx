import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import DateGrid from './DateGrid';
import { ExportType } from '../../../types/export';
import { getWeekInfo } from '../../../utils/getWeekInfo';
import InputFieldDate from '../../ui/form/InputFieldDate';
import InputFieldQuantity from '../../ui/form/InputFieldQuantity';
import InputFieldSelector from '../../ui/form/InputFieldSelector';
import InputFieldText from '../../ui/form/InputFieldText';

interface ContainerProps {
  boxBrand: string;
  shipmentType: string;
  boxType: string;
  steam: string;
  harborDeparture: string;
  boxQuantity: number | '';
  containerPositioning: string;
  belowDeck: string;
  highPallets: string;
}

interface BusinessProps {
  name: string;
  quality: string;
  city: string;
  codeMAGAP: string;
}

interface ProducerProps {
  businessName: string | '';
  business: BusinessProps;
}

interface weekCuttingProps {
  description: string;
  daysOfWeek: string[];
  boxesOfDay: number[];
}

interface cutSpecificationsProps {
  leaves: number | '';
  ageCutting: number | '';
  netWeight: number | '';
  grossWeight: number | '';
  caliberMin: number | '';
  caliberMax: number | '';
  fingerLength: number | '';
  saneos: number | '';
}

interface ValuesProps {
  cuttingDate: Date | '';
  weekCutting: weekCuttingProps;
  producer: ProducerProps;
  container: ContainerProps;
  cutSpecifications: cutSpecificationsProps;
}

const initialValues: ValuesProps = {
  cuttingDate: '',
  weekCutting: {
    description: '',
    daysOfWeek: ['', '', '', '', '', '', ''],
    boxesOfDay: [0, 0, 0, 0, 0, 0, 0],
  },
  producer: {
    businessName: '',
    business: {
      name: '',
      quality: '',
      city: '',
      codeMAGAP: '',
    },
  },
  container: {
    boxBrand: '',
    shipmentType: '',
    boxType: '',
    steam: '',
    harborDeparture: '',
    boxQuantity: '',
    containerPositioning: '',
    belowDeck: '',
    highPallets: '',
  },
  cutSpecifications: {
    leaves: '',
    ageCutting: '',
    netWeight: '',
    grossWeight: '',
    caliberMin: '',
    caliberMax: '',
    fingerLength: '',
    saneos: '',
  },
};

const businessSchema = Yup.object().shape({
  name: Yup.string().required('El nombre del negocio es requerido'),
  quality: Yup.string().required('La calidad es requerida'),
  city: Yup.string().required('La ciudad es requerida'),
  codeMAGAP: Yup.string().required('El código MAGAP es requerido'),
});

const producerSchema = Yup.object().shape({
  businessName: Yup.string().required('El nombre del productor es requerido'),
  business: businessSchema.required('La información del negocio es requerida'),
});

const containerSchema = Yup.object().shape({
  boxBrand: Yup.string().required('La marca de la caja es requerida'),
  shipmentType: Yup.string()
    .required('El tipo de envío es requerido')
    .oneOf(['PALETIZADO', 'GRANEL'], 'Valor no válido'),
  boxType: Yup.string().required('El tipo de caja es requerido'),
  steam: Yup.string().required('El vapor es requerido'),
  harborDeparture: Yup.string().required('El puerto de salida es requerido'),
  boxQuantity: Yup.number()
    .required('La cantidad de cajas es requerida')
    .positive('La cantidad de cajas debe ser un número positivo')
    .integer('La cantidad de cajas debe ser un número entero'),
  containerPositioning: Yup.string()
    .required('La posición del contenedor es requerida')
    .oneOf(['CAMPO', 'ACOPIO', 'N/A'], 'Valor no válido'),
  belowDeck: Yup.string()
    .required('Debajo de la cubierta es requerido')
    .oneOf(['N/A', '✅'], 'Valor no válido'),
  highPallets: Yup.string()
    .required('Palets altos es requerido')
    .oneOf(['PALETS 9 DE ALTO', 'PALETS 8 DE ALTO', 'N/A'], 'Valor no válido'),
});

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

const cutSpecificationsSchema = Yup.object().shape({
  leaves: Yup.number()
    .required('Requerido')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero')
    .min(4, 'La cantida mínima debe ser 4')
    .max(8, 'La cantida máxima debe ser 8'),
  ageCutting: Yup.number()
    .required('Requerido')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero')
    .min(10, 'La cantida mínima debe ser 10')
    .max(14, 'La cantida máxima debe ser 14'),
  netWeight: Yup.number().positive('Debe ser un número positivo'),
  // netWeight: number | '';
  // grossWeight: number | '';
  // caliberMin: number | '';
  // caliberMax: number | '';
  // fingerLength: number | '';
  // saneos: number | '';
});

const validationSchema = Yup.object({
  cuttingDate: Yup.date().required('Requerido'),
  weekCutting: weekCuttingSchema
    .required('La información de la semana de corte es requerida')
    .test(
      'boxesOfDay-sum',
      'La sumatoria de cajas por día debe ser igual a la cantidad de cajas',
      function (value) {
        const { boxesOfDay, daysOfWeek, description } = value;
        const { container } = this.parent;
        if (!!container && !!daysOfWeek && !!description) {
          const { boxQuantity } = container;
          const sumBoxes = boxesOfDay.reduce((sum, value) => sum + value, 0);
          return sumBoxes === boxQuantity;
        }
        return true;
      }
    ),
  producer: producerSchema.required(
    'La información del productor es requerida'
  ),
  container: containerSchema.required(
    'La información del contenedor es requerida'
  ),
  cutSpecifications: cutSpecificationsSchema.required(
    'La información de la especificaciones de corte es requerida'
  ),
});

const CuttingSheetForm = ({
  cuttingSheetSelected,
  pathname,
}: {
  cuttingSheetSelected: Partial<ExportType>;
  pathname: string;
}) => {
  const [initialValuesCuttingSheet, setInitialValuesCuttingSheet] =
    useState<ValuesProps>(initialValues);

  useEffect(() => {
    console.log('cuttingSheetSelected: ', cuttingSheetSelected);
    if (cuttingSheetSelected) {
      setInitialValuesCuttingSheet((prevValues) => ({
        ...prevValues,
        producer: {
          businessName: cuttingSheetSelected.merchant?.businessName!,
          business: {
            ...prevValues.producer.business,
            name: cuttingSheetSelected.business?.name!,
            city: cuttingSheetSelected.business?.city!,
            codeMAGAP: cuttingSheetSelected.business?.codeMAGAP!,
          },
        },
        container: {
          ...prevValues.container,
          boxBrand: cuttingSheetSelected.boxBrand?.name!,
          shipmentType:
            cuttingSheetSelected.boxBrand?.palletsType ||
            cuttingSheetSelected.boxBrand?.miniPalletsType
              ? 'PALETIZADO'
              : 'GRANEL',
          boxType: cuttingSheetSelected.boxBrand?.brand?.name!,
          steam: cuttingSheetSelected.shipSteam!,
          harborDeparture: cuttingSheetSelected.harborDeparture?.name!,
          boxQuantity: cuttingSheetSelected.boxQuantity!,
          belowDeck: '✅',
          highPallets:
            prevValues.container.shipmentType === 'GRANEL' ? 'N/A' : '',
        },
        cutSpecifications: {
          ...prevValues.cutSpecifications,
          netWeight: cuttingSheetSelected.boxBrand?.netWeightBox!,
        },
      }));
    }
  }, [cuttingSheetSelected]);

  useEffect(() => {
    console.log('initialValuesCuttingSheet: ', initialValuesCuttingSheet);
  }, [initialValuesCuttingSheet]);

  const handleSubmit = async (values: ValuesProps) => {
    console.log('Cutting Form Values:', values);
    return;
  };

  return (
    <Formik
      initialValues={initialValuesCuttingSheet}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values, errors }) => {
        return (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Box mx={'auto'} w={{ base: '98%', sm: '450px' }}>
                <InputFieldDate
                  name={'cuttingDate'}
                  label={'Fecha de Corte'}
                  flexDirection='row'
                />
              </Box>
              {values.cuttingDate && (
                <Box mx={'auto'} w={{ base: '98%', sm: '380px' }}>
                  <InputFieldText
                    name={'weekCutting.description'}
                    isReadOnly
                    defaultValue={
                      getWeekInfo({ date: values.cuttingDate }).week
                    }
                  />
                </Box>
              )}
              <Heading fontSize={'2xl'} p={'12px'}>
                DATOS DEL PRODUCTOR Y DESTINO
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={2}>
                <InputFieldText
                  name={'producer.businessName'}
                  label={'Productor: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'producer.business.name'}
                  label={'Hacienda: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'producer.business.quality'}
                  label={'Calidad: '}
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'producer.business.city'}
                  label={'Ciudad: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'producer.business.codeMAGAP'}
                  label={'Código MAG: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                DATOS Y DIAS DE CORTE Y CONTENEDOR
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={2}>
                <InputFieldText
                  name={'container.boxBrand'}
                  label={'Marca: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'container.shipmentType'}
                  label={'Tipo de embarque: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'container.boxType'}
                  label={'Tipo de Caja: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'container.steam'}
                  label={'Vapor: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldText
                  name={'container.harborDeparture'}
                  label={'Puerto de Ingreso: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <Box></Box>

                <InputFieldText
                  name={'container.boxQuantity'}
                  label={'Cajas en Contenedor: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldSelector
                  name={'container.containerPositioning'}
                  label={'Posicionamiento Contenedor: '}
                  flexDirection='row'
                  alignItems='flex-end'
                  options={[
                    { id: 'N/A', name: 'N/A' },
                    { id: 'CAMPO', name: 'CAMPO' },
                    { id: 'ACOPIO', name: 'ACOPIO' },
                  ]}
                />

                <InputFieldText
                  name={'container.belowDeck'}
                  label={'Bajo Cubierta: '}
                  isReadOnly
                  defaultValue={
                    values.container.containerPositioning === 'N/A' ||
                    values.container.containerPositioning === ''
                      ? '✅'
                      : 'N/A'
                  }
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldSelector
                  name={'container.highPallets'}
                  label={'Altura de Palets: '}
                  flexDirection='row'
                  alignItems='flex-end'
                  isDisabled={values.container.shipmentType === 'GRANEL'}
                  options={[
                    { id: 'PALETS 8 DE ALTO', name: 'PALETS 8 DE ALTO' },
                    { id: 'PALETS 9 DE ALTO', name: 'PALETS 9 DE ALTO' },
                  ]}
                />
              </SimpleGrid>

              {values.cuttingDate && values.weekCutting && (
                <DateGrid
                  nameWeek={'weekCutting.daysOfWeek'}
                  nameBoxes={'weekCutting.boxesOfDay'}
                  boxQuantity={Number(values.container.boxQuantity)}
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
                ESPECIFICACIONES DEL CORTE
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={2}>
                <InputFieldQuantity
                  name={'cutSpecifications.leaves'}
                  label={'Hojas a la cosecha: '}
                  flexDirection={'row'}
                  min={4}
                  max={8}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.ageCutting'}
                  label={'Edad al corte: '}
                  flexDirection={'row'}
                  min={10}
                  max={14}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.netWeight'}
                  label={'Peso neto: '}
                  flexDirection={'row'}
                />
              </SimpleGrid>

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                isLoading={isSubmitting}
                onClick={() => {
                  console.log('values: ', values);
                  console.log('errors: ', errors);
                }}
              >
                Enviar
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CuttingSheetForm;
