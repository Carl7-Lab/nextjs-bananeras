import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import DateGrid from './DateGrid';
import { useCreateCuttingSheet } from '../../../hooks/export/cuttingSheet/createCuttingSheet';
import { ExportType } from '../../../types/export';
import { getWeekInfo } from '../../../utils/getWeekInfo';
import CheckboxForm from '../../ui/form/CheckboxForm';
import InputFieldDate from '../../ui/form/InputFieldDate';
import InputFieldQuantity from '../../ui/form/InputFieldQuantity';
import InputFieldSelector from '../../ui/form/InputFieldSelector';
import InputFieldText from '../../ui/form/InputFieldText';
import InputFieldTextArea from '../../ui/form/InputFieldTextArea';
import InputFieldSentInsecticides from '../ui/InputFieldSentInsecticides';
import InputFieldSentPesticides from '../ui/InputFieldSentPesticides';

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
  cluster: string;
  fileCode: string;
}

interface PackagingProps {
  bag: string;
  sachet: string;
  pad: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  fourthLine: string;
}

interface MaterialsProps {
  packagingPattern: string;
  pallets: string;
  plasticCorners: string;
  reinforcements: string;
  plasticStraps: string;
  staples: string;
  cardboardSheets: string;
  authorizedTransport: string;
  thermometer: string;
  generalObservations: string;
}

interface PesticideProps {
  pesticideId: number | '';
  quantity: number | '';
}

interface InsecticideProps {
  insecticideId: number | '';
  quantity: number | '';
}

interface FumigationProps {
  cosmoAgua: string;
  sb100: string;
  satisfar: string;
  mertec: string;
  eclipse: string;
  select101: string;
  citricAcid: string;
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

interface WeekCuttingProps {
  description: string;
  daysOfWeek: string[];
  boxesOfDay: number[];
  total: number;
}

interface CutSpecificationsProps {
  leaves: number | '';
  ageCutting: number | '';
  netWeight: number | '';
  grossWeight: number | '';
  caliberMin: number | '';
  caliberMax: number | '';
  fingerLength: string;
  saneos: string;
  cunas: string;
  labels: string;
}

interface ValuesProps {
  cuttingDate: Date | '';
  weekCutting: WeekCuttingProps;
  producer: ProducerProps;
  container: ContainerProps;
  cutSpecifications: CutSpecificationsProps;
  packaging: PackagingProps;
  materials: MaterialsProps;
  fumigation: FumigationProps;
  dataReviewed: boolean;
}

const initialValues: ValuesProps = {
  cuttingDate: '',
  weekCutting: {
    description: '',
    daysOfWeek: ['', '', '', '', '', '', ''],
    boxesOfDay: [0, 0, 0, 0, 0, 0, 0],
    total: 0,
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
    cluster: '',
    fileCode: '',
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
    cunas: '',
    labels: '',
  },
  packaging: {
    bag: '',
    sachet: '',
    pad: '',
    firstLine: '',
    secondLine: '',
    thirdLine: '',
    fourthLine: '',
  },
  materials: {
    packagingPattern: '',
    pallets: '',
    plasticCorners: '',
    reinforcements: '',
    plasticStraps: '',
    staples: '',
    cardboardSheets: '',
    authorizedTransport: '',
    thermometer: '',
    generalObservations: '',
  },
  fumigation: {
    cosmoAgua: '',
    sb100: '',
    satisfar: '',
    mertec: '',
    eclipse: '',
    select101: '',
    citricAcid: '',
  },
  dataReviewed: false,
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
    .oneOf(['NO', 'SI'], 'Valor no válido'),
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
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
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

  const { createCuttingSheet } = useCreateCuttingSheet();
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('cuttingSheetSelected: ', cuttingSheetSelected);
    if (cuttingSheetSelected) {
      setInitialValuesCuttingSheet((prevValues) => {
        const pesticidesSelected: PesticideProps[] =
          cuttingSheetSelected.boxBrand?.pesticideCocktail?.map(
            (pesticide) => ({
              pesticideId: pesticide.pesticide?.id!,
              quantity: pesticide.quantity!,
            })
          ) || [];

        const insecticidesSelected: InsecticideProps[] =
          cuttingSheetSelected.boxBrand?.insecticideCocktail?.map(
            (insecticide) => ({
              insecticideId: insecticide.insecticide?.id!,
              quantity: insecticide.quantity!,
            })
          ) || [];
        return {
          ...prevValues,
          cuttingDate: cuttingSheetSelected.cuttingDate || '',
          weekCutting: {
            description: cuttingSheetSelected.weekDescription || '',
            daysOfWeek: cuttingSheetSelected.weekDaysOfWeek || [
              '',
              '',
              '',
              '',
              '',
              '',
              '',
            ],
            boxesOfDay: cuttingSheetSelected.weekBoxesOfDay || [
              0, 0, 0, 0, 0, 0, 0,
            ],
            total: cuttingSheetSelected.weekTotal || 0,
          },
          producer: {
            businessName: cuttingSheetSelected.merchant?.businessName!,
            business: {
              ...prevValues.producer.business,
              name: cuttingSheetSelected.business?.name!,
              city: cuttingSheetSelected.business?.city!,
              codeMAGAP: cuttingSheetSelected.business?.codeMAGAP!,
              quality: cuttingSheetSelected.cuttingType?.quality!,
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
            containerPositioning:
              cuttingSheetSelected.cuttingType?.containerPositioning!,
            belowDeck: cuttingSheetSelected.cuttingType?.belowDeck!,
            highPallets:
              prevValues.container.shipmentType === 'GRANEL' ? 'N/A' : '',
            cluster:
              cuttingSheetSelected.boxBrand?.clusterBag?.name ||
              prevValues.container.cluster,
            fileCode: cuttingSheetSelected.shippingLineSeal || '',
            clusterQuantity: cuttingSheetSelected.cuttingType?.clusterDetail,
          },
          cutSpecifications: {
            ...prevValues.cutSpecifications,
            netWeight:
              cuttingSheetSelected.boxBrand?.netWeightBox ||
              prevValues.cutSpecifications.netWeight,
            grossWeight:
              cuttingSheetSelected.boxBrand?.grossWeightBox ||
              prevValues.cutSpecifications.grossWeight,
            labels:
              cuttingSheetSelected.boxBrand?.label?.name ||
              prevValues.cutSpecifications.labels,

            leaves: cuttingSheetSelected.cuttingType?.leavesAtHarvest || '',
            ageCutting: cuttingSheetSelected.cuttingType?.maxAgeAtCut || '',
            caliberMin: cuttingSheetSelected.cuttingType?.minCaliber || '',
            caliberMax: cuttingSheetSelected.cuttingType?.maxCaliber || '',
            fingerLength: cuttingSheetSelected.cuttingType?.fingerLength || '',
            saneos: cuttingSheetSelected.cuttingType?.saneos || '',
            cunas: cuttingSheetSelected.cuttingType?.cunas || '',
            labelsQuantity: cuttingSheetSelected.boxBrand?.labelQuantity || '',
          },
          packaging: {
            ...prevValues.packaging,
            bag: cuttingSheetSelected.boxBrand?.clusterBag?.name || '',
            sachet:
              cuttingSheetSelected.boxBrand?.sachet?.name ||
              prevValues.packaging.sachet,
            sachetQuantity: cuttingSheetSelected.boxBrand?.sachetQuantity,
            pad:
              cuttingSheetSelected.boxBrand?.padType ||
              prevValues.packaging.pad,
            padQuantity: cuttingSheetSelected.boxBrand?.padTypeQuantity,
            firstLine: cuttingSheetSelected.cuttingType?.firstLine || '',
            secondLine: cuttingSheetSelected.cuttingType?.secondLine || '',
            thirdLine: cuttingSheetSelected.cuttingType?.thirdLine || '',
            fourthLine: cuttingSheetSelected.cuttingType?.fourthLine || '',
          },
          materials: {
            ...prevValues.materials,
            packagingPattern:
              cuttingSheetSelected.cuttingType?.packagingPattern || '',
            pallets:
              cuttingSheetSelected.boxBrand?.palletsType ||
              prevValues.materials.pallets,
            palletsQuantity: cuttingSheetSelected.boxBrand?.palletsTypeQuantity,
            plasticCorners:
              cuttingSheetSelected.boxBrand?.cornerType ||
              prevValues.materials.plasticCorners,
            plasticCornersQuantity:
              cuttingSheetSelected.boxBrand?.cornerTypeQuantity,
            reinforcements:
              cuttingSheetSelected.boxBrand?.reinforcementType ||
              prevValues.materials.reinforcements,
            reinforcementsQuantity:
              cuttingSheetSelected.boxBrand?.reinforcementTypeQuantity,
            plasticStraps:
              cuttingSheetSelected.boxBrand?.stripping?.name ||
              prevValues.materials.plasticStraps,
            plasticStrapsQuantity:
              cuttingSheetSelected.boxBrand?.strippingQuantity,
            staples:
              cuttingSheetSelected.boxBrand?.staple?.name ||
              prevValues.materials.staples,
            staplesQuantity: cuttingSheetSelected.boxBrand?.stapleQuantity,
            cardboardSheets:
              cuttingSheetSelected.boxBrand?.cardboardType ||
              prevValues.materials.cardboardSheets,
            cardboardSheetsQuantity:
              cuttingSheetSelected.boxBrand?.cardboardTypeQuantity,
            thermometer:
              cuttingSheetSelected.boxBrand?.thermograph?.name ||
              prevValues.materials.thermometer,
            thermometerQuantity:
              cuttingSheetSelected.boxBrand?.thermographQuantity,
            authorizedTransport:
              cuttingSheetSelected.cuttingType?.authorizedTransport ||
              prevValues.materials.authorizedTransport,
            generalObservations:
              cuttingSheetSelected.cuttingType?.generalObservations ||
              prevValues.materials.generalObservations,
          },
          pesticideSent: pesticidesSelected,
          insecticideSent: insecticidesSelected,
          exportId: cuttingSheetSelected.id,
        };
      });
    }
  }, [cuttingSheetSelected]);

  // useEffect(() => {
  //   console.log('initialValuesCuttingSheet: ', initialValuesCuttingSheet);
  // }, [initialValuesCuttingSheet]);

  const handleSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    const { dataReviewed, ...cuttingSheetData } = values;
    console.log('values: ', values);
    console.log('cuttingSheetData: ', cuttingSheetData);
    createCuttingSheet(cuttingSheetData, {
      onError: (error: any) => {
        const { response } = error;
        const { data } = response;
        const { statusCode, message, error: errorTitle, model, prop } = data;

        toast({
          title: `Error ${statusCode}: ${errorTitle}`,
          description: `${message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        if (model === 'CuttingSheet' && prop) {
          formikHelpers.setFieldTouched(`${prop}`, true, false);
          formikHelpers.setFieldError(`${prop}`, message);
        }
      },
      onSuccess: () => {
        toast({
          title: 'Registro creado exitosamente',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        queryClient.invalidateQueries('cuttingSheets');
        formikHelpers.resetForm();
      },
    });
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
              <Box mx={'auto'} w={{ base: '98%', sm: '400px' }}>
                <InputFieldDate
                  name={'cuttingDate'}
                  label={'Fecha de Corte'}
                  flexDirection='row'
                />
              </Box>
              {values.cuttingDate && (
                <Box mx={'auto'} w={{ base: '98%', sm: '400px' }}>
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
                  placeholder='Calidad'
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

                <InputFieldText
                  name={'container.containerPositioning'}
                  label={'Posición del Contenedor: '}
                  isReadOnly
                  flexDirection='row'
                  alignItems='flex-end'
                />

                {/* <InputFieldSelector
                  name={'container.containerPositioning'}
                  label={'Posición del Contenedor: '}
                  placeholder='Seleccione la posición del contenedor'
                  flexDirection='row'
                  alignItems='flex-end'
                  options={[
                    { id: 'N/A', name: 'N/A' },
                    { id: 'CAMPO', name: 'CAMPO' },
                    { id: 'ACOPIO', name: 'ACOPIO' },
                  ]}
                /> */}

                <InputFieldText
                  name={'container.belowDeck'}
                  label={'Bajo Cubierta: '}
                  placeholder='Bajo cubierta'
                  isReadOnly
                  defaultValue={
                    values.container.containerPositioning === 'N/A' ||
                    values.container.containerPositioning === ''
                      ? 'SI'
                      : 'NO'
                  }
                  flexDirection='row'
                  alignItems='flex-end'
                />

                <InputFieldSelector
                  name={'container.highPallets'}
                  label={'Altura de Palets: '}
                  placeholder='Seleccione la altura de los palets'
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

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={2}>
                <InputFieldQuantity
                  name={'cutSpecifications.leaves'}
                  label={'Hojas a la cosecha: '}
                  placeholder='Numero minimo permitido al corte'
                  flexDirection={'row'}
                  min={4}
                  max={8}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.ageCutting'}
                  label={'Edad al corte: '}
                  placeholder='Edad maxima permitida al corte'
                  flexDirection={'row'}
                  min={10}
                  max={14}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.netWeight'}
                  label={'Peso neto: '}
                  placeholder='Solo el peso de la fruta'
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.grossWeight'}
                  label={'Peso Bruto: '}
                  placeholder='Peso de la fruta y empaque'
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.caliberMin'}
                  label={'Calibre Mínimo: '}
                  placeholder='Calibre minimo permitido'
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.caliberMax'}
                  label={'Calibre Máximo: '}
                  placeholder='Calibre maximo permitido'
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.fingerLength'}
                  label={'Largo dedo: '}
                  placeholder='Longitud de pulpa a pulpa'
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.saneos'}
                  label={'Saneos: '}
                  placeholder='Numero de saneos permitidos'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'cutSpecifications.cunas'}
                  label={'Cuñas: '}
                  placeholder='Cuñas permitidas'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'container.fileCode'}
                  label={'Código Fichero: '}
                  placeholder='Código de fichero'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'cutSpecifications.labels'}
                  label={'Etiquetas: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'cutSpecifications.labelsQuantity'}
                  label={'Detalle de Etiquetas: '}
                  placeholder='Especificaciones de la Etiqueta'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'container.cluster'}
                  label={'Cluster: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'container.clusterQuantity'}
                  label={'Detalle de Cluster: '}
                  placeholder='Especificaciones del Cluster'
                  flexDirection={'row'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                EMPAQUE Y MATERIALES
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={2}
                alignItems='end'
              >
                <InputFieldText
                  name={'packaging.bag'}
                  label={'Funda: '}
                  placeholder='Descripción y nombre de la funda'
                  flexDirection={'row'}
                />
                <Box />
                <InputFieldText
                  name={'packaging.sachet'}
                  label={'Sachet: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.sachetQuantity'}
                  label={'Detalle del Sachet: '}
                  placeholder='Especificaciones del Sachet'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.pad'}
                  label={'Pad: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.padQuantity'}
                  label={'Detalle del Pad: '}
                  placeholder='Especificaciones del Pad'
                  flexDirection={'row'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                QUÍMICOS Y PROCESO DE FUMIGACIÓN
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={1} spacing={2}>
                <InputFieldSentPesticides
                  name={'pesticideSent'}
                  pesticideCocktailSelected={
                    cuttingSheetSelected.boxBrand?.pesticideCocktail!
                  }
                  showNumberInput={false}
                />
                <InputFieldSentInsecticides
                  name={'insecticideSent'}
                  insecticideCocktailSelected={
                    cuttingSheetSelected.boxBrand?.insecticideCocktail!
                  }
                  showNumberInput={false}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                DETALLES DEL EMPAQUE
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={2}>
                <InputFieldText
                  name={'packaging.firstLine'}
                  label={'Primera línea: '}
                  placeholder='Primera línea'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.secondLine'}
                  label={'Segunda línea: '}
                  placeholder='Segunda línea'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.thirdLine'}
                  label={'Tercera línea: '}
                  placeholder='Tercera línea'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.fourthLine'}
                  label={'Cuarta línea: '}
                  placeholder='Cuarta línea'
                  flexDirection={'row'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                NOTAS Y REQUISITOS ADICIONALES
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={2}>
                <InputFieldText
                  name={'materials.packagingPattern'}
                  label={'Patrón de empaque: '}
                  flexDirection={'row'}
                />
                {/* <InputFieldSelector
                  name={'materials.packagingPattern'}
                  label={'Patrón de empaque: '}
                  placeholder='Seleccione el patrón de empaque'
                  flexDirection='row'
                  alignItems='flex-end'
                  options={[
                    { id: '3_lineas', name: '3 Líneas, 15/20 Clusters ' },
                    { id: '4_lineas', name: '4 Líneas, 12/14 Clusters' },
                    { id: 'ambos', name: 'Ambos' },
                    { id: 'jumbo', name: 'Jumbo' },
                    // {
                    //   id: 'tres_lineas_opcional',
                    //   name: 'Tres líneas opcional',
                    // },
                  ]}
                /> */}
                <Box />
                <InputFieldText
                  name={'materials.pallets'}
                  label={'Pallets: '}
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.palletsQuantity'}
                  label={'Detalle de los Pallets: '}
                  placeholder='Especificaciones de los Pallets'
                  flexDirection={'row'}
                />

                <InputFieldText
                  name={'materials.plasticCorners'}
                  label={'Esquineros Plásticos: '}
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.plasticCornersQuantity'}
                  label={'Detalle de los Esquineros Plásticos: '}
                  placeholder='Especificaciones de los Esquineros Plásticos'
                  flexDirection={'row'}
                />

                <InputFieldText
                  name={'materials.reinforcements'}
                  label={'Refuerzos: '}
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.reinforcementsQuantity'}
                  label={'Detalle de los Refuerzos: '}
                  placeholder='Especificaciones de los Refuerzos'
                  flexDirection={'row'}
                />

                <InputFieldText
                  name={'materials.plasticStraps'}
                  label={'Zuncho Plásticos: '}
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.plasticStrapsQuantity'}
                  label={'Detalle del Zuncho Plásticos: '}
                  placeholder='Especificaciones del Zuncho Plásticos'
                  flexDirection={'row'}
                />

                <InputFieldText
                  name={'materials.staples'}
                  label={'Grapas: '}
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.staplesQuantity'}
                  label={'Detalle de las Grapas: '}
                  placeholder='Especificaciones de las Grapas'
                  flexDirection={'row'}
                />

                <InputFieldText
                  name={'materials.cardboardSheets'}
                  label={'Láminas de cartón: '}
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.cardboardSheetsQuantity'}
                  label={'Detalle de las Láminas de cartón: '}
                  placeholder='Especificaciones de las Láminas de cartón'
                  flexDirection={'row'}
                />

                <InputFieldText
                  name={'materials.thermometer'}
                  label={'Termógrafo: '}
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.thermometerQuantity'}
                  label={'Detalle del Termógrafo: '}
                  placeholder='Especificaciones del Termógrafo'
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.authorizedTransport'}
                  label={'Transportes Autorizados: '}
                  placeholder='Transportes Autorizados'
                  flexDirection={'row'}
                />
                <Box />
                <InputFieldTextArea
                  name={'materials.generalObservations'}
                  label={'Observaciones Generales: '}
                  placeholder='Agrega el detalle de la hoja de corte'
                />
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
                  onClick={() => {
                    console.log('values: ', values);
                    console.log('errors: ', errors);
                  }}
                >
                  Enviar
                </Button>
              </SimpleGrid>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CuttingSheetForm;
