import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
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
  const addCertificate = async (values: ValuesProps) => {
    console.log('AddCertificateForm values', values);

    !!onClose && onClose();
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
