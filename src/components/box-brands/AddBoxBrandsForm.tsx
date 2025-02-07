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
import BlockingSheetSelectBanContainer from './additions/blocking-sheet/BlockingSheetSelectBanContainer';
import InputFieldBlockingSheetSelect from './additions/blocking-sheet/InputFieldBlockingSheetSelect';
import SelectInsecticide from './additions/insecticide/SelectInsecticide';
import SelectInsecticideBanContainer from './additions/insecticide/SelectInsecticideBanContainer';
import InputFieldLatexRemoverSelect from './additions/latex-remover/InputFieldLatexRemoverSelect';
import LatexRemoverSelectBanContainer from './additions/latex-remover/LatexRemoverSelectBanContainer';
import InputFieldMettoLabelSelect from './container/metto-label/InputFieldMettoLabelSelect';
import MettoLabelSelectBanContainer from './container/metto-label/MettoLabelSelectBanContainer';
import InputFieldSealSelect from './container/seal/InputFieldSealSelect';
import SealSelectBanContainer from './container/seal/SealSelectBanContainer';
import InputFieldStapleSelect from './container/staple/InputFieldStapleSelect';
import StapleSelectBanContainer from './container/staple/StapleSelectBanContainer';
import InputFieldStrippingSelect from './container/stripping/InputFieldStrippingSelect';
import StrippingSelectBanContainer from './container/stripping/StrippingSelectBanContainer';
import InputFieldThermographSelect from './container/thermograph/InputFieldThermographSelect';
import ThermographSelectBanContainer from './container/thermograph/ThermographSelectBanContainer';
import ImportBoxBrandDrawer from './ImportBoxBrandDrawer';
import InputFieldsBanContainer from './InputFieldsBanContainer';
import BandSelectBanContanier from './materials/band/BandSelectBanContanier';
import InputFieldBandSelect from './materials/band/InputFieldBandSelect';
import ClusterBagSelectBanContainer from './materials/cluster-bag/ClusterBagSelectBanContainer';
import InputFieldClusterBagSelect from './materials/cluster-bag/InputFieldClusterBagSelect';
import LabelSelectBanContainer from './materials/label/LabelSelectBanContainer';
import InputFieldProtectorSelect from './materials/protector/InputFieldProtectorSelect';
import ProtectorSelectBanContainer from './materials/protector/ProtectorSelectBanContainer';
import InputFieldRubberSelect from './materials/rubber/InputFieldRubberSelect';
import RubberSelectBanContainer from './materials/rubber/RubberSelectBanContainer';
import InputFieldSachetSelect from './materials/sachet/InputFieldSachetSelect';
import SachetSelectBanContainer from './materials/sachet/SachetSelectBanContainer';
import SelectPesticide from './post-harvest/pesticide/SelectPesticide';
import InputFieldBrandSelect from './specifications/brand/InputFieldBrandSelect';
import InputFieldRequiredCertificateMultiSelect from './specifications/requiredCertificate/InputFieldRequiredCertificateMultiSelect';
import { PesticideType } from '../../types/box-brand/post-harvest/pesticide';
import ImportProducerDrawer from '../producer/ImportProducerDrawer';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldNumber from '../ui/form/InputFieldNumber';
import InputFieldQuantity from '../ui/form/InputFieldQuantity';
import InputFieldText from '../ui/form/InputFieldText';

interface PesticideProps {
  pesticideId: number | '';
  quantity: number | '';
}

export interface InsecticideProps {
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
  parasealType: string;
  parasealTypeQuantity: number | '';
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
  blockingSheetId: number | '';
  blockingSheetQuantity: number | '';
  dataReviewed: boolean;
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
  parasealType: '',
  parasealTypeQuantity: '',
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
  insecticides: [
    // { insecticideId: '', quantity: '' }
  ],
  blockingSheetId: '',
  blockingSheetQuantity: '',
  dataReviewed: false,
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
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  brandCode: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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
  parasealType: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  parasealTypeQuantity: Yup.number()
    .required('Requerido')
    .when('padType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),
  padType: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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

  labelId: Yup.mixed().when('labelQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  labelQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { labelId } = this.parent;
        if (labelId === undefined || labelId === null || labelId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  bandId: Yup.mixed().when('bandQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  bandQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { bandId } = this.parent;
        if (bandId === undefined || bandId === null || bandId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  sachetId: Yup.mixed().when('sachetQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  sachetQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { sachetId } = this.parent;
        if (sachetId === undefined || sachetId === null || sachetId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  rubberId: Yup.mixed().when('rubberQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  rubberQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { rubberId } = this.parent;
        if (rubberId === undefined || rubberId === null || rubberId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  protectorId: Yup.mixed().when('protectorQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  protectorQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { protectorId } = this.parent;
        if (
          protectorId === undefined ||
          protectorId === null ||
          protectorId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  clusterBagId: Yup.mixed().when('clusterBagQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  clusterBagQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { clusterBagId } = this.parent;
        if (
          clusterBagId === undefined ||
          clusterBagId === null ||
          clusterBagId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),

  pesticides: Yup.array()
    .of(pesticideSchema)
    .min(1, 'Debe de tener al menos un pesticida'),

  palletsType: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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
    .max(100, 'Debe tener 100 caracteres o menos')
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

  stapleId: Yup.mixed().when('stapleQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  stapleQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { stapleId } = this.parent;
        if (stapleId === undefined || stapleId === null || stapleId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  strippingId: Yup.mixed().when('strippingQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  strippingQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { strippingId } = this.parent;
        if (
          strippingId === undefined ||
          strippingId === null ||
          strippingId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  thermographId: Yup.mixed().when('thermographQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  thermographQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { thermographId } = this.parent;
        if (
          thermographId === undefined ||
          thermographId === null ||
          thermographId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  sealId: Yup.mixed().when('sealQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  sealQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { sealId } = this.parent;
        if (sealId === undefined || sealId === null || sealId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  mettoLabelId: Yup.mixed().when('mettoLabelQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  mettoLabelQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { mettoLabelId } = this.parent;
        if (
          mettoLabelId === undefined ||
          mettoLabelId === null ||
          mettoLabelId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),

  packingTapeType: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  packingTapeTypeQuantity: Yup.number()
    .required('Requerido')
    .integer('Debe ser un número entero')
    .when('packingTapeType', {
      is: 'N/A',
      then: (schema) => schema.oneOf([0], 'Debe ser 0 si fondo es N/A'),
      otherwise: (schema) => schema.moreThan(0, 'Debe ser mayor que 0'),
    }),

  latexRemoverId: Yup.mixed().when('latexRemoverQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  latexRemoverQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { latexRemoverId } = this.parent;
        if (
          latexRemoverId === undefined ||
          latexRemoverId === null ||
          latexRemoverId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  blockingSheetId: Yup.mixed().when('blockingSheetQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  blockingSheetQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no selecciono una opción',
      function (value) {
        const { blockingSheetId } = this.parent;
        if (
          blockingSheetId === undefined ||
          blockingSheetId === null ||
          blockingSheetId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  insecticides: Yup.array()
    .of(insecticideSchema)
    .min(0, 'Debe de tener 0 o más pesticidas'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  unit?: string;
}

const specificationsInputFieldsText: InputFieldProps[] = [
  { name: 'name', label: 'Nickname' },
  { name: 'brandCode', label: 'Código' },
];

const specificationsInputFieldsNumber: InputFieldProps[] = [
  { name: 'boxQuantity', label: 'Número de Cajas/Contenedor', unit: 'C/C' },
  { name: 'netWeightBox', label: 'Peso Neto de Caja', unit: 'LBS' },
  { name: 'grossWeightBox', label: 'Peso Bruto de Caja', unit: 'LBS' },
];

interface MaterialsInputFieldsProps {
  name1: string;
  label1: string;
  placeholder1?: string;
  name2: string;
  label2: string;
  placeholder2?: string;
}

const materialsInputFields: MaterialsInputFieldsProps[] = [
  {
    name1: 'bottomType',
    label1: 'Fondo',
    name2: 'bottomTypeQuantity',
    label2: 'Fondos/Caja',
    placeholder2: 'Cantidad',
  },
  {
    name1: 'lidType',
    label1: 'Tapa',
    name2: 'lidTypeQuantity',
    label2: 'Tapas/Caja',
    placeholder2: 'Cantidad',
  },
  {
    name1: 'coverType',
    label1: 'Funda',
    name2: 'coverTypeQuantity',
    label2: 'Fundas/Caja',
    placeholder2: 'Cantidad',
  },
  {
    name1: 'cardboardType',
    label1: 'Cartulina',
    name2: 'cardboardTypeQuantity',
    label2: 'Cartulinas/Caja',
    placeholder2: 'Cantidad',
  },
];

const containersInputFields: MaterialsInputFieldsProps[] = [
  {
    name1: 'palletsType',
    label1: 'Pallet',
    name2: 'palletsTypeQuantity',
    label2: 'Pallets/Contenedor',
    placeholder2: 'Cantidad',
  },
  {
    name1: 'miniPalletsType',
    label1: 'Mini pallet',
    name2: 'miniPalletsTypeQuantity',
    label2: 'Mini Pallets/Contenedor',
    placeholder2: 'Cantidad',
  },
  {
    name1: 'cornerType',
    label1: 'Esquinero',
    name2: 'cornerTypeQuantity',
    label2: 'Esquineros/Contenedor',
    placeholder2: 'Cantidad',
  },
  {
    name1: 'reinforcementType',
    label1: 'Refuerzo/Mini esquinero',
    name2: 'reinforcementTypeQuantity',
    label2: 'Refuerzos/Contenedor',
    placeholder2: 'Cantidad',
  },
];

export default function AddBoxBrandsForm() {
  const router = useRouter();
  const toast = useToast();
  const { createBoxBrand, isLoading } = useCreateBoxBrand();
  const queryClient = useQueryClient();

  const addBoxBrands = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    const {
      netWeightBox,
      grossWeightBox,
      boxQuantity,
      dataReviewed,
      ...boxBrandData
    } = values;

    // console.log(values);

    createBoxBrand(
      {
        ...boxBrandData,
        boxQuantity: Number(boxQuantity),
        netWeightBox: Number(netWeightBox),
        grossWeightBox: Number(grossWeightBox),
        // Materiales por caja
        labelId: !!values.labelId ? values.labelId : 0,
        bandId: !!values.bandId ? values.bandId : 0,
        sachetId: !!values.sachetId ? values.sachetId : 0,
        rubberId: !!values.rubberId ? values.rubberId : 0,
        protectorId: !!values.protectorId ? values.protectorId : 0,
        clusterBagId: !!values.clusterBagId ? values.clusterBagId : 0,
        // Materiales por contenedor
        stapleId: !!values.stapleId ? values.stapleId : 0,
        strippingId: !!values.strippingId ? values.strippingId : 0,
        thermographId: !!values.thermographId ? values.thermographId : 0,
        sealId: !!values.sealId ? values.sealId : 0,
        mettoLabelId: !!values.mettoLabelId ? values.mettoLabelId : 0,
        // Adicionales
        latexRemoverId: !!values.latexRemoverId ? values.latexRemoverId : 0,
        blockingSheetId: !!values.blockingSheetId ? values.blockingSheetId : 0,
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

          if (statusCode === 1001) {
            router.push('/api/auth/signout');
          }

          if (model === 'BoxBrand' && prop === 'brandCode') {
            formikHelpers.setFieldTouched(`${prop}`, true, false);
            formikHelpers.setFieldError(`${prop}`, message);
          }
        },
        onSuccess: () => {
          toast({
            title: 'Tipo de Caja Creada con Éxito',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('boxBrands');
          formikHelpers.resetForm();
          router.push('/dashboard/box-brands/search');
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
              <Flex justify='space-between'>
                <Heading fontSize={'2xl'} p={'12px'}>
                  Especificaciones
                </Heading>
                <ImportBoxBrandDrawer />
              </Flex>
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
                    unit={field.unit}
                  />
                ))}
                <InputFieldRequiredCertificateMultiSelect
                  name={'requiredCertificates'}
                  label={'Certificado/s Requerido/s'}
                  placeholder={'Seleccione el/los certificado/s'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales por caja
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                {materialsInputFields.map(
                  ({ name1, label1, name2, label2, placeholder2 }, index) => (
                    <Flex key={index} gap={2} alignItems={'flex-end'}>
                      <InputFieldText name={name1} label={label1} />
                      <InputFieldQuantity
                        isReadOnly={true}
                        name={name2}
                        label={label2}
                        quantity={values.boxQuantity}
                        placeholder={placeholder2}
                        unit='U/C'
                      />
                    </Flex>
                  )
                )}

                <InputFieldsBanContainer
                  name1={'parasealType'}
                  label1={'ParaSeal'}
                  name2={'parasealTypeQuantity'}
                  label2={'ParaSeals/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />

                <InputFieldsBanContainer
                  name1={'padType'}
                  label1={'Pad'}
                  name2={'padTypeQuantity'}
                  label2={'Pads/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />

                <InputFieldsBanContainer
                  name1={'spongeType'}
                  label1={'Esponja'}
                  name2={'spongeTypeQuantity'}
                  label2={'Esponjas/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />

                <LabelSelectBanContainer
                  name1={'labelId'}
                  label1={'Etiqueta'}
                  placeholder1={'Seleccione la Etiqueta'}
                  name2={'labelQuantity'}
                  label2={'Etiquetas/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
                <BandSelectBanContanier
                  name1={'bandId'}
                  label1={'Banda'}
                  placeholder1={'Seleccione la Banda'}
                  name2={'bandQuantity'}
                  label2={'Bandas/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
                <SachetSelectBanContainer
                  name1={'sachetId'}
                  label1={'Sachet'}
                  placeholder1={'Seleccione el Sachet'}
                  name2={'sachetQuantity'}
                  label2={'Sachets/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
                <RubberSelectBanContainer
                  name1={'rubberId'}
                  label1={'Liga'}
                  placeholder1={'Seleccione la Liga'}
                  name2={'rubberQuantity'}
                  label2={'Ligas/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
                <ProtectorSelectBanContainer
                  name1={'protectorId'}
                  label1={'Protector'}
                  placeholder1={'Seleccione el Protector'}
                  name2={'protectorQuantity'}
                  label2={'Protectores/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
                <ClusterBagSelectBanContainer
                  name1={'clusterBagId'}
                  label1={'Cluster Bag'}
                  placeholder1={'Seleccione el Cluster Bag'}
                  name2={'clusterBagQuantity'}
                  label2={'Cluster Bags/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Insumos post cosecha
              </Heading>
              <Divider mb={'16px'} />

              <Heading fontSize={'xl'} p={'12px'}>
                Fumigación post cosecha
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
                  ({ name1, label1, name2, label2, placeholder2 }, index) => (
                    <InputFieldsBanContainer
                      key={index}
                      name1={name1}
                      label1={label1}
                      name2={name2}
                      label2={label2}
                      placeholder2={placeholder2}
                      unit='C/C'
                    />
                  )
                )}

                <StapleSelectBanContainer
                  name1={'stapleId'}
                  label1={'Grapa'}
                  placeholder1={'Seleccione la Grapa'}
                  name2={'stapleQuantity'}
                  label2={'Grapas/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='C/C'
                />
                <StrippingSelectBanContainer
                  name1={'strippingId'}
                  label1={'Zuncho'}
                  placeholder1={'Seleccione el Zuncho'}
                  name2={'strippingQuantity'}
                  label2={'Zunchos/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='C/C'
                />
                <ThermographSelectBanContainer
                  name1={'thermographId'}
                  label1={'Termografo'}
                  placeholder1={'Seleccione el Termografo'}
                  name2={'thermographQuantity'}
                  label2={'Termografos/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
                <SealSelectBanContainer
                  name1={'sealId'}
                  label1={'Sello'}
                  placeholder1={'Seleccione el Sello'}
                  name2={'sealQuantity'}
                  label2={'Sellos/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='C/C'
                />
                <MettoLabelSelectBanContainer
                  name1={'mettoLabelId'}
                  label1={'Etiqueta Metto'}
                  placeholder1={'Seleccione la Etiqueta Metto'}
                  name2={'mettoLabelQuantity'}
                  label2={'Etiquetas Metto/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='C/C'
                />
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
                  label2={'Cintas/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />

                <LatexRemoverSelectBanContainer
                  name1={'latexRemoverId'}
                  label1={'Removedor de latex'}
                  placeholder1={'Seleccione el Removedor de Latex'}
                  name2={'latexRemoverQuantity'}
                  label2={'Removedores/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
                <BlockingSheetSelectBanContainer
                  name1={'blockingSheetId'}
                  label1={'Lamina de bloqueo'}
                  placeholder1={'Seleccione la Lamina de bloqueo'}
                  name2={'blockingSheetQuantity'}
                  label2={'Laminas/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />
              </SimpleGrid>

              <SelectInsecticideBanContainer
                name={'insecticides'}
                insecticides={values.insecticides}
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
                  isLoading={isLoading}
                  onClick={() => console.log('values: ', values)}
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
}
