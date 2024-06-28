import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import SelectProducer from './SelectProducer';
import { useCreateBankAccount } from '../../hooks/bank-account/createBankAccount';
import { MerchantType } from '../../types/merchant/merchant';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  merchantId: number | '';
  bank: string;
  owner: string;
  ownerID: string;
  accountNumber: string;
  type: 'Cta Ahorro' | 'Cta Corriente' | '';
  email: string;
}

const initialValues: ValuesProps = {
  merchantId: '',
  bank: '',
  owner: '',
  ownerID: '',
  accountNumber: '',
  type: '',
  email: '',
};

const validationSchema = Yup.object({
  merchantId: Yup.number()
    .integer('Debe ser un número entero')
    .required('Requerido')
    .typeError('Debe ser un número'),
  bank: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .transform((value) => value.trim())
    .required('Requerido')
    .matches(/^[a-zA-Z\s]+$/, 'Debe contener solo letras y espacios'),
  owner: Yup.string()
    .max(30, 'Debe tener 30 caracteres o menos')
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

const AddBankAccountForm = () => {
  const [initialValuesBankAccount, setInitialValuesBankAccount] =
    useState<ValuesProps>(initialValues);
  const [producer, setProducer] = useState<Partial<MerchantType> | null>(null);
  const { createBankAccount } = useCreateBankAccount();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!!producer) {
      setInitialValuesBankAccount((prevValues) => ({
        ...prevValues,
        merchantId: Number(producer.id!),
        owner: producer.businessName!,
        ownerID: producer.businessId!,
      }));
    }
  }, [producer]);

  const addBankAccount = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    createBankAccount(
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

          if (!!model && !!prop) {
            if (model === 'BankAccount' && prop === 'accountNumber') {
              formikHelpers.setFieldTouched(`${prop}`, true, false);
              formikHelpers.setFieldError(`${prop}`, message);
            }
          }
        },
        onSuccess: () => {
          toast({
            title: 'Cuenta bancaria Agregada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('bankAccountsByMerchantId');
          formikHelpers.resetForm();
          setProducer(null);
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
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Productor
            </Heading>
            <Divider mb={'16px'} />
            <SelectProducer
              name={'merchantId'}
              setProducerSelect={setProducer}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Datos de cuenta bancaria
            </Heading>
            <Divider mb={'16px'} />

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <InputFieldText name={'bank'} label={'Banco'} />
              <InputFieldText
                name={'owner'}
                label={'Propietario'}
                // defaultValue={producer?.businessName!}
              />
              <InputFieldText
                name={'ownerID'}
                label={'Identificación'}
                // defaultValue={producer?.businessId!}
              />
              <InputFieldText name={'accountNumber'} label={'N° de Cuenta'} />
              {/* <InputFieldText name={'type'} label={'Tipo de Cuenta'} /> */}
              <InputFieldSelector
                name={'type'}
                label={'Tipo de Cuenta'}
                options={typesOpt}
              />
              <InputFieldText name={'email'} label={'E-mail'} />
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

export default AddBankAccountForm;
