import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateLatexRemover } from '../../../../hooks/box-brand/additions/latex-remover/createLatexRemover';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddLatexRemoverFormProps {
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

const AddLatexRemoverForm = ({ onClose }: AddLatexRemoverFormProps) => {
  const { createLatexRemover } = useCreateLatexRemover();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addLatexRemover = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createLatexRemover(
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
            title: 'Removedor de Latex creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('latexRemovers');
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
