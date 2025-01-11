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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import DateGrid from './DateGrid';
import { useCreateCuttingSheet } from '../../../hooks/export/cuttingSheet/createCuttingSheet';
import { CuttingSheetType } from '../../../types/cuttingSheet';
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
  dataReviewed: boolean;
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
  dataReviewed: false,
};

const containerSchema = Yup.object().shape({
  containerPositioning: Yup.string()
    .required('La posición del contenedor es requerida')
    .oneOf(['CAMPO', 'ACOPIO', 'N/A'], 'Valor no válido'),
  belowDeck: Yup.string()
    .required('Debajo de la cubierta es requerido')
    .oneOf(['NO', 'SI'], 'Valor no válido'),
  highPallets: Yup.string()
    .required('Palets altos es requerido')
    .oneOf(
      ['PALETS 8 DE ALTO', 'PALETS 9 DE ALTO', 'PALETS 10 DE ALTO', 'N/A'],
      'Valor no válido'
    ),
});

const validationSchema = Yup.object({
  container: containerSchema.required(
    'La información del contenedor es requerida'
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
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!cuttingSheetSelected) return;

    setInitialValuesCuttingSheet((prevValues) => {
      return {
        ...prevValues,
        exportId: cuttingSheetSelected.id,
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
        },
        producer: {
          businessName: cuttingSheetSelected.merchant?.businessName || '',
          business: {
            ...prevValues.producer.business,
            name: cuttingSheetSelected.business?.name || '',
            city: cuttingSheetSelected.business?.city || '',
            codeMAGAP: cuttingSheetSelected.business?.codeMAGAP || '',
            quality: cuttingSheetSelected.cuttingType?.quality || '',
          },
        },
        container: {
          ...prevValues.container,
          boxQuantity: cuttingSheetSelected.boxQuantity || 0,
          boxBrand: cuttingSheetSelected.boxBrand?.name || '',
          shipmentType:
            cuttingSheetSelected.boxBrand?.palletsType ||
            cuttingSheetSelected.boxBrand?.miniPalletsType
              ? 'PALETIZADO'
              : 'GRANEL',
          boxType: cuttingSheetSelected.boxBrand?.brand?.name || '',
          steam: cuttingSheetSelected.shipSteam || '',
          harborDeparture: cuttingSheetSelected.harborDeparture?.name || '',
          highPallets:
            prevValues.container.shipmentType === 'GRANEL' ? 'N/A' : '',
          cluster: cuttingSheetSelected.boxBrand?.clusterBag?.name || '',
          fileCode: cuttingSheetSelected.shippingLineSeal || '',
          clusterQuantity:
            cuttingSheetSelected.boxBrand?.clusterBagQuantity || '',
          containerPositioning: prevValues.container.containerPositioning,
          belowDeck: prevValues.container.belowDeck,
        },
        cutSpecifications: {
          ...prevValues.cutSpecifications,
          netWeight: cuttingSheetSelected.boxBrand?.netWeightBox || '',
          grossWeight: cuttingSheetSelected.boxBrand?.grossWeightBox || '',
          labels: cuttingSheetSelected.boxBrand?.label?.name || '',
          leaves: cuttingSheetSelected.cuttingType?.leavesAtHarvest || '',
          ageCutting: cuttingSheetSelected.cuttingType?.maxAgeAtCut || '',
          caliberMin: cuttingSheetSelected.cuttingType?.minCaliber || '',
          caliberMax: cuttingSheetSelected.cuttingType?.maxCaliber || '',
          fingerLength: cuttingSheetSelected.cuttingType?.fingerLength || '',
          saneos: cuttingSheetSelected.cuttingType?.saneos || '',
          cunas: cuttingSheetSelected.cuttingType?.cunas || '',
          labelsQuantity: cuttingSheetSelected.boxBrand?.labelQuantity || '',
          clusterDetail: cuttingSheetSelected.cuttingType?.clusterDetail || '',
          labelDetail: cuttingSheetSelected.cuttingType?.labelDetail || '',
        },
        packaging: {
          ...prevValues.packaging,
          bag: cuttingSheetSelected.boxBrand?.clusterBag?.name || '',
          sachet: cuttingSheetSelected.boxBrand?.sachet?.name || '',
          sachetQuantity: cuttingSheetSelected.boxBrand?.sachetQuantity || 0,
          pad: cuttingSheetSelected.boxBrand?.padType || '',
          padQuantity: cuttingSheetSelected.boxBrand?.padTypeQuantity || 0,
          firstLine: cuttingSheetSelected.cuttingType?.firstLine || '',
          secondLine: cuttingSheetSelected.cuttingType?.secondLine || '',
          thirdLine: cuttingSheetSelected.cuttingType?.thirdLine || '',
          fourthLine: cuttingSheetSelected.cuttingType?.fourthLine || '',
        },
        materials: {
          ...prevValues.materials,
          packagingPattern:
            cuttingSheetSelected.cuttingType?.packagingPattern || '',
          pallets: cuttingSheetSelected.boxBrand?.palletsType || '',
          palletsQuantity:
            cuttingSheetSelected.boxBrand?.palletsTypeQuantity || 0,
          palletsDetail: cuttingSheetSelected.cuttingType?.palletDetail || '',
          plasticCorners: cuttingSheetSelected.boxBrand?.cornerType || '',
          plasticCornersQuantity:
            cuttingSheetSelected.boxBrand?.cornerTypeQuantity || 0,
          plasticCornersDetail:
            cuttingSheetSelected.cuttingType?.cornerProtectorsDetail || '',
          reinforcements:
            cuttingSheetSelected.boxBrand?.reinforcementType || '',
          reinforcementsQuantity:
            cuttingSheetSelected.boxBrand?.reinforcementTypeQuantity || 0,
          reinforcementsDetail:
            cuttingSheetSelected.cuttingType?.reinforcementsDetail || '',
          plasticStraps: cuttingSheetSelected.boxBrand?.stripping?.name || '',
          plasticStrapsQuantity:
            cuttingSheetSelected.boxBrand?.strippingQuantity || 0,
          plasticStrapsDetail:
            cuttingSheetSelected.cuttingType?.plasticStrapsDetail || '',
          staples: cuttingSheetSelected.boxBrand?.staple?.name || '',
          staplesQuantity: cuttingSheetSelected.boxBrand?.stapleQuantity || 0,
          staplesDetail: cuttingSheetSelected.cuttingType?.staplesDetail || '',
          cardboardSheets: cuttingSheetSelected.boxBrand?.cardboardType || '',
          cardboardSheetsQuantity:
            cuttingSheetSelected.boxBrand?.cardboardTypeQuantity || 0,
          cardboardSheetsDetail:
            cuttingSheetSelected.cuttingType?.blockingSheetsDetail || '',
          thermometer: cuttingSheetSelected.boxBrand?.thermograph?.name || '',
          thermometerQuantity:
            cuttingSheetSelected.boxBrand?.thermographQuantity || 0,
          thermometerDetail:
            cuttingSheetSelected.cuttingType?.transportDetail || '',
          authorizedTransport:
            cuttingSheetSelected.cuttingType?.authorizedTransport || '',
          aliquot: cuttingSheetSelected.cuttingType?.aliquot || '',
          generalObservations:
            cuttingSheetSelected.cuttingType?.generalObservations || '',
        },
        pesticideSent:
          cuttingSheetSelected.boxBrand?.pesticideCocktail?.map(
            (pesticide) => ({
              pesticideId: pesticide.pesticide?.id || '',
              quantity: pesticide.quantity || 0,
            })
          ) || [],
        insecticideSent:
          cuttingSheetSelected.boxBrand?.insecticideCocktail?.map(
            (insecticide) => ({
              insecticideId: insecticide.insecticide?.id || '',
              quantity: insecticide.quantity || 0,
            })
          ) || [],
      };
    });
  }, [cuttingSheetSelected]);

  const handleSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    const { dataReviewed, container, ...rest } = values;

    const cuttingSheetData: CuttingSheetType = {
      exportId: cuttingSheetSelected.id || 0,
      palletsHeight: container.highPallets,
      containerPositioning: container.containerPositioning,
      belowDeck: container.belowDeck,
    };

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
      onSuccess: (response) => {
        toast({
          title: 'Registro y PDF creados exitosamente',
          description: 'Cierre esta ventana para abrir el PDF.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => window.open(response.pdfUrl, '_blank'),
        });

        queryClient.invalidateQueries('cuttingSheets');
        formikHelpers.resetForm();
        router.push('/dashboard/export/cutting-sheet');
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
                  isReadOnly
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
                  isReadOnly
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
                  label={'Posicion del Contenedor: '}
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
                    values.container.containerPositioning === 'CAMPO'
                      ? 'NO'
                      : values.container.containerPositioning === 'ACOPIO'
                        ? 'SI'
                        : 'N/A'
                  }
                  placeholder='Bajo cubierta'
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
                    { id: 'PALETS 10 DE ALTO', name: 'PALETS 10 DE ALTO' },
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

              <Heading fontSize={'2xl'} p={'12px'}>
                ESPECIFICACIONES DEL CORTE
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={2}>
                <InputFieldQuantity
                  name={'cutSpecifications.leaves'}
                  label={'Hojas a la cosecha: '}
                  isReadOnly
                  flexDirection={'row'}
                  min={4}
                  max={8}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.ageCutting'}
                  label={'Edad al corte: '}
                  isReadOnly
                  flexDirection={'row'}
                  min={10}
                  max={14}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.netWeight'}
                  label={'Peso neto: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.grossWeight'}
                  label={'Peso Bruto: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.caliberMin'}
                  label={'Calibre Mínimo: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.caliberMax'}
                  label={'Calibre Máximo: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.fingerLength'}
                  label={'Largo dedo: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldQuantity
                  name={'cutSpecifications.saneos'}
                  label={'Saneos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'cutSpecifications.cunas'}
                  label={'Cuñas: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'container.fileCode'}
                  label={'Código Fichero: '}
                  isReadOnly
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
                  label={'Cantidad de Etiquetas: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'cutSpecifications.labelDetail'}
                    label={'Detalle de Etiquetas: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'container.cluster'}
                  label={'Cluster: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'container.clusterQuantity'}
                  label={'Cantidad de Cluster: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'cutSpecifications.clusterDetail'}
                    label={'Detalle de Cluster: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
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
                  isReadOnly
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
                  label={'Cantidad de Sachet: '}
                  isReadOnly
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
                  label={'Cantidad de Pad: '}
                  isReadOnly
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
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.secondLine'}
                  label={'Segunda línea: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.thirdLine'}
                  label={'Tercera línea: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'packaging.fourthLine'}
                  label={'Cuarta línea: '}
                  isReadOnly
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
                  isReadOnly
                  flexDirection={'row'}
                />
                <Box />
                <InputFieldText
                  name={'materials.pallets'}
                  label={'Pallets: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.palletsQuantity'}
                  label={'Cantidad de Pallets: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'materials.palletsDetail'}
                    label={'Detalle de los Pallets: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'materials.plasticCorners'}
                  label={'Esquineros Plásticos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.plasticCornersQuantity'}
                  label={'Cantidad de Esquineros Plásticos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'materials.plasticCornersDetail'}
                    label={'Detalle de los Esquineros Plásticos: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'materials.reinforcements'}
                  label={'Refuerzos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.reinforcementsQuantity'}
                  label={'Cantidad de Refuerzos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'materials.reinforcementsDetail'}
                    label={'Detalle de los Refuerzos: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'materials.plasticStraps'}
                  label={'Zuncho Plásticos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.plasticStrapsQuantity'}
                  label={'Cantidad de Zuncho Plásticos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'materials.plasticStrapsDetail'}
                    label={'Detalle del Zuncho Plásticos: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'materials.staples'}
                  label={'Grapas: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.staplesQuantity'}
                  label={'Cantidad de Grapas: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'materials.staplesDetail'}
                    label={'Detalle de las Grapas: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'materials.cardboardSheets'}
                  label={'Láminas de cartón: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.cardboardSheetsQuantity'}
                  label={'Cantidad de Láminas de cartón: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'materials.cardboardSheetsDetail'}
                    label={'Detalle de las Láminas de cartón: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'materials.thermometer'}
                  label={'Termógrafo: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.thermometerQuantity'}
                  label={'Cantidad de Termógrafos: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <Flex gridColumn={{ base: 'span 1', lg: 'span 2' }}>
                  <InputFieldText
                    name={'materials.thermometerDetail'}
                    label={'Detalle del Termógrafo: '}
                    isReadOnly
                    flexDirection={'column'}
                  />
                </Flex>
                <InputFieldText
                  name={'materials.authorizedTransport'}
                  label={'Transportes Autorizados: '}
                  isReadOnly
                  flexDirection={'row'}
                />
                <InputFieldText
                  name={'materials.aliquot'}
                  label={'Alicuota: '}
                  isReadOnly
                  flexDirection={'row'}
                />
              </SimpleGrid>
              <InputFieldTextArea
                name={'materials.generalObservations'}
                label={'Observaciones Generales: '}
              />
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
