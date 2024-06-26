import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
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
    .max(15, 'Debe tener 15 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  type: Yup.string()
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

const AddSealForm = ({ onClose }: AddSealFormProps) => {
  const { createSeal } = useCreateSeal();
  const toast = useToast();
  const router = useRouter();
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
