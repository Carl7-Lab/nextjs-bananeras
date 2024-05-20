import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
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
  const addBlockingSheet = async (values: ValuesProps) => {
    console.log('AddBlockingSheetForm values: ', values);

    !!onClose && onClose();
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

export default AddBlockingSheetForm;
