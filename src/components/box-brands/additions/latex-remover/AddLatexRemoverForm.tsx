import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddLatexRemoverFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  activeIngredient: string;
  dose: string;
}

const initialValues: ValuesProps = {
  name: '',
  activeIngredient: '',
  dose: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  activeIngredient: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  dose: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddLatexRemoverForm = ({ onClose }: AddLatexRemoverFormProps) => {
  const addLatexRemover = async (values: ValuesProps) => {
    console.log('AddLatexRemoverForm values: ', values);

    !!onClose && onClose();
    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addLatexRemover}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar removedor de latex
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText
                name={'activeIngredient'}
                label={'Ingrediente activo'}
              />
              <InputFieldText name={'dose'} label={'Dosis'} />

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

export default AddLatexRemoverForm;
