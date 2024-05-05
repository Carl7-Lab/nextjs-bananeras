import { Button, Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  businessName: string;
  businessId: string;
  type: '' | 'Supermarket' | 'Intermediary';
  email: string;
  phone: string;
}

const initialValues: ValuesProps = {
  businessName: '',
  businessId: '',
  type: '',
  email: '',
  phone: '',
};

const validationSchema = Yup.object({
  businessName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessId: Yup.string()
    .length(13, 'Must be exactly 13 characters')
    .matches(/^\d+$/, 'Must be a number')
    .required('Required'),
  type: Yup.string()
    .required('Required')
    .oneOf(['Supermarket', 'Intermediary'], 'You must selected'),
  email: Yup.string()
    .email('Invalid email')
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be 15 digits or less')
    .required('Required'),
});

const AddClientForm = () => {
  const typesOpt = [
    {
      name: 'Supermercado',
      id: 'Supermarket',
    },
    {
      name: 'Intermediario',
      id: 'Intermediary',
    },
  ];

  const addClient = async (values: ValuesProps) => {
    console.log('adding client: ', values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addClient}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregando Cliente
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'businessName'} label={'Razón Social'} />
                <InputFieldText name={'businessId'} label={'RUC'} />

                <InputFieldSelector
                  name={'type'}
                  label={'Tipo'}
                  options={typesOpt}
                />
                <InputFieldText name={'email'} label={'Correo'} />
                <InputFieldText name={'phone'} label={'Teléfono'} />
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
    </>
  );
};

export default AddClientForm;
