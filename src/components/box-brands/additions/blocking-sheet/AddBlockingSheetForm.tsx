import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
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
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  dimensions: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
});

const AddBlockingSheetForm = ({ onClose }: AddBlockingSheetFormProps) => {
  const { createBlockingSheet } = useCreateBlockingSheet();
  const toast = useToast();
  const router = useRouter();
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
