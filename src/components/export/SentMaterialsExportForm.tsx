import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import InputFieldSentInsecticides from './ui/InputFieldSentInsecticides';
import InputFieldSentPesticides from './ui/InputFieldSentPesticides';
import InputFieldSentQuantity from './ui/InputFieldSentQuantity';
import { useCreateExportSent } from '../../hooks/export/export-sent/createExportSent';
import { ExportType } from '../../types/export';

interface PesticideProps {
  pesticideId: number | '';
  quantity: number | '';
}

interface InsecticideProps {
  insecticideId: number | '';
  quantity: number | '';
}

interface ValuesProps {
  exportId: number | '';
  // materials
  bottomTypeQuantity: number | '';
  lidTypeQuantity: number | '';
  coverTypeQuantity: number | '';
  cardboardTypeQuantity: number | '';
  parasealTypeQuantity: number | '';
  padTypeQuantity: number | '';
  spongeTypeQuantity: number | '';
  // select
  labelQuantity: number | '';
  bandQuantity: number | '';
  sachetQuantity: number | '';
  rubberQuantity: number | '';
  protectorQuantity: number | '';
  clusterBagQuantity: number | '';
  // post harvest
  pesticideSent: PesticideProps[];
  // container
  palletsTypeQuantity: number | '';
  miniPalletsTypeQuantity: number | '';
  cornerTypeQuantity: number | '';
  reinforcementTypeQuantity: number | '';
  // select
  stapleQuantity: number | '';
  strippingQuantity: number | '';
  thermographQuantity: number | '';
  sealQuantity: number | '';
  mettoLabelQuantity: number | '';
  // additions
  packingTapeTypeQuantity: number | '';
  // select
  latexRemoverQuantity: number | '';
  blockingSheetQuantity: number | '';
  insecticideSent: InsecticideProps[];
}

const initialValues: ValuesProps = {
  exportId: '',

  bottomTypeQuantity: '',
  lidTypeQuantity: '',
  coverTypeQuantity: '',
  cardboardTypeQuantity: '',
  parasealTypeQuantity: '',
  padTypeQuantity: '',
  spongeTypeQuantity: '',

  labelQuantity: '',
  bandQuantity: '',
  sachetQuantity: '',
  rubberQuantity: '',
  protectorQuantity: '',
  clusterBagQuantity: '',

  pesticideSent: [{ pesticideId: '', quantity: '' }],

  palletsTypeQuantity: '',
  miniPalletsTypeQuantity: '',
  cornerTypeQuantity: '',
  reinforcementTypeQuantity: '',

  stapleQuantity: '',
  strippingQuantity: '',
  thermographQuantity: '',
  sealQuantity: '',
  mettoLabelQuantity: '',

  packingTapeTypeQuantity: '',

  latexRemoverQuantity: '',
  blockingSheetQuantity: '',
  insecticideSent: [{ insecticideId: '', quantity: '' }],
};

const pesticideSchema = Yup.object().shape({
  quantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
});

const insecticideSchema = Yup.object().shape({
  quantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
});

const validationSchema = Yup.object({
  bottomTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  lidTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  coverTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  cardboardTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  parasealTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  padTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  spongeTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  labelQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  bandQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  sachetQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  rubberQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  protectorQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  clusterBagQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),

  pesticideSent: Yup.array()
    .of(pesticideSchema)
    .min(1, 'Debe de tener al menos un pesticida'),

  palletsTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  miniPalletsTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  cornerTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  reinforcementTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  stapleQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  strippingQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  thermographQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  sealQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  mettoLabelQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  packingTapeTypeQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  latexRemoverQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  blockingSheetQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),

  insecticideSent: Yup.array()
    .of(insecticideSchema)
    .min(0, 'No puede ser un número negativo pesticida'),
});

const SentMaterialsExportForm = ({
  exportSelected,
  pathname,
}: {
  exportSelected: Partial<ExportType>;
  pathname: string;
}) => {
  const [initialValuesExport, setInitialValuesExport] =
    useState<ValuesProps>(initialValues);
  const { createExportSent } = useCreateExportSent();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (exportSelected) {
      setInitialValuesExport((prevValues) => {
        const pesticidesSelected: PesticideProps[] =
          exportSelected.boxBrand?.pesticideCocktail?.map((pesticide) => ({
            pesticideId: pesticide.pesticide?.id!,
            quantity: pesticide.quantity!,
          })) || [];

        const insecticidesSelected: InsecticideProps[] =
          exportSelected.boxBrand?.insecticideCocktail?.map((insecticide) => ({
            insecticideId: insecticide.insecticide?.id!,
            quantity: insecticide.quantity!,
          })) || [];

        return {
          ...prevValues,
          exportId: exportSelected.id!,
          bottomTypeQuantity: exportSelected.boxQuantity!,
          lidTypeQuantity: exportSelected.boxQuantity!,
          coverTypeQuantity: exportSelected.boxQuantity!,
          cardboardTypeQuantity: exportSelected.boxQuantity!,
          parasealTypeQuantity: exportSelected.boxBrand?.parasealTypeQuantity!,
          padTypeQuantity: exportSelected.boxBrand?.padTypeQuantity!,
          spongeTypeQuantity: exportSelected.boxBrand?.spongeTypeQuantity!,
          labelQuantity: exportSelected.boxBrand?.labelQuantity!,
          bandQuantity: exportSelected.boxBrand?.bandQuantity!,
          sachetQuantity: exportSelected.boxBrand?.sachetQuantity!,
          rubberQuantity: exportSelected.boxBrand?.rubberQuantity!,
          protectorQuantity: exportSelected.boxBrand?.protectorQuantity!,
          clusterBagQuantity: exportSelected.boxBrand?.clusterBagQuantity!,

          pesticideSent: pesticidesSelected,

          palletsTypeQuantity: exportSelected.boxBrand?.palletsTypeQuantity!,
          miniPalletsTypeQuantity:
            exportSelected.boxBrand?.miniPalletsTypeQuantity!,
          cornerTypeQuantity: exportSelected.boxBrand?.cornerTypeQuantity!,
          reinforcementTypeQuantity:
            exportSelected.boxBrand?.reinforcementTypeQuantity!,
          stapleQuantity: exportSelected.boxBrand?.stapleQuantity!,
          strippingQuantity: exportSelected.boxBrand?.strippingQuantity!,
          thermographQuantity: exportSelected.boxBrand?.thermographQuantity!,
          sealQuantity: exportSelected.boxBrand?.sealQuantity!,
          mettoLabelQuantity: exportSelected.boxBrand?.mettoLabelQuantity!,
          packingTapeTypeQuantity:
            exportSelected.boxBrand?.packingTapeTypeQuantity!,
          latexRemoverQuantity: exportSelected.boxBrand?.latexRemoverQuantity!,
          blockingSheetQuantity:
            exportSelected.boxBrand?.blockingSheetQuantity!,

          insecticideSent: insecticidesSelected,
        };
      });
    }
  }, [exportSelected]);

  const sentMaterialsExport = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('values: ', values);

    createExportSent(
      {
        ...values,
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
        },
        onSuccess: () => {
          toast({
            title: 'Registro de insumos enviados',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('exportsSent');
          queryClient.invalidateQueries('exportsSentPending');
          actions.resetForm();
          router.push(pathname.replace(/\/\d+$/, ''));
        },
      }
    );

    return;
  };

  return (
    <Formik
      initialValues={initialValuesExport}
      enableReinitialize={true}
      onSubmit={sentMaterialsExport}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Exportación
            </Heading>
            <Divider mb={'16px'} />

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <Box>
                <FormLabel>Cantidad de cajas</FormLabel>
                <Input
                  value={exportSelected?.boxQuantity || ''}
                  isReadOnly={true}
                  focusBorderColor='gray.200'
                  _hover={{ borderColor: 'gray.200' }}
                  cursor={'not-allowed'}
                  textAlign='right'
                  opacity={0.8}
                />
              </Box>
            </SimpleGrid>

            {!!exportSelected && (
              <>
                <Heading fontSize={'2xl'} p={'12px'}>
                  Materiales para las cajas
                </Heading>
                <Divider mb={'16px'} />
                {/* materials */}
                <InputFieldSentQuantity
                  name={'bottomTypeQuantity'}
                  material={'Fondo'}
                  materialSelected={exportSelected.boxBrand?.bottomType!}
                  quantity={exportSelected.boxQuantity!}
                />

                <InputFieldSentQuantity
                  name={'lidTypeQuantity'}
                  material={'Tapa'}
                  materialSelected={exportSelected.boxBrand?.lidType!}
                  quantity={exportSelected.boxQuantity!}
                />

                <InputFieldSentQuantity
                  name={'coverTypeQuantity'}
                  material={'Funda'}
                  materialSelected={exportSelected.boxBrand?.coverType!}
                  quantity={exportSelected.boxQuantity!}
                />

                <InputFieldSentQuantity
                  name={'cardboardTypeQuantity'}
                  material={'Cartulina'}
                  materialSelected={exportSelected.boxBrand?.cardboardType!}
                  quantity={exportSelected.boxQuantity!}
                />

                <InputFieldSentQuantity
                  name={'parasealTypeQuantity'}
                  material={'ParaSeal'}
                  materialSelected={exportSelected.boxBrand?.parasealType!}
                  quantity={exportSelected.boxBrand?.parasealTypeQuantity!}
                />

                <InputFieldSentQuantity
                  name={'padTypeQuantity'}
                  material={'Pad'}
                  materialSelected={exportSelected.boxBrand?.padType!}
                  quantity={exportSelected.boxBrand?.padTypeQuantity!}
                />

                <InputFieldSentQuantity
                  name={'spongeTypeQuantity'}
                  material={'Esponja'}
                  materialSelected={exportSelected.boxBrand?.spongeType!}
                  quantity={exportSelected.boxBrand?.spongeTypeQuantity!}
                />

                <InputFieldSentQuantity
                  name={'labelQuantity'}
                  material={'Etiqueta'}
                  materialSelected={exportSelected.boxBrand?.label?.name!}
                  quantity={Number(exportSelected.boxBrand?.labelQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'bandQuantity'}
                  material={'Banda'}
                  materialSelected={exportSelected.boxBrand?.band?.name!}
                  quantity={Number(exportSelected.boxBrand?.bandQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'sachetQuantity'}
                  material={'Sachet'}
                  materialSelected={exportSelected.boxBrand?.sachet?.name!}
                  quantity={Number(exportSelected.boxBrand?.sachetQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'rubberQuantity'}
                  material={'Liga'}
                  materialSelected={exportSelected.boxBrand?.rubber?.name!}
                  quantity={Number(exportSelected.boxBrand?.rubberQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'protectorQuantity'}
                  material={'Protector'}
                  materialSelected={exportSelected.boxBrand?.protector?.name!}
                  quantity={Number(exportSelected.boxBrand?.protectorQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'clusterBagQuantity'}
                  material={'Cluster Bag'}
                  materialSelected={exportSelected.boxBrand?.clusterBag?.name!}
                  quantity={Number(
                    exportSelected.boxBrand?.clusterBagQuantity!
                  )}
                />

                <Heading fontSize={'2xl'} p={'12px'}>
                  Materiales para post cosecha
                </Heading>
                <Divider mb={'16px'} />

                <Heading fontSize={'xl'} p={'10px'}>
                  Pesticidas
                </Heading>
                <Divider mb={'16px'} />

                <InputFieldSentPesticides
                  name={'pesticideSent'}
                  pesticideCocktailSelected={
                    exportSelected.boxBrand?.pesticideCocktail!
                  }
                />

                <Heading fontSize={'2xl'} p={'12px'}>
                  Materiales para contenedor
                </Heading>
                <Divider mb={'16px'} />
                {/* container */}
                <InputFieldSentQuantity
                  name={'palletsTypeQuantity'}
                  material={'Pallet'}
                  materialSelected={exportSelected.boxBrand?.palletsType!}
                  quantity={Number(
                    exportSelected.boxBrand?.palletsTypeQuantity!
                  )}
                />

                <InputFieldSentQuantity
                  name={'miniPalletsTypeQuantity'}
                  material={'Mini pallet'}
                  materialSelected={exportSelected.boxBrand?.miniPalletsType!}
                  quantity={Number(
                    exportSelected.boxBrand?.miniPalletsTypeQuantity!
                  )}
                />

                <InputFieldSentQuantity
                  name={'cornerTypeQuantity'}
                  material={'Esquinero'}
                  materialSelected={exportSelected.boxBrand?.cornerType!}
                  quantity={Number(
                    exportSelected.boxBrand?.cornerTypeQuantity!
                  )}
                />

                <InputFieldSentQuantity
                  name={'reinforcementTypeQuantity'}
                  material={'Refuerzo/Mini esquinero'}
                  materialSelected={exportSelected.boxBrand?.reinforcementType!}
                  quantity={Number(
                    exportSelected.boxBrand?.reinforcementTypeQuantity!
                  )}
                />

                <InputFieldSentQuantity
                  name={'stapleQuantity'}
                  material={'Grapa'}
                  materialSelected={exportSelected.boxBrand?.staple?.name!}
                  quantity={Number(exportSelected.boxBrand?.stapleQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'strippingQuantity'}
                  material={'Zuncho'}
                  materialSelected={exportSelected.boxBrand?.stripping?.name!}
                  quantity={Number(exportSelected.boxBrand?.strippingQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'thermographQuantity'}
                  material={'Termografo'}
                  materialSelected={exportSelected.boxBrand?.thermograph?.name!}
                  quantity={Number(
                    exportSelected.boxBrand?.thermographQuantity!
                  )}
                />

                <InputFieldSentQuantity
                  name={'sealQuantity'}
                  material={'Sello'}
                  materialSelected={exportSelected.boxBrand?.seal?.name!}
                  quantity={Number(exportSelected.boxBrand?.sealQuantity!)}
                />

                <InputFieldSentQuantity
                  name={'mettoLabelQuantity'}
                  material={'Etiqueta Metto'}
                  materialSelected={exportSelected.boxBrand?.mettoLabel?.name!}
                  quantity={Number(
                    exportSelected.boxBrand?.mettoLabelQuantity!
                  )}
                />
                <Heading fontSize={'2xl'} p={'12px'}>
                  Materiales adicionales
                </Heading>
                <Divider mb={'16px'} />
                {/* additions */}
                <InputFieldSentQuantity
                  name={'packingTapeTypeQuantity'}
                  material={'Cinta de embalaje'}
                  materialSelected={exportSelected.boxBrand?.packingTapeType!}
                  quantity={Number(
                    exportSelected.boxBrand?.packingTapeTypeQuantity!
                  )}
                />

                <InputFieldSentQuantity
                  name={'latexRemoverQuantity'}
                  material={'Removedor de latex'}
                  materialSelected={
                    exportSelected.boxBrand?.latexRemover?.name!
                  }
                  quantity={Number(
                    exportSelected.boxBrand?.latexRemoverQuantity!
                  )}
                />

                <InputFieldSentQuantity
                  name={'blockingSheetQuantity'}
                  material={'Lamina de bloque'}
                  materialSelected={
                    exportSelected.boxBrand?.blockingSheet?.name!
                  }
                  quantity={Number(
                    exportSelected.boxBrand?.blockingSheetQuantity!
                  )}
                />

                <Heading fontSize={'xl'} p={'10px'}>
                  Insecticidas
                </Heading>
                <Divider mb={'16px'} />

                <InputFieldSentInsecticides
                  name={'insecticideSent'}
                  insecticideCocktailSelected={
                    exportSelected.boxBrand?.insecticideCocktail!
                  }
                />

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
              </>
            )}
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default SentMaterialsExportForm;
