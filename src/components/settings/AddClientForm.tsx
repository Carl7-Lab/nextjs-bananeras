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
import { useCreateClient } from '../../hooks/client/createClient';
import InputFieldHarborMultiSelect from '../harbor/InputFieldHarborMultiSelect';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  businessName: string;
  businessId: string;
  type: '' | 'Supermarket' | 'Intermediary';
  email: string;
  phone: string;
  harbors: number[] | null;
}

const initialValues: ValuesProps = {
  businessName: '',
  businessId: '',
  type: '',
  email: '',
  phone: '',
  harbors: null,
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
  harbors: Yup.array()
    .min(1, 'At least one harbor must be selected')
    .required('Required')
    .of(Yup.number().required()),
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
  const { createClient } = useCreateClient();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addClient = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const { harbors, ...client } = values;

    createClient(
      {
        ...client,
        harborId: harbors,
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
            title: 'Cliente creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('clients');
          queryClient.invalidateQueries('clientsByHarbor');
          actions.resetForm();
        },
      }
    );
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

                <InputFieldHarborMultiSelect
                  name={'harbors'}
                  label={'Puerto/s'}
                  placeholder={'Seleccione el/los puerto/s'}
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
    </>
  );
};

export default AddClientForm;
