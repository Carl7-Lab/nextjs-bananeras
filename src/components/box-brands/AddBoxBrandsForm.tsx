'use client';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateBoxBrand } from '@/hooks/box-brand/createBoxBrand';
import InputFieldBlockingSheetSelect from './additions/blocking-sheet/InputFieldBlockingSheetSelect';
import SelectInsecticide from './additions/insecticide/SelectInsecticide';
import InputFieldLatexRemoverSelect from './additions/latex-remover/InputFieldLatexRemoverSelect';
import InputFieldMettoLabelSelect from './container/metto-label/InputFieldMettoLabelSelect';
import InputFieldSealSelect from './container/seal/InputFieldSealSelect';
import InputFieldStapleSelect from './container/staple/InputFieldStapleSelect';
import InputFieldStrippingSelect from './container/stripping/InputFieldStrippingSelect';
import InputFieldThermographSelect from './container/thermograph/InputFieldThermographSelect';
import InputFieldsBanContainer from './InputFieldsBanContainer';
import InputFieldBandSelect from './materials/band/InputFieldBandSelect';
import InputFieldClusterBagSelect from './materials/cluster-bag/InputFieldClusterBagSelect';
import InputFieldLabelSelect from './materials/label/InputFieldLabelSelect';
import InputFieldProtectorSelect from './materials/protector/InputFieldProtectorSelect';
import InputFieldRubberSelect from './materials/rubber/InputFieldRubberSelect';
import InputFieldSachetSelect from './materials/sachet/InputFieldSachetSelect';
import SelectPesticide from './post-harvest/pesticide/SelectPesticide';
import InputFieldBrandSelect from './specifications/brand/InputFieldBrandSelect';
import InputFieldRequiredCertificateMultiSelect from './specifications/requiredCertificate/InputFieldRequiredCertificateMultiSelect';
import InputFieldNumber from '../ui/form/InputFieldNumber';
import InputFieldQuantity from '../ui/form/InputFieldQuantity';
import InputFieldText from '../ui/form/InputFieldText';

interface PesticideProps {
  pesticideId: number | '';
  quantity: number | '';
}

interface InsecticideProps {
  insecticideId: number | '';
  quantity: number | '';
}

interface ValuesProps {
  // specifications
  brandId: number | '';
  name: string;
  brandCode: string;
  boxQuantity: number | '';
  netWeightBox: number | '';
  grossWeightBox: number | '';
  requiredCertificates: number[] | null;

  // materials
  bottomType: string;
  bottomTypeQuantity: number | '';
  lidType: string;
  lidTypeQuantity: number | '';
  coverType: string;
  coverTypeQuantity: number | '';
  cardboardType: string;
  cardboardTypeQuantity: number | '';
  padType: string;
  padTypeQuantity: number | '';
  spongeType: string;
  spongeTypeQuantity: number | '';
  // select
  labelId: number | '';
  labelQuantity: number | '';
  bandId: number | '';
  bandQuantity: number | '';
  sachetId: number | '';
  sachetQuantity: number | '';
  rubberId: number | '';
  rubberQuantity: number | '';
  protectorId: number | '';
  protectorQuantity: number | '';
  clusterBagId: number | '';
  clusterBagQuantity: number | '';

  // post harvest
  pesticides: PesticideProps[];
  // pesticidesQuantity: number | '';

  // container
  palletsType: string;
  palletsTypeQuantity: number | '';
  miniPalletsType: string;
  miniPalletsTypeQuantity: number | '';
  cornerType: string;
  cornerTypeQuantity: number | '';
  reinforcementType: string;
  reinforcementTypeQuantity: number | '';
  // select
  stapleId: number | '';
  stapleQuantity: number | '';
  strippingId: number | '';
  strippingQuantity: number | '';
  thermographId: number | '';
  thermographQuantity: number | '';
  sealId: number | '';
  sealQuantity: number | '';
  mettoLabelId: number | '';
  mettoLabelQuantity: number | '';

  // additions
  packingTapeType: string;
  packingTapeTypeQuantity: number | '';
  // select
  latexRemoverId: number | '';
  latexRemoverQuantity: number | '';
  insecticides: InsecticideProps[];
  // insecticides: number[] | null;
  // insecticidesQuantity: number | '';
  blockingSheetId: number | '';
  blockingSheetQuantity: number | '';
}

const initialValues: ValuesProps = {
  brandId: '',
  name: '',
  brandCode: '',
  boxQuantity: '',
  netWeightBox: '',
  grossWeightBox: '',
  requiredCertificates: null,

  bottomType: '',
  bottomTypeQuantity: '',
  lidType: '',
  lidTypeQuantity: '',
  coverType: '',
  coverTypeQuantity: '',
  cardboardType: '',
  cardboardTypeQuantity: '',
  padType: '',
  padTypeQuantity: '',
  spongeType: '',
  spongeTypeQuantity: '',

  labelId: '',
  labelQuantity: '',
  bandId: '',
  bandQuantity: '',
  sachetId: '',
  sachetQuantity: '',
  rubberId: '',
  rubberQuantity: '',
  protectorId: '',
  protectorQuantity: '',
  clusterBagId: '',
  clusterBagQuantity: '',

  pesticides: [{ pesticideId: '', quantity: '' }],
  // pesticidesQuantity: '',

  palletsType: '',
  palletsTypeQuantity: '',
  miniPalletsType: '',
  miniPalletsTypeQuantity: '',
  cornerType: '',
  cornerTypeQuantity: '',
  reinforcementType: '',
  reinforcementTypeQuantity: '',

  stapleId: '',
  stapleQuantity: '',
  strippingId: '',
  strippingQuantity: '',
  thermographId: '',
  thermographQuantity: '',
  sealId: '',
  sealQuantity: '',
  mettoLabelId: '',
  mettoLabelQuantity: '',

  packingTapeType: '',
  packingTapeTypeQuantity: '',

  latexRemoverId: '',
  latexRemoverQuantity: '',
  insecticides: [{ insecticideId: '', quantity: '' }],
  // insecticidesQuantity: '',
  blockingSheetId: '',
  blockingSheetQuantity: '',
};

const pesticideSchema = Yup.object().shape({
  pesticideId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  quantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
});

const insecticideSchema = Yup.object().shape({
  insecticideId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  quantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
});

const validationSchema = Yup.object({
  brandId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  name: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  brandCode: Yup.string()
    .max(20, 'Debe tener 10 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  boxQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
  netWeightBox: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(100, 'Debe ser menor que 100 libras')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  grossWeightBox: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(100, 'Debe ser menor que 100 libras')
    .min(Yup.ref('netWeightBox'), 'Debe ser mayor que el peso neto de la caja')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  requiredCertificates: Yup.array()
    .min(1, 'Debe seleccionar al menos un certificado')
    .of(Yup.number().required())
    .nullable()
    .required('Requerido'),

  bottomType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  bottomTypeQuantity: Yup.number()
    .required('Requerido')
    .when('bottomType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  lidType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  lidTypeQuantity: Yup.number()
    .required('Requerido')
    .when('lidType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  coverType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  coverTypeQuantity: Yup.number()
    .required('Requerido')
    .when('coverType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  cardboardType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  cardboardTypeQuantity: Yup.number()
    .required('Requerido')
    .when('cardboardType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  padType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  padTypeQuantity: Yup.number()
    .required('Requerido')
    .when('padType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  spongeType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  spongeTypeQuantity: Yup.number()
    .required('Requerido')
    .when('spongeType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),

  labelId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  labelQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  bandId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  bandQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  sachetId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  sachetQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  rubberId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  rubberQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  protectorId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  protectorQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  clusterBagId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  clusterBagQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),

  pesticides: Yup.array()
    .of(pesticideSchema)
    .min(1, 'Debe de tener al menos un pesticida'),

  palletsType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  palletsTypeQuantity: Yup.number()
    .required('Requerido')
    .integer('Debe ser un número entero')
    .when('palletsType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  miniPalletsType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  miniPalletsTypeQuantity: Yup.number()
    .required('Requerido')
    .integer('Debe ser un número entero')
    .when('miniPalletsType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  cornerType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  cornerTypeQuantity: Yup.number()
    .required('Requerido')
    .integer('Debe ser un número entero')
    .when('cornerType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  reinforcementType: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  reinforcementTypeQuantity: Yup.number()
    .required('Requerido')
    .integer('Debe ser un número entero')
    .when('reinforcementType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),

  stapleId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  stapleQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  strippingId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  strippingQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  thermographId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  thermographQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  sealId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  sealQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  mettoLabelId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  mettoLabelQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),

  packingTapeType: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .transform((value) => value.trim())
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .required('Requerido'),
  packingTapeTypeQuantity: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),

  latexRemoverId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  latexRemoverQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),

  insecticides: Yup.array()
    .of(insecticideSchema)
    .min(1, 'Debe de tener al menos un pesticida'),

  blockingSheetId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  blockingSheetQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
});

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

const specificationsInputFieldsText: InputFieldProps[] = [
  { name: 'name', label: 'Tipo' },
  { name: 'brandCode', label: 'Código' },
];

const specificationsInputFieldsNumber: InputFieldProps[] = [
  { name: 'boxQuantity', label: 'Número de cajas/Contenedor' },
  { name: 'netWeightBox', label: 'Peso Neto de Caja' },
  { name: 'grossWeightBox', label: 'Peso Bruto de Caja' },
];

interface MaterialsInputFieldsProps {
  name1: string;
  label1: string;
  name2: string;
  label2: string;
}

const materialsInputFields: MaterialsInputFieldsProps[] = [
  {
    name1: 'bottomType',
    label1: 'Fondo',
    name2: 'bottomTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'lidType',
    label1: 'Tapa',
    name2: 'lidTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'coverType',
    label1: 'Funda',
    name2: 'coverTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'cardboardType',
    label1: 'Cartulina',
    name2: 'cardboardTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'padType',
    label1: 'Pad',
    name2: 'padTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'spongeType',
    label1: 'Esponja',
    name2: 'spongeTypeQuantity',
    label2: 'Cantidad',
  },
];

const containersInputFields: MaterialsInputFieldsProps[] = [
  {
    name1: 'palletsType',
    label1: 'Pallet',
    name2: 'palletsTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'miniPalletsType',
    label1: 'Mini pallet',
    name2: 'miniPalletsTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'cornerType',
    label1: 'Esquinero',
    name2: 'cornerTypeQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'reinforcementType',
    label1: 'Refuerzo',
    name2: 'reinforcementTypeQuantity',
    label2: 'Cantidad',
  },
];

export default function AddBoxBrandsForm() {
  const router = useRouter();
  const toast = useToast();
  const { createBoxBrand } = useCreateBoxBrand();
  const queryClient = useQueryClient();

  const addBoxBrands = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    const { netWeightBox, grossWeightBox, boxQuantity, ...boxBrandData } =
      values;

    // console.log(values);

    createBoxBrand(
      {
        ...boxBrandData,
        boxQuantity: Number(boxQuantity),
        netWeightBox: Number(netWeightBox),
        grossWeightBox: Number(grossWeightBox),
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

          if (model === 'BoxBrand' && prop === 'brandCode') {
            formikHelpers.setFieldTouched(`${prop}`, true, false);
            formikHelpers.setFieldError(`${prop}`, message);
          }
        },
        onSuccess: () => {
          toast({
            title: 'Tipo de caja creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('boxBrands');
          formikHelpers.resetForm();
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
        {({ isSubmitting, values }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregando Marca de Cajas
              </Heading>
              <Divider mb={'16px'} />

              <Heading fontSize={'2xl'} p={'12px'}>
                Especificaciones
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldBrandSelect
                  name={'brandId'}
                  label={'Marca'}
                  placeholder={'Seleccione la marca'}
                />
                {specificationsInputFieldsText.map((field, index) => (
                  <InputFieldText
                    key={index}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                ))}
                {specificationsInputFieldsNumber.map((field, index) => (
                  <InputFieldNumber
                    key={index}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    // isDecimal={field.name !== 'boxQuantity'}
                  />
                ))}
                <InputFieldRequiredCertificateMultiSelect
                  name={'requiredCertificates'}
                  label={'Cerificado/s Requerido/s'}
                  placeholder={'Seleccione el/los certificado/s'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales por caja
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                {materialsInputFields.map(
                  ({ name1, label1, name2, label2 }, index) => (
                    <Flex key={index} gap={2}>
                      <InputFieldText name={name1} label={label1} />
                      <InputFieldQuantity
                        isReadOnly={true}
                        name={name2}
                        label={label2}
                        quantity={values.boxQuantity}
                      />
                    </Flex>
                  )
                )}

                <Flex gap={2}>
                  <InputFieldLabelSelect
                    name={'labelId'}
                    label={'Etiqueta'}
                    placeholder={'Seleccione la etiqueta'}
                  />
                  <InputFieldQuantity
                    name={'labelQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldBandSelect
                    name={'bandId'}
                    label={'Banda'}
                    placeholder={'Seleccione la banda'}
                  />
                  <InputFieldQuantity
                    name={'bandQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldSachetSelect
                    name={'sachetId'}
                    label={'Sachet'}
                    placeholder={'Seleccione el sachet'}
                  />
                  <InputFieldQuantity
                    name={'sachetQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldRubberSelect
                    name={'rubberId'}
                    label={'Liga'}
                    placeholder={'Seleccione la liga'}
                  />
                  <InputFieldQuantity
                    name={'rubberQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldProtectorSelect
                    name={'protectorId'}
                    label={'Protector'}
                    placeholder={'Seleccione el protector'}
                  />
                  <InputFieldQuantity
                    name={'protectorQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldClusterBagSelect
                    name={'clusterBagId'}
                    label={'Cluster Bag'}
                    placeholder={'Seleccione el cluster bag'}
                  />
                  <InputFieldQuantity
                    name={'clusterBagQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales post cosecha
              </Heading>
              <Divider mb={'16px'} />
              <Heading fontSize={'xl'} p={'12px'}>
                Pesticidas
              </Heading>
              <Divider mb={'16px'} />
              <FieldArray name='pesticides'>
                {({ push, remove }) => (
                  <>
                    {values.pesticides.map((_pesticide, index) => (
                      <div key={index}>
                        <SelectPesticide
                          key={index}
                          name1={`pesticides[${index}].pesticideId`}
                          name2={`pesticides[${index}].quantity`}
                          isDisabledRemove={values.pesticides.length === 1}
                          onClickRemove={() => {
                            remove(index);
                          }}
                        />
                        <Divider
                          mt={'16px'}
                          mb={'8px'}
                          borderWidth={'2px'}
                          variant={'dashed'}
                        />
                      </div>
                    ))}
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                      <Box></Box>
                      <Button
                        onClick={() => push({ pesticideId: '', quantity: '' })}
                      >
                        Agregar Pesticida
                      </Button>
                    </SimpleGrid>
                  </>
                )}
              </FieldArray>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales por contenedor
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                {containersInputFields.map(
                  ({ name1, label1, name2, label2 }, index) => (
                    <InputFieldsBanContainer
                      key={index}
                      name1={name1}
                      label1={label1}
                      name2={name2}
                      label2={label2}
                    />
                  )
                )}

                <Flex gap={2}>
                  <InputFieldStapleSelect
                    name={'stapleId'}
                    label={'Grapa'}
                    placeholder={'Seleccione la grapa'}
                  />
                  <InputFieldQuantity
                    name={'stapleQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldStrippingSelect
                    name={'strippingId'}
                    label={'Zuncho'}
                    placeholder={'Seleccione el zuncho'}
                  />
                  <InputFieldQuantity
                    name={'strippingQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldThermographSelect
                    name={'thermographId'}
                    label={'Termografo'}
                    placeholder={'Seleccione el termografo'}
                  />
                  <InputFieldQuantity
                    name={'thermographQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldSealSelect
                    name={'sealId'}
                    label={'Sello'}
                    placeholder={'Seleccione el sello'}
                  />
                  <InputFieldQuantity
                    name={'sealQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldMettoLabelSelect
                    name={'mettoLabelId'}
                    label={'Etiqueta Metto'}
                    placeholder={'Seleccione la etiqueta Metto'}
                  />
                  <InputFieldQuantity
                    name={'mettoLabelQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Adicionales
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldsBanContainer
                  name1={'packingTapeType'}
                  label1={'Cinta de embalaje'}
                  name2={'packingTapeTypeQuantity'}
                  label2={'Cantidad'}
                />

                <Flex gap={2}>
                  <InputFieldLatexRemoverSelect
                    name={'latexRemoverId'}
                    label={'Removedor de latex'}
                    placeholder={'Seleccione la removedor de latex'}
                  />
                  <InputFieldQuantity
                    name={'latexRemoverQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>

                <Flex gap={2}>
                  <InputFieldBlockingSheetSelect
                    name={'blockingSheetId'}
                    label={'Lamina de bloque'}
                    placeholder={'Seleccione la lamina de bloque'}
                  />
                  <InputFieldQuantity
                    name={'blockingSheetQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
              </SimpleGrid>

              <Heading fontSize={'xl'} p={'12px'}>
                Insecticidas
              </Heading>
              <Divider mb={'16px'} />
              <FieldArray name='insecticides'>
                {({ push, remove }) => (
                  <>
                    {values.insecticides.map((_insecticide, index) => (
                      <div key={index}>
                        <SelectInsecticide
                          key={index}
                          name1={`insecticides[${index}].insecticideId`}
                          name2={`insecticides[${index}].quantity`}
                          isDisabledRemove={values.insecticides.length === 1}
                          onClickRemove={() => {
                            remove(index);
                          }}
                        />
                        <Divider
                          mt={'16px'}
                          mb={'8px'}
                          borderWidth={'2px'}
                          variant={'dashed'}
                        />
                      </div>
                    ))}
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                      <Box></Box>
                      <Button
                        onClick={() =>
                          push({ insecticideId: '', quantity: '' })
                        }
                      >
                        Agregar Pesticida
                      </Button>
                    </SimpleGrid>
                  </>
                )}
              </FieldArray>

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
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
