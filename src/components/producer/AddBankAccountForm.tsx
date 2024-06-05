import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { PartialProducerType } from './ProducerSelectBase';
import SelectProducer from './SelectProducer';
import { useCreateBankAccount } from '../../hooks/bank-account/createBankAccount';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  merchant: number | '';
  bank: string;
  owner: string;
  ownerID: string;
  accountNumber: string;
  type: 'Ahorro' | 'Corriente' | '';
  email: string;
}

const initialValues: ValuesProps = {
  merchant: '',
  bank: '',
  owner: '',
  ownerID: '',
  accountNumber: '',
  type: '',
  email: '',
};

const validationSchema = Yup.object({
  merchant: Yup.number().required('Required'),
  bank: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  owner: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  ownerID: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .test(
      'len',
      'Must be 10 or 13 characters',
      (val) => val?.length === 10 || val?.length === 13
    ),
  accountNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .length(10, 'accountNumber must be 10 characters')
    .required('Required'),
  type: Yup.string()
    .oneOf(['Ahorro', 'Corriente'], 'Invalid account type')
    .required('Required'),
  email: Yup.string().email('Invalid email address').optional(),
});

const AddBankAccountForm = () => {
  const [initialValuesBankAccount, setInitialValuesBankAccount] =
    useState<ValuesProps>(initialValues);
  const [producer, setProducer] = useState<PartialProducerType | null>(null);
  const { createBankAccount } = useCreateBankAccount();
  const toast = useToast();
  const queryClient = useQueryClient();

  const typesOpt = [
    {
      name: 'Cta Ahorro',
      id: 'Ahorro',
    },
    {
      name: 'Cta Corriente',
      id: 'Corriente',
    },
  ];

  useEffect(() => {
    if (!!producer) {
      setInitialValuesBankAccount((prevValues) => ({
        ...prevValues,
        merchant: Number(producer.id!),
        owner: producer.businessName,
        ownerID: producer.businessId,
      }));
    }
  }, [producer]);

  const addBankAccount = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('sending values: ', values);

    createBankAccount(
      {
        ...values,
        merchant: {
          id: Number(values.merchant),
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
            title: 'Cuenta bancaria Agregada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('bankAccountsByMerchantId');
          actions.resetForm();
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
            <SelectProducer name={'merchant'} setProducerSelect={setProducer} />

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
              variant={'purple'}
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
