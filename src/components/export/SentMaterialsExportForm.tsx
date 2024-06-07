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
import InputFieldSentQuantity from './ui/InputFieldSentQuantity';
import { useCreateExportSent } from '../../hooks/export/export-sent/createExportSent';
import { ExportType } from '../../types/export';

interface ValuesProps {
  export: number | '';
  // materials
  bottomTypeQuantity: number | '';
  lidTypeQuantity: number | '';
  coverTypeQuantity: number | '';
  cardboardTypeQuantity: number | '';
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
  pesticideQuantity: number | '';
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
  cochibiolQuantity: number | '';
  blockingSheetQuantity: number | '';
}

const initialValues: ValuesProps = {
  export: '',

  bottomTypeQuantity: '',
  lidTypeQuantity: '',
  coverTypeQuantity: '',
  cardboardTypeQuantity: '',
  padTypeQuantity: '',
  spongeTypeQuantity: '',

  labelQuantity: '',
  bandQuantity: '',
  sachetQuantity: '',
  rubberQuantity: '',
  protectorQuantity: '',
  clusterBagQuantity: '',

  pesticideQuantity: '',

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
  cochibiolQuantity: '',
  blockingSheetQuantity: '',
};

const validationSchema = Yup.object({
  export: Yup.number().required('Required'),
  bottomTypeQuantity: Yup.number().required('Required'),
  lidTypeQuantity: Yup.number().required('Required'),
  coverTypeQuantity: Yup.number().required('Required'),
  cardboardTypeQuantity: Yup.number().required('Required'),
  padTypeQuantity: Yup.number().required('Required'),
  spongeTypeQuantity: Yup.number().required('Required'),
  labelQuantity: Yup.number().required('Required'),
  bandQuantity: Yup.number().required('Required'),
  sachetQuantity: Yup.number().required('Required'),
  rubberQuantity: Yup.number().required('Required'),
  protectorQuantity: Yup.number().required('Required'),
  clusterBagQuantity: Yup.number().required('Required'),
  pesticideQuantity: Yup.number().required('Required'),
  palletsTypeQuantity: Yup.number().required('Required'),
  miniPalletsTypeQuantity: Yup.number().required('Required'),
  cornerTypeQuantity: Yup.number().required('Required'),
  reinforcementTypeQuantity: Yup.number().required('Required'),
  stapleQuantity: Yup.number().required('Required'),
  strippingQuantity: Yup.number().required('Required'),
  thermographQuantity: Yup.number().required('Required'),
  sealQuantity: Yup.number().required('Required'),
  mettoLabelQuantity: Yup.number().required('Required'),
  packingTapeTypeQuantity: Yup.number().required('Required'),
  latexRemoverQuantity: Yup.number().required('Required'),
  cochibiolQuantity: Yup.number().required('Required'),
  blockingSheetQuantity: Yup.number().required('Required'),
});

const SentMaterialsExportForm = ({
  exportSelected,
}: {
  exportSelected: Partial<ExportType>;
}) => {
  const [initialValuesExport, setInitialValuesExport] =
    useState<ValuesProps>(initialValues);
  const { createExportSent } = useCreateExportSent();
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (exportSelected) {
      setInitialValuesExport((prevValues) => ({
        ...prevValues,
        export: exportSelected.id!,
        bottomTypeQuantity: exportSelected.boxQuantity!,
        lidTypeQuantity: exportSelected.boxQuantity!,
        coverTypeQuantity: exportSelected.boxQuantity!,
        cardboardTypeQuantity: exportSelected.boxQuantity!,
        padTypeQuantity: exportSelected.boxQuantity!,
        spongeTypeQuantity: exportSelected.boxQuantity!,
        labelQuantity: exportSelected.boxBrand?.labelQuantity!,
        bandQuantity: exportSelected.boxBrand?.bandQuantity!,
        sachetQuantity: exportSelected.boxBrand?.sachetQuantity!,
        rubberQuantity: exportSelected.boxBrand?.rubberQuantity!,
        protectorQuantity: exportSelected.boxBrand?.protectorQuantity!,
        clusterBagQuantity: exportSelected.boxBrand?.clusterBagQuantity!,
        pesticideQuantity: exportSelected.boxBrand?.pesticideQuantity!,
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
        cochibiolQuantity: exportSelected.boxBrand?.cochibiolQuantity!,
        blockingSheetQuantity: exportSelected.boxBrand?.blockingSheetQuantity!,
      }));
    }
    console.log('SentMaterialsExportForm exportSelected: ', exportSelected);
  }, [exportSelected]);

  const sentMaterialsExport = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('sentMaterialsExport values: ', values);

    createExportSent(
      {
        ...values,
        export: {
          id: Number(values.export),
        },
      },
      {
        onError: (error) => {
          toast({
            title: 'Error.',
            description: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: 'Registro de materiales enviados',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('exportsSent');
          actions.resetForm();
          router.push('/dashboard/settings/pending-exports');
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
              {/* <InputFieldExportSelect
                name={'export'}
                label={'Exportación'}
                placeholder={'Seleccione la exportación'}
                setExport={setExportSelected}
              /> */}

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
                  name={'padTypeQuantity'}
                  material={'Pad'}
                  materialSelected={exportSelected.boxBrand?.padType!}
                  quantity={exportSelected.boxQuantity!}
                />

                <InputFieldSentQuantity
                  name={'spongeTypeQuantity'}
                  material={'Esponja'}
                  materialSelected={exportSelected.boxBrand?.spongeType!}
                  quantity={exportSelected.boxQuantity!}
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
                {/* post harvest */}
                <InputFieldSentQuantity
                  name={'pesticideQuantity'}
                  material={'Pesticidas'}
                  materialSelected={
                    exportSelected.boxBrand?.pesticide
                      ?.map((p) => p.name)
                      .join(', ') || ''
                  }
                  quantity={Number(exportSelected.boxBrand?.pesticideQuantity!)}
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
                  material={'Refuerzo'}
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
                  name={'cochibiolQuantity'}
                  material={'Insecticida'}
                  materialSelected={exportSelected.boxBrand?.cochibiol?.name!}
                  quantity={Number(exportSelected.boxBrand?.cochibiolQuantity!)}
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
