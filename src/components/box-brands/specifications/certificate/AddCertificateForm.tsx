import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateCertificate } from '../../../../hooks/box-brand/specifications/certificate/createCertificate';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddCertificateFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  certificateCode: string;
}

const initialValues: ValuesProps = {
  name: '',
  certificateCode: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  certificateCode: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddCertificateForm = ({ onClose }: AddCertificateFormProps) => {
  const { createCertificate } = useCreateCertificate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addCertificate = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createCertificate(
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
            title: 'Certificado creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('certificates');
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
              <InputFieldText name={'certificateCode'} label={'Código'} />

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

export default AddCertificateForm;
