import {
  Box,
  Button,
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
import { BoxBrandType } from '../../../types/box-brand/boxBrand';
import { ExportSentType } from '../../../types/exportSent';
import { HarborType } from '../../../types/harbor';
import { MerchantType } from '../../../types/merchant/merchant';
import SelectBoxBrand from '../../box-brands/SelectBoxBrand';
import SelectHarbor from '../../harbor/SelectHarbor';
import SelectProducer from '../../producer/SelectProducer';
import InputFieldNumber from '../../ui/form/InputFieldNumber';
import InputFieldTextArea from '../../ui/form/InputFieldTextArea';

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
});

const PendingPaymentForm = ({
  paymentSelected,
  pathname,
}: {
  paymentSelected: Partial<ExportSentType>;
  pathname: string;
}) => {
  const [initialValuesPayment, setInitialValuesPayment] =
    useState<ValuesProps>(initialValues);
  const [producerSelect, setProducerSelect] =
    useState<Partial<MerchantType> | null>(paymentSelected?.export!.merchant!);
  const [departureHarbor, setDepartureHarbor] =
    useState<Partial<HarborType> | null>(paymentSelected?.export!.harbor!);
  const [boxBrand, setBoxBrand] = useState<Partial<BoxBrandType> | null>(
    paymentSelected?.export!.boxBrand!
  );
  const { createProducerPayment } = useCreateProducerPayment();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (paymentSelected) {
      setInitialValuesPayment((prevValues) => ({
        ...prevValues,
        exportSentId: Number(paymentSelected.id),
        merchantId: Number(paymentSelected.export?.merchant?.id),
        departureHarborId: Number(paymentSelected.export?.harbor?.id),
        boxQuantity: Number(paymentSelected.export?.boxQuantity),
        boxBrandId: Number(paymentSelected.export?.boxBrand?.id),
      }));
    }
  }, [paymentSelected]);

  const sentPayment = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const {
      amount,
      boxQuantity,
      materials,
      others,
      price,
      subtotal1,
      subtotal2,
      total,
      transport,
      ...sentPaymentData
    } = values;

    createProducerPayment(
      {
        ...sentPaymentData,
        amount: Number(amount),
        boxQuantity: Number(boxQuantity),
        materials: Number(materials),
        others: Number(others),
        price: Number(price),
        subtotal1: Number(subtotal1),
        subtotal2: Number(subtotal2),
        total: Number(total),
        transport: Number(transport),
      },
      {
        onError: (error: any) => {
          const { response } = error;
          const { data } = response;
          const { statusCode, message, error: errorTitle, model, prop } = data;
          {
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
          }
        },
        onSuccess: async () => {
          toast({
            title: 'Productor creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('producerPayments');
          actions.resetForm();
          router.push(pathname.replace(/\/\d+$/, ''));
        },
      }
    );
  };

  return (
    <Formik
      initialValues={initialValuesPayment}
      enableReinitialize={true}
      onSubmit={sentPayment}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Liquidacion a Productor
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
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Puerto de Destino
            </Heading>
            <Divider mb={'16px'} />

            <SelectHarbor name={'destinationHarborId'} />

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
              label={'Descripcion de los gastos'}
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
  );
};

export default PendingPaymentForm;
