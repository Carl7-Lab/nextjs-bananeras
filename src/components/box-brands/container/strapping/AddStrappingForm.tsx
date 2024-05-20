import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddStrappingFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  weightPerPack: number | '';
  color: string;
}

const initialValues: ValuesProps = {
  name: '',
  weightPerPack: '',
  color: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  weightPerPack: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
  color: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddStrappingForm = ({ onClose }: AddStrappingFormProps) => {
  const addStrapping = async (values: ValuesProps) => {
    console.log('AddStrappingForm values: ', values);

    !!onClose && onClose();
    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addStrapping}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Zuncho
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText name={'weightPerPack'} label={'Peso por rollo'} />
              <InputFieldText name={'color'} label={'Color'} />

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

export default AddStrappingForm;
