import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateBlockingSheet } from '../../../../hooks/box-brand/additions/blocking-sheet/createBlockingSheet';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddBlockingSheetFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  dimensions: string;
}

const initialValues: ValuesProps = {
  name: '',
  dimensions: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  dimensions: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddBlockingSheetForm = ({ onClose }: AddBlockingSheetFormProps) => {
  const { createBlockingSheet } = useCreateBlockingSheet();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addBlockingSheet = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createBlockingSheet(
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
            title: 'Lamina de Bloque creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('blockingSheets');
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
        onSubmit={addBlockingSheet}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Lamina de Bloque
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText name={'dimensions'} label={'Dimensiones'} />

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
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

export default AddBlockingSheetForm;
