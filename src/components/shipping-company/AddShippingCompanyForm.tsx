import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import InputFieldText from '../ui/form/InputFieldText';

interface AddShippingCompanyFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  estDuration: string;
}

const initialValues: ValuesProps = {
  name: '',
  estDuration: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  estDuration: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});

const AddShippingCompanyForm: React.FC<AddShippingCompanyFormProps> = ({
  onClose,
}) => {
  const addShippingCompany = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('addShippingCompany values: ', values);

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addShippingCompany}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Naviero
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText name={'estDuration'} label={'Tiempo estimado'} />

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

export default AddShippingCompanyForm;
