/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import SelectProducer from './SelectProducer';
import { useCreateBankAccount } from '../../hooks/bank-account/createBankAccount';
import { ClientType } from '../../types/client';
import { MerchantType } from '../../types/merchant/merchant';
import SelectClient from '../client/SelectClient';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  merchantId: number | '';
  clientId: number | '';
  bank: string;
  owner: string;
  ownerID: string;
  accountNumber: string;
  type: 'Cta Ahorro' | 'Cta Corriente' | '';
  email: string;
  isProducer: boolean;
  isClient: boolean;
  dataReviewed: boolean;
}

const initialValues: ValuesProps = {
  merchantId: '',
  clientId: '',
  bank: '',
  owner: '',
  ownerID: '',
  accountNumber: '',
  type: '',
  email: '',
  isProducer: false,
  isClient: false,
  dataReviewed: false,
};

const validationSchema = Yup.object({
  isProducer: Yup.boolean().required(),
  merchantId: Yup.number()
    .integer('Debe ser un número entero')
    .typeError('Debe ser un número')
    .when('isProducer', (isProducer, schema) =>
      isProducer ? schema.required('Requerido') : schema
    ),
  isClient: Yup.boolean().required(),
  clientId: Yup.number()
    .integer('Debe ser un número entero')
    .typeError('Debe ser un número')
    .when('isClient', (isClient, schema) =>
      isClient ? schema.required('Requerido') : schema
    ),
  bank: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .transform((value) => value.trim())
    .required('Requerido')
    .matches(/^[a-zA-Z\s]+$/, 'Debe contener solo letras y espacios'),
  owner: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Solo debe contener letras, números y espacios'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  ownerID: Yup.string()
    .matches(/^[0-9]+$/, 'Debe contener solo dígitos')
    .test(
      'len',
      'Debe tener 10 o 13 caracteres',
      (val) => val?.length === 10 || val?.length === 13
    )
    .required('Requerido'),
  accountNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Debe contener solo dígitos')
    .transform((value) => value.trim())
    .length(10, 'Debe tener 10 caracteres')
    .required('Requerido'),
  type: Yup.string()
    .oneOf(['Cta Ahorro', 'Cta Corriente'], 'Tipo de cuenta inválido')
    .required('Requerido'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .max(50, 'Debe tener 50 caracteres o menos')
    .optional(),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

const typesOpt = [
  {
    name: 'Cta Ahorro',
    id: 'Cta Ahorro',
  },
  {
    name: 'Cta Corriente',
    id: 'Cta Corriente',
  },
];

const AddBankAccountForm = (): React.JSX.Element => {
  const pathname = usePathname();
  const [producer, setProducer] = useState<Partial<MerchantType> | null>(null);
  const isProducerPath = pathname === '/dashboard/producer/add-bank-account';
  const [client, setClient] = useState<Partial<ClientType> | null>(null);
  const isClientPath = pathname === '/dashboard/client/add-bank-account';

  const [initialValuesBankAccount, setInitialValuesBankAccount] =
    useState<ValuesProps>(initialValues);

  const { createBankAccount, isLoading } = useCreateBankAccount();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!!producer && isProducerPath) {
      setInitialValuesBankAccount((prevValues) => ({
        ...prevValues,
        merchantId: Number(producer.id!),
        clientId: 0,
        owner: producer.businessName!,
        ownerID: producer.businessId!,
        isProducer: isProducerPath,
        isClient: isClientPath,
      }));
    }

    if (!!client && isClientPath) {
      setInitialValuesBankAccount((prevValues) => ({
        ...prevValues,
        merchantId: 0,
        clientId: Number(client.id!),
        owner: client.businessName!,
        ownerID: client.businessId!,
        isProducer: isProducerPath,
        isClient: isClientPath,
      }));
    }

    if (!producer && !client) {
      setInitialValuesBankAccount((prevValues) => ({
        ...prevValues,
        merchantId: 0,
        clientId: 0,
        owner: '',
        ownerID: '',
        isProducer: false,
        isClient: false,
      }));
    }
  }, [producer, isProducerPath, client, isClientPath]);

  const addBankAccount = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ): Promise<void> => {
    const {
      dataReviewed,
      isClient,
      isProducer,
      merchantId,
      clientId,
      ...accountValues
    } = values;

    createBankAccount(
      {
        ...accountValues,
        merchantId: !!isProducer ? merchantId : undefined,
        clientId: !!isClient ? clientId : undefined,
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

          if (!!model && !!prop) {
            if (model === 'BankAccount' && prop === 'accountNumber') {
              formikHelpers.setFieldTouched(`${prop}`, true, false);
              formikHelpers.setFieldError(`${prop}`, message);
            }
          }
        },
        onSuccess: () => {
          toast({
            title: 'Cuenta Bancaria Agregada con Éxito',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('bankAccountsByMerchantId');
          formikHelpers.resetForm();
          setProducer(null);
          setClient(null);
          if (isProducer) {
            router.push('/dashboard/producer/producers');
          } else if (isClient) {
            router.push('/dashboard/client/bank-accounts');
          }
        },
      }
    );
  };

  return (
    <Formik
      initialValues={initialValuesBankAccount}
      enableReinitialize={true}
      onSubmit={addBankAccount}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, values }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            {isProducerPath && (
              <>
                <Heading fontSize={'2xl'} p={'12px'}>
                  Productor
                </Heading>
                <Divider mb={'16px'} />
                <SelectProducer
                  name={'merchantId'}
                  setProducerSelect={setProducer}
                />
              </>
            )}

            {isClientPath && (
              <>
                <Heading fontSize={'2xl'} p={'12px'}>
                  Cliente
                </Heading>
                <Divider mb={'16px'} />
                <SelectClient name={'clientId'} setClientSelect={setClient} />
              </>
            )}

            <Heading fontSize={'2xl'} p={'12px'}>
              Datos de cuenta bancaria
            </Heading>
            <Divider mb={'16px'} />

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <InputFieldText name={'bank'} label={'Banco'} />
              <InputFieldText name={'owner'} label={'Propietario'} />
              <InputFieldText name={'ownerID'} label={'Identificación'} />
              <InputFieldText name={'accountNumber'} label={'N° de Cuenta'} />
              <InputFieldSelector
                name={'type'}
                label={'Tipo de Cuenta'}
                options={typesOpt}
              />
              <InputFieldText name={'email'} label={'E-mail'} />
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
                isLoading={isLoading}
                onClick={() => {
                  console.log('errors: ', errors);
                  console.log('values: ', values);
                }}
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

export default AddBankAccountForm;
