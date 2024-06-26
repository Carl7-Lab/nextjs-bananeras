import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateRequiredCertificate } from '../../../../hooks/box-brand/specifications/certificate/createRequiredCertificate';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddCertificateFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
}

const initialValues: ValuesProps = {
  name: '',
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
});

const AddCertificateForm = ({ onClose }: AddCertificateFormProps) => {
  const { createRequiredCertificate } = useCreateRequiredCertificate();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addCertificate = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createRequiredCertificate(
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
            title: 'Certificado creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('requiredCertificates');
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
        onSubmit={addCertificate}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Certificado
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />

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

export default AddCertificateForm;
