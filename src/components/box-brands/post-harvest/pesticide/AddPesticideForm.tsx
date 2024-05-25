import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreatePesticide } from '../../../../hooks/box-brand/post-harvest/pesticide/createPesticide';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddPesticideFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  brandName: string;
  activeIngredient: string;
  dose: number | '';
  presentation: string;
}

const initialValues: ValuesProps = {
  name: '',
  brandName: '',
  activeIngredient: '',
  dose: '',
  presentation: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  brandName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  activeIngredient: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  dose: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
  presentation: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddPesticideForm = ({ onClose }: AddPesticideFormProps) => {
  const { createPesticide } = useCreatePesticide();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addPesticide = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createPesticide(
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
            title: 'Marca creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('pesticides');
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
        onSubmit={addPesticide}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Pesticida
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText name={'brandName'} label={'Nombre comercial'} />
              <InputFieldText
                name={'activeIngredient'}
                label={'Ingrediente activo'}
              />
              <InputFieldText name={'dose'} label={'Dosis'} />
              <InputFieldText name={'presentation'} label={'Presentacion'} />

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

export default AddPesticideForm;
