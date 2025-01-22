import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import SelectBankAccount from './bank-account/SelectBankAccount';
import { useCreateProducerPayment } from '../../../hooks/export/producerPayment/createProducerPayment';
import { useUploadTransferImage } from '../../../hooks/export/producerPayment/uploadTransferImage';
import { BoxBrandType } from '../../../types/box-brand/boxBrand';
import { ExportSentType } from '../../../types/exportSent';
import { HarborType } from '../../../types/harbor';
import { MerchantType } from '../../../types/merchant/merchant';
import SelectBoxBrand from '../../box-brands/SelectBoxBrand';
import SelectHarbor from '../../harbor/SelectHarbor';
import SelectProducer from '../../producer/SelectProducer';
import UploadLogoFile from '../../producer/UploadLogoFile';
import CheckboxForm from '../../ui/form/CheckboxForm';
import InputFieldNumber from '../../ui/form/InputFieldNumber';
import InputFieldTextArea from '../../ui/form/InputFieldTextArea';

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/jpg',
];

interface ValuesProps {
  exportSentId: number | '';
  // selling
  merchantId: number | '';
  departureHarborId: number | '';
  destinationHarborId: number | '';
  boxQuantity: number | '';
  boxBrandId: number | '';
  subtotal1: number | '';
  price: number | '';
  // expenses
  transport: number | '';
  materials: number | '';
  others: number | '';
  description: string;
  subtotal2: number | '';
  total: number | '';

  sourceBankAccountId: number | '';
  destinationBankAccountId: number | '';
  amount: number | '';
  dataReviewed: boolean;
  transferFile: File | null;
}

const initialValues: ValuesProps = {
  exportSentId: '',
  // selling
  merchantId: '',
  departureHarborId: '',
  destinationHarborId: '',
  boxQuantity: '',
  boxBrandId: '',
  subtotal1: '',
  price: '',
  // expenses
  transport: '',
  materials: '',
  others: '',
  description: '',
  subtotal2: '',
  total: '',

  sourceBankAccountId: '',
  destinationBankAccountId: '',
  amount: '',
  dataReviewed: false,
  transferFile: null,
};

const validationSchema = Yup.object({
  exportSentId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  merchantId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  departureHarborId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  destinationHarborId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  boxQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  boxBrandId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  subtotal1: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  price: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),

  transport: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  materials: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  others: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  description: Yup.string().required('Required'),
  subtotal2: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  total: Yup.number().moreThan(0, 'Debe ser mayor que 0').required('Requerido'),

  sourceBankAccountId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  destinationBankAccountId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  amount: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
  transferFile: Yup.mixed()
    .required('Se requiere una imagen')
    .test('fileFormat', 'Formato no soportado', (value) => {
      return value && SUPPORTED_FORMATS.includes((value as File).type);
    }),
});

const PendingPaymentForm = ({
  paymentSelected,
  pathname,
}: {
  paymentSelected: Partial<ExportSentType>;
  pathname?: string;
}) => {
  const [initialValuesPayment, setInitialValuesPayment] =
    useState<ValuesProps>(initialValues);
  const [producerSelect, setProducerSelect] =
    useState<Partial<MerchantType> | null>(paymentSelected?.export!.merchant!);
  const [departureHarbor, setDepartureHarbor] =
    useState<Partial<HarborType> | null>(
      paymentSelected?.export!.harborDeparture!
    );
  const [destinationHarbor, setDestinationHarbor] =
    useState<Partial<HarborType> | null>(
      paymentSelected?.export!.harborDestination!
    );
  const [boxBrand, setBoxBrand] = useState<Partial<BoxBrandType> | null>(
    paymentSelected?.export!.boxBrand!
  );
  const { createProducerPayment, isLoading: createLoading } =
    useCreateProducerPayment();
  const { uploadTransferImage, isLoading } = useUploadTransferImage();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('paymentSelected: ', paymentSelected);
    if (paymentSelected) {
      setInitialValuesPayment((prevValues) => ({
        ...prevValues,
        exportSentId: Number(paymentSelected.id),
        merchantId: Number(paymentSelected.export?.merchant?.id),
        departureHarborId: Number(paymentSelected.export?.harborDeparture?.id),
        destinationHarborId: Number(
          paymentSelected.export?.harborDestination?.id
        ),
        boxQuantity: Number(paymentSelected.export?.boxQuantity),
        boxBrandId: Number(paymentSelected.export?.boxBrand?.id),
      }));
    }
  }, [paymentSelected]);

  const sentPayment = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    try {
      const {
        transferFile,
        amount,
        boxQuantity,
        materials,
        others,
        price,
        subtotal1,
        subtotal2,
        total,
        transport,
        dataReviewed,
        ...paymentData
      } = values;

      const { producerPaymentId } = await createProducerPayment({
        ...paymentData,
        amount: Number(amount),
        boxQuantity: Number(boxQuantity),
        materials: Number(materials),
        others: Number(others),
        price: Number(price),
        subtotal1: Number(subtotal1),
        subtotal2: Number(subtotal2),
        total: Number(total),
        transport: Number(transport),
      });

      if (transferFile) {
        await uploadTransferImage({
          file: transferFile,
          producerPaymentId,
          merchantId: Number(values.merchantId),
        });
      }

      toast({
        title: 'Liquidación y Archivo Subidos con Éxito',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      queryClient.invalidateQueries('producerPayments');
      actions.resetForm();
      router.push('/dashboard/export/producer-pending-payments');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Ocurrió un error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValuesPayment}
      enableReinitialize={true}
      onSubmit={sentPayment}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Liquidación a Productor
            </Heading>
            <Divider mb={'16px'} />

            <Heading fontSize={'2xl'} p={'12px'}>
              Productor
            </Heading>
            <Divider mb={'16px'} />

            <SelectProducer
              name={'merchantId'}
              setProducerSelect={setProducerSelect}
              producerSelect={producerSelect as Partial<MerchantType>}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Puerto de Salida
            </Heading>
            <Divider mb={'16px'} />

            <SelectHarbor
              name={'departureHarborId'}
              harborSelect={departureHarbor as Partial<HarborType>}
              setHarborSelect={setDepartureHarbor}
              type={'Nacional'}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Puerto de Destino
            </Heading>
            <Divider mb={'16px'} />

            <SelectHarbor
              name={'destinationHarborId'}
              harborSelect={destinationHarbor as Partial<HarborType>}
              setHarborSelect={setDestinationHarbor}
              type={'Internacional'}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Compra
            </Heading>
            <Divider mb={'16px'} />

            <SelectBoxBrand
              name={'boxBrandId'}
              name2={'boxQuantity'}
              namePrice={'price'}
              nameSubtotal1={'subtotal1'}
              boxQuantity={Number(values.boxQuantity)}
              price={Number(values.price)}
              contractType={producerSelect?.contractType}
              boxBrandSelect={boxBrand as Partial<BoxBrandType>}
              setBoxBrandSelect={setBoxBrand}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Gastos
            </Heading>
            <Divider mb={'16px'} />

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <InputFieldNumber
                name={'transport'}
                label={'Transporte'}
                isDecimal
                isDolar
              />
              <InputFieldNumber
                name={'materials'}
                label={'Materiales'}
                isDecimal
                isDolar
              />
              <InputFieldNumber
                name={'others'}
                label={'Varios'}
                isDecimal
                isDolar
              />
              <InputFieldNumber
                name={'subtotal2'}
                label={'Subtotal2'}
                value={
                  Number(values.transport) +
                  Number(values.materials) +
                  Number(values.others)
                }
                isDecimal
                isDolar
              />
              <Box></Box>
              <InputFieldNumber
                name={'total'}
                label={'Total'}
                isDecimal
                isDolar
                value={Number(values.subtotal1) - Number(values.subtotal2)}
              />
            </SimpleGrid>

            <InputFieldTextArea
              name={'description'}
              label={'Descripción de los gastos'}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Cuenta Bancaria Origen
            </Heading>
            <Divider mb={'16px'} />

            <SelectBankAccount name={'sourceBankAccountId'} />

            <Heading fontSize={'2xl'} p={'12px'}>
              Cuenta Bancaria Destino
            </Heading>
            <Divider mb={'16px'} />

            <SelectBankAccount name={'destinationBankAccountId'} />

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <Box></Box>
              <InputFieldNumber
                name={'amount'}
                label={'Monto'}
                isDecimal
                isDolar
                value={values.total}
              />
            </SimpleGrid>
            <Heading fontSize={'2xl'} p={'12px'}>
              Subir Transferencia
            </Heading>
            <Divider mb={'16px'} />
            <UploadLogoFile name={'transferFile'} />
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
                isLoading={createLoading || isLoading}
              >
                Enviar
              </Button>
            </SimpleGrid>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default PendingPaymentForm;
