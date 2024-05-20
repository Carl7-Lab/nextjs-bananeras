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
import InputFieldBlockingSheetSelect from './additions/blocking-sheet/InputFieldBlockingSheetSelect';
import InputFieldCochibiolSelect from './additions/cochibiol/InputFieldCochibiolSelect';
import InputFieldLatexRemoverSelect from './additions/latex-remover/InputFieldLatexRemoverSelect';
import InputFieldMettoLabelSelect from './container/metto-label/InputFieldMettoLabelSelect';
import InputFieldSealSelect from './container/seal/InputFieldSealSelect';
import InputFieldStapleSelect from './container/staple/InputFieldStapleSelect';
import InputFieldStrappingSelect from './container/strapping/InputFieldStrappingSelect';
import InputFieldThermographSelect from './container/thermograph/InputFieldThermographSelect';
import InputFieldBandSelect from './materials/band/InputFieldBandSelect';
import InputFieldClusterBagSelect from './materials/cluster-bag/InputFieldClusterBagSelect';
import InputFieldLabelSelect from './materials/label/InputFieldLabelSelect';
import InputFieldProtectorSelect from './materials/protector/InputFieldProtectorSelect';
import InputFieldRubberSelect from './materials/rubber/InputFieldRubberSelect';
import InputFieldSachetSelect from './materials/sachet/InputFieldSachetSelect';
import InputFieldPesticideSelect from './post-harvest/pesticide/InputFieldPesticideSelect';
import InputFieldBrandSelect from './specifications/brand/InputFieldBrandSelect';
import InputFieldCertificateMultiSelect from './specifications/certificate/InputFieldCertificateMultiSelect';
import InputFieldQuatity from '../ui/form/InputFieldQuatity';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  // specifications
  brandId: number | '';
  name: string;
  brandCode: string;
  boxQuantity: number | '';
  netWeightBox: number | '';
  grossWeightBox: number | '';
  certificates: number | '';

  // materials
  bottomType: string;
  lidType: string;
  coverType: string;
  cardboardType: string;
  padType: string;
  spongeType: string;
  // select
  labelId: number | '';
  labelIdQuantity: number | '';
  bandId: number | '';
  bandIdQuantity: number | '';
  sachetId: number | '';
  sachetIdQuantity: number | '';
  rubberId: number | '';
  rubberIdQuantity: number | '';
  protectorId: number | '';
  protectorIdQuantity: number | '';
  clusterBagId: number | '';
  clusterBagIdQuantity: number | '';

  // post harvest
  pesticideId: number | '';
  pesticideIdQuantity: number | '';

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
  stapleIdQuantity: number | '';
  strappingId: number | '';
  strappingIdQuantity: number | '';
  thermographId: number | '';
  thermographIdQuantity: number | '';
  sealId: number | '';
  sealIdQuantity: number | '';
  mettoLabelId: number | '';
  mettoLabelIdQuantity: number | '';

  // additions
  packingTapeType: string;
  packingTapeTypeQuantity: number | '';
  // select
  latexRemoverId: number | '';
  latexRemoverIdQuantity: number | '';
  cochibiolId: number | '';
  cochibiolIdQuantity: number | '';
  blockingSheetId: number | '';
  blockingSheetIdQuantity: number | '';
}

const initialValues: ValuesProps = {
  brandId: '',
  name: '',
  brandCode: '',
  boxQuantity: '',
  netWeightBox: '',
  grossWeightBox: '',
  certificates: '',

  bottomType: '',
  lidType: '',
  coverType: '',
  cardboardType: '',
  padType: '',
  spongeType: '',

  labelId: '',
  labelIdQuantity: '',
  bandId: '',
  bandIdQuantity: '',
  sachetId: '',
  sachetIdQuantity: '',
  rubberId: '',
  rubberIdQuantity: '',
  protectorId: '',
  protectorIdQuantity: '',
  clusterBagId: '',
  clusterBagIdQuantity: '',

  pesticideId: '',
  pesticideIdQuantity: '',

  palletsType: '',
  palletsTypeQuantity: '',
  miniPalletsType: '',
  miniPalletsTypeQuantity: '',
  cornerType: '',
  cornerTypeQuantity: '',
  reinforcementType: '',
  reinforcementTypeQuantity: '',

  stapleId: '',
  stapleIdQuantity: '',
  strappingId: '',
  strappingIdQuantity: '',
  thermographId: '',
  thermographIdQuantity: '',
  sealId: '',
  sealIdQuantity: '',
  mettoLabelId: '',
  mettoLabelIdQuantity: '',

  packingTapeType: '',
  packingTapeTypeQuantity: '',

  latexRemoverId: '',
  latexRemoverIdQuantity: '',
  cochibiolId: '',
  cochibiolIdQuantity: '',
  blockingSheetId: '',
  blockingSheetIdQuantity: '',
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
  certificates: Yup.array()
    .min(1, 'At least one harbor must be selected')
    .required('Required')
    .of(Yup.number().required()),

  bottomType: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  lidType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  coverType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  cardboardType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  padType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  spongeType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),

  labelId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  labelIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  bandId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  bandIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  sachetId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  sachetIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  rubberId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  rubberIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  protectorId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  protectorIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  clusterBagId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  clusterBagIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),

  pesticideId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  pesticideIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),

  palletsType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  palletsTypeQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  miniPalletsType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  miniPalletsTypeQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  cornerType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  cornerTypeQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  reinforcementType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  reinforcementTypeQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),

  stapleId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  stapleIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  strappingId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  strappingIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  thermographId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  thermographIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  sealId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  sealIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  mettoLabelId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  mettoLabelIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),

  packingTapeType: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  packingTapeTypeQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),

  latexRemoverId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  latexRemoverIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  cochibiolId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  cochibiolIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  blockingSheetId: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  blockingSheetIdQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
});

interface InputFieldTextProps {
  name: string;
  label: string;
  placeholder?: string;
}

const specificationsInputFields: InputFieldTextProps[] = [
  { name: 'name', label: 'Tipo' },
  { name: 'brandCode', label: 'Código' },
  { name: 'boxQuantity', label: 'Número de cajas/Contenedor' },
  { name: 'netWeightBox', label: 'Peso Neto de Caja' },
  { name: 'grossWeightBox', label: 'Peso Bruto de Caja' },
];
// TODO: peso de caja agregar seleccion de unidades lb o kg
// TODO: dimensiones de cartulina agregar seleccion de unidades m, cm y in
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
  {
    name1: 'padType',
    label1: 'Pad',
    name2: 'boxQuantity',
    label2: 'Cantidad',
  },
  {
    name1: 'spongeType',
    label1: 'Esponja',
    name2: 'boxQuantity',
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
                {specificationsInputFields.map((field, index) => (
                  <InputFieldText
                    key={index}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                ))}
                <InputFieldCertificateMultiSelect
                  name={'certificates'}
                  label={'Cerificado/s'}
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
                      <InputFieldQuatity
                        isReadOnly={true}
                        name={name2}
                        label={label2}
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
                  <InputFieldQuatity
                    name={'labelIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldBandSelect
                    name={'bandId'}
                    label={'Banda'}
                    placeholder={'Seleccione la banda'}
                  />
                  <InputFieldQuatity
                    name={'bandIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldSachetSelect
                    name={'sachetId'}
                    label={'Sachet'}
                    placeholder={'Seleccione el sachet'}
                  />
                  <InputFieldQuatity
                    name={'sachetIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldRubberSelect
                    name={'rubberId'}
                    label={'Liga'}
                    placeholder={'Seleccione la liga'}
                  />
                  <InputFieldQuatity
                    name={'rubberIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldProtectorSelect
                    name={'protectorId'}
                    label={'Protector'}
                    placeholder={'Seleccione el protector'}
                  />
                  <InputFieldQuatity
                    name={'protectorIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldClusterBagSelect
                    name={'clusterBagId'}
                    label={'Cluster Bag'}
                    placeholder={'Seleccione el cluster bag'}
                  />
                  <InputFieldQuatity
                    name={'clusterBagIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales post cosecha
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <Flex gap={2}>
                  <InputFieldPesticideSelect
                    name={'pesticideId'}
                    label={'Pesticida'}
                    placeholder={'Seleccione el pesticida'}
                  />
                  <InputFieldQuatity
                    name={'pesticideIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales por contenedor
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                {containersInputFields.map(
                  ({ name1, label1, name2, label2 }, index) => (
                    <Flex key={index} gap={2}>
                      <InputFieldText name={name1} label={label1} />
                      <InputFieldQuatity name={name2} label={label2} />
                    </Flex>
                  )
                )}

                <Flex gap={2}>
                  <InputFieldStapleSelect
                    name={'stapleId'}
                    label={'Grapa'}
                    placeholder={'Seleccione la grapa'}
                  />
                  <InputFieldQuatity
                    name={'stapleIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldStrappingSelect
                    name={'strappingId'}
                    label={'Zuncho'}
                    placeholder={'Seleccione la grapa'}
                  />
                  <InputFieldQuatity
                    name={'strappingIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldThermographSelect
                    name={'thermographId'}
                    label={'Termografo'}
                    placeholder={'Seleccione el termografo'}
                  />
                  <InputFieldQuatity
                    name={'thermographIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldSealSelect
                    name={'sealId'}
                    label={'Sello'}
                    placeholder={'Seleccione el sello'}
                  />
                  <InputFieldQuatity
                    name={'sealIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldMettoLabelSelect
                    name={'mettoLabelId'}
                    label={'Etiqueta Metto'}
                    placeholder={'Seleccione la etiqueta Metto'}
                  />
                  <InputFieldQuatity
                    name={'mettoLabelIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Adicionales
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <Flex gap={2}>
                  <InputFieldText
                    name={'packingTapeType'}
                    label={'Cinta de embalaje'}
                  />
                  <InputFieldQuatity
                    name={'packingTapeTypeQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>

                <Flex gap={2}>
                  <InputFieldLatexRemoverSelect
                    name={'latexRemoverId'}
                    label={'Removedor de latex'}
                    placeholder={'Seleccione la removedor de latex'}
                  />
                  <InputFieldQuatity
                    name={'latexRemoverIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldCochibiolSelect
                    name={'cochibiolId'}
                    label={'Cochibiol'}
                    placeholder={'Seleccione el cochibiol'}
                  />
                  <InputFieldQuatity
                    name={'cochibiolIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
                <Flex gap={2}>
                  <InputFieldBlockingSheetSelect
                    name={'blockingSheetId'}
                    label={'Lamina de bloque'}
                    placeholder={'Seleccione la lamina de bloque'}
                  />
                  <InputFieldQuatity
                    name={'blockingSheetIdQuantity'}
                    label={'Cantidad'}
                  />
                </Flex>
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
