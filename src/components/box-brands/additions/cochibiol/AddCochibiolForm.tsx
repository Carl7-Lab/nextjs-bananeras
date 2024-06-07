import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateCochibiol } from '../../../../hooks/box-brand/additions/cochibiol/createCochibiol';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddCochibiolFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  activeIngredient: string;
  dose: number | '';
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
  dose: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
});

const AddCochibiolForm = ({ onClose }: AddCochibiolFormProps) => {
  const { createCochibiol } = useCreateCochibiol();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addCochibiol = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createCochibiol(
      {
        ...values,
        dose: Number(values.dose),
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
            title: 'Cochibiol creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('cochibiols');
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
        onSubmit={addCochibiol}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Cochibiol
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

export default AddCochibiolForm;
