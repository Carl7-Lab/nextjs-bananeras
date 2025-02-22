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
import SelectInsecticideBanContainer from './additions/insecticide/SelectInsecticideBanContainer';
import LatexRemoverSelectBanContainer from './additions/latex-remover/LatexRemoverSelectBanContainer';
import MettoLabelSelectBanContainer from './container/metto-label/MettoLabelSelectBanContainer';
import SealSelectBanContainer from './container/seal/SealSelectBanContainer';
import StapleSelectBanContainer from './container/staple/StapleSelectBanContainer';
import StrippingSelectBanContainer from './container/stripping/StrippingSelectBanContainer';
import ThermographSelectBanContainer from './container/thermograph/ThermographSelectBanContainer';
import ImportBoxBrandDrawer from './ImportBoxBrandDrawer';
import BandSelectBanContanier from './materials/band/BandSelectBanContanier';
import ClusterBagSelectBanContainer from './materials/cluster-bag/ClusterBagSelectBanContainer';
import LabelSelectBanContainer from './materials/label/LabelSelectBanContainer';
import ProtectorSelectBanContainer from './materials/protector/ProtectorSelectBanContainer';
import RubberSelectBanContainer from './materials/rubber/RubberSelectBanContainer';
import SachetSelectBanContainer from './materials/sachet/SachetSelectBanContainer';
import SelectPesticide from './post-harvest/pesticide/SelectPesticide';
import InputFieldBrandSelect from './specifications/brand/InputFieldBrandSelect';
import InputFieldRequiredCertificateMultiSelect from './specifications/requiredCertificate/InputFieldRequiredCertificateMultiSelect';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldNumber from '../ui/form/InputFieldNumber';
import InputFieldText from '../ui/form/InputFieldText';
import BottomSelectBanContanier from './materials/bottom/BottomSelectBanContanier';
import LidSelectBanContanier from './materials/lid/LidSelectBanContainer';
import CoverSelectBanContanier from './materials/cover/CoverSelectBanContainer';
import CardboardSelectBanContanier from './materials/cardboard/CardboardSelectBanContainer';
import ParasealSelectBanContainer from './materials/paraseal/ParasealSelectBanContainer';
import PadSelectBanContainer from './materials/pad/PadSelectBanContainer';
import SpongeSelectBanContainer from './materials/sponge/SpongeSelectBanContainer';
import PalletSelectBanContanier from './materials/pallet/PalletSelectBanContainer';
import MiniPalletSelectBanContanier from './materials/minipallets/MiniPalletSelectBanContainer';
import CornerSelectBanContainer from './materials/corner/CornerSelectBanContainer';
import ReinforcementSelectBanContainer from './materials/reinforcement/ReinforcementSelectBanContainer';
import PackingTapeSelectBanContanier from './materials/packingtape/PackingTapeSelectBanContainer';

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
  bottomTypeId: number | '';
  bottomTypeQuantity: number | '';
  lidTypeId: number | '';
  lidTypeQuantity: number | '';
  coverTypeId: number | '';
  coverTypeQuantity: number | '';
  cardboardTypeId: number | '';
  cardboardTypeQuantity: number | '';
  parasealTypeId: number | '';
  parasealTypeQuantity: number | '';
  padTypeId: number | '';
  padTypeQuantity: number | '';
  spongeTypeId: number | '';
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
  palletsTypeId: number | '';
  palletsTypeQuantity: number | '';
  miniPalletsTypeId: number | '';
  miniPalletsTypeQuantity: number | '';
  cornerTypeId: number | '';
  cornerTypeQuantity: number | '';
  reinforcementTypeId: number | '';
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
  packingTapeTypeId: number | '';
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

  bottomTypeId: '',
  bottomTypeQuantity: '',
  lidTypeId: '',
  lidTypeQuantity: '',
  coverTypeId: '',
  coverTypeQuantity: '',
  cardboardTypeId: '',
  cardboardTypeQuantity: '',
  parasealTypeId: '',
  parasealTypeQuantity: '',
  padTypeId: '',
  padTypeQuantity: '',
  spongeTypeId: '',
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

  palletsTypeId: '',
  palletsTypeQuantity: '',
  miniPalletsTypeId: '',
  miniPalletsTypeQuantity: '',
  cornerTypeId: '',
  cornerTypeQuantity: '',
  reinforcementTypeId: '',
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

  packingTapeTypeId: '',
  packingTapeTypeQuantity: '',

  latexRemoverId: '',
  latexRemoverQuantity: '',
  insecticides: [],
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
  bottomTypeId: Yup.mixed().when('bottomTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  bottomTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { bottomTypeId } = this.parent;
        if (
          bottomTypeId === undefined ||
          bottomTypeId === null ||
          bottomTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  lidTypeId: Yup.mixed().when('lidTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  lidTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { lidTypeId } = this.parent;
        if (lidTypeId === undefined || lidTypeId === null || lidTypeId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  coverTypeId: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { coverTypeId } = this.parent;
        if (
          coverTypeId === undefined ||
          coverTypeId === null ||
          coverTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  coverTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { cardboardTypeId } = this.parent;
        if (
          cardboardTypeId === undefined ||
          cardboardTypeId === null ||
          cardboardTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  cardboardTypeId: Yup.mixed().when('cardboardTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  cardboardTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { cardboardTypeId } = this.parent;
        if (
          cardboardTypeId === undefined ||
          cardboardTypeId === null ||
          cardboardTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  parasealTypeId: Yup.mixed().when('parasealTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  parasealTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { parasealTypeId } = this.parent;
        if (
          parasealTypeId === undefined ||
          parasealTypeId === null ||
          parasealTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  padTypeId: Yup.mixed().when('padTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  padTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { padTypeId } = this.parent;
        if (padTypeId === undefined || padTypeId === null || padTypeId === '') {
          return value === 0;
        }
        return value > 0;
      }
    ),
  spongeTypeId: Yup.mixed().when('spongeTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  spongeTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { spongeTypeId } = this.parent;
        if (
          spongeTypeId === undefined ||
          spongeTypeId === null ||
          spongeTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
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
  palletsTypeId: Yup.mixed().when('palletsTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  palletsTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { palletsTypeId } = this.parent;
        if (
          palletsTypeId === undefined ||
          palletsTypeId === null ||
          palletsTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  miniPalletsTypeId: Yup.mixed().when('miniPalletsTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  miniPalletsTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { miniPalletsTypeId } = this.parent;
        if (
          miniPalletsTypeId === undefined ||
          miniPalletsTypeId === null ||
          miniPalletsTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  cornerTypeId: Yup.mixed().when('cornerTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  cornerTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { cornerTypeId } = this.parent;
        if (
          cornerTypeId === undefined ||
          cornerTypeId === null ||
          cornerTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
  reinforcementTypeId: Yup.mixed().when('reinforcementTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  reinforcementTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { reinforcementTypeId } = this.parent;
        if (
          reinforcementTypeId === undefined ||
          reinforcementTypeId === null ||
          reinforcementTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
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
  packingTapeTypeId: Yup.mixed().when('reinforcementTypeQuantity', {
    is: (value: number) => value > 0,
    then: (schema) => schema.required('Requerido'),
    otherwise: (schema) => schema.nullable(),
  }),
  packingTapeTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .test(
      'is-zero-when-no-option',
      'Debe ser 0 si no se selecciona una opción',
      function (value) {
        const { packingTapeTypeId } = this.parent;
        if (
          packingTapeTypeId === undefined ||
          packingTapeTypeId === null ||
          packingTapeTypeId === ''
        ) {
          return value === 0;
        }
        return value > 0;
      }
    ),
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

    createBoxBrand(
      {
        ...boxBrandData,
        boxQuantity: Number(boxQuantity),
        netWeightBox: Number(netWeightBox),
        grossWeightBox: Number(grossWeightBox),
        // Materiales por caja
        bottomTypeId: !!values.bottomTypeId ? values.bottomTypeId : 0,
        lidTypeId: !!values.lidTypeId ? values.lidTypeId : 0,
        coverTypeId: !!values.coverTypeId ? values.coverTypeId : 0,
        cardboardTypeId: !!values.cardboardTypeId ? values.cardboardTypeId : 0,
        parasealTypeId: !!values.parasealTypeId ? values.parasealTypeId : 0,
        padTypeId: !!values.padTypeId ? values.padTypeId : 0,
        spongeTypeId: !!values.spongeTypeId ? values.spongeTypeId : 0,
        labelId: !!values.labelId ? values.labelId : 0,
        bandId: !!values.bandId ? values.bandId : 0,
        sachetId: !!values.sachetId ? values.sachetId : 0,
        rubberId: !!values.rubberId ? values.rubberId : 0,
        protectorId: !!values.protectorId ? values.protectorId : 0,
        clusterBagId: !!values.clusterBagId ? values.clusterBagId : 0,
        // Materiales por contenedor
        palletsTypeId: !!values.palletsTypeId ? values.palletsTypeId : 0,
        miniPalletsTypeId: !!values.miniPalletsTypeId
          ? values.miniPalletsTypeId
          : 0,
        cornerTypeId: !!values.cornerTypeId ? values.cornerTypeId : 0,
        reinforcementTypeId: !!values.reinforcementTypeId
          ? values.reinforcementTypeId
          : 0,
        stapleId: !!values.stapleId ? values.stapleId : 0,
        strippingId: !!values.strippingId ? values.strippingId : 0,
        thermographId: !!values.thermographId ? values.thermographId : 0,
        sealId: !!values.sealId ? values.sealId : 0,
        mettoLabelId: !!values.mettoLabelId ? values.mettoLabelId : 0,
        // Adicionales
        latexRemoverId: !!values.latexRemoverId ? values.latexRemoverId : 0,
        blockingSheetId: !!values.blockingSheetId ? values.blockingSheetId : 0,
        packingTapeTypeId: !!values.packingTapeTypeId
          ? values.packingTapeTypeId
          : 0,
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
                <BottomSelectBanContanier
                  name1={'bottomTypeId'}
                  label1={'Fondo'}
                  placeholder1={'Seleccione el Fondo'}
                  name2={'bottomTypeQuantity'}
                  label2={'Fondos/Caja'}
                  placeholder2={'Cantidad'}
                  quantity={values.boxQuantity}
                  unit='U/C'
                />

                <LidSelectBanContanier
                  name1={'lidTypeId'}
                  label1={'Tapa'}
                  placeholder1={'Seleccione la Tapa'}
                  name2={'lidTypeQuantity'}
                  label2={'Tapas/Caja'}
                  placeholder2={'Cantidad'}
                  quantity={values.boxQuantity}
                  unit='U/C'
                />

                <CoverSelectBanContanier
                  name1={'coverTypeId'}
                  label1={'Funda'}
                  placeholder1={'Seleccione la Funda'}
                  name2={'coverTypeQuantity'}
                  label2={'Fundas/Caja'}
                  placeholder2={'Cantidad'}
                  quantity={values.boxQuantity}
                  unit='U/C'
                />

                <CardboardSelectBanContanier
                  name1={'cardboardTypeId'}
                  label1={'Cartulina'}
                  placeholder1={'Seleccione la Cartulina'}
                  name2={'cardboardTypeQuantity'}
                  label2={'Cartulinas/Caja'}
                  placeholder2={'Cantidad'}
                  quantity={values.boxQuantity}
                  unit='U/C'
                />

                <ParasealSelectBanContainer
                  name1={'parasealTypeId'}
                  label1={'ParaSeal'}
                  placeholder1={'Seleccione el ParaSeal'}
                  name2={'parasealTypeQuantity'}
                  label2={'ParaSeals/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />

                <PadSelectBanContainer
                  name1={'padTypeId'}
                  label1={'Pad'}
                  placeholder1={'Seleccione el Pad'}
                  name2={'padTypeQuantity'}
                  label2={'Pads/Caja'}
                  placeholder2={'Cantidad'}
                  unit='U/C'
                />

                <SpongeSelectBanContainer
                  name1={'spongeTypeId'}
                  label1={'Esponja'}
                  placeholder1={'Seleccione la Esponja'}
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
                <PalletSelectBanContanier
                  name1={'palletsTypeId'}
                  label1={'Pallet'}
                  placeholder1={'Seleccione el Pallet'}
                  name2={'palletsTypeQuantity'}
                  label2={'Pallets/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit={'U/C'}
                />

                <MiniPalletSelectBanContanier
                  name1={'miniPalletsTypeId'}
                  label1={'Mini Pallet'}
                  placeholder1={'Seleccione el Mini Pallet'}
                  name2={'miniPalletsTypeQuantity'}
                  label2={'Mini Pallets/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit={'U/C'}
                />

                <CornerSelectBanContainer
                  name1={'cornerTypeId'}
                  label1={'Esquineros'}
                  placeholder1={'Seleccione el Esquinero'}
                  name2={'cornerTypeQuantity'}
                  label2={'Esquineros/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='C/C'
                />

                <ReinforcementSelectBanContainer
                  name1={'reinforcementTypeId'}
                  label1={'Refuerzo'}
                  placeholder1={'Seleccione el Refuerzo'}
                  name2={'reinforcementTypeQuantity'}
                  label2={'Refuerzos/Contenedor'}
                  placeholder2={'Cantidad'}
                  unit='C/C'
                />

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
                <PackingTapeSelectBanContanier
                  name1={'packingTapeTypeId'}
                  label1={'Cinta de embalaje'}
                  placeholder1={'Seleccione la Cinta de embalaje'}
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
