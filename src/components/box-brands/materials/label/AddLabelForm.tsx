import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddLabelFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  quantityPerRoll: number | '';
  art: string;
  description: string;
}

const initialValues: ValuesProps = {
  name: '',
  quantityPerRoll: '',
  art: '',
  description: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  quantityPerRoll: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
  art: Yup.string().required('Required'),
  description: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
});

const AddLabelForm = ({ onClose }: AddLabelFormProps) => {
  const addLabel = async (values: ValuesProps) => {
    console.log('AddLabelForm values: ', values);

    !!onClose && onClose();
    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addLabel}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Etiqueta
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText
                name={'quantityPerRoll'}
                label={'Cantidad por rollo'}
              />
              <InputFieldText name={'art'} label={'Arte'} />
              <InputFieldText name={'description'} label={'Descripción'} />

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

export default AddLabelForm;
