import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateSeal } from '../../../../hooks/box-brand/container/seal/createSeal';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddSealFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  type: string;
}

const initialValues: ValuesProps = {
  name: '',
  type: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  type: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddSealForm = ({ onClose }: AddSealFormProps) => {
  const { createSeal } = useCreateSeal();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addSeal = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createSeal(
      {
        ...values,
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
            title: 'Sello creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('seals');
          actions.resetForm();
          !!onClose && onClose();
        },
      }
    );

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addSeal}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Sello
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText name={'type'} label={'Tipo'} />

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                variant={'purple'}
                isLoading={isSubmitting}
              >
                Agregar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddSealForm;
