import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import InputFieldText from '@/components/ui/form/InputFieldText';
import { useCreateSponge } from '@/hooks/box-brand/materials/sponge/createSponge';

interface AddSpongeFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  code: string;
}

const initialValues: ValuesProps = {
  name: '',
  code: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .trim()
    .required('Requerido'),
  code: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .trim()
    .required('Requerido'),
});

const AddSpongeForm = ({ onClose }: AddSpongeFormProps): React.JSX.Element => {
  const { createSponge, isLoading } = useCreateSponge();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addSponge = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ): Promise<void> => {
    createSponge(
      { ...values },
      {
        onError: (error: TypeError) => {
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
            title: 'Esponja creada con Éxito',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          queryClient.invalidateQueries('sponges');
          actions.resetForm();
          if (onClose) onClose();
        },
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={addSponge}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize='2xl' p='12px'>
              Agregar Esponja
            </Heading>
            <Divider mb='16px' />
            <InputFieldText name='name' label='Nombre' />
            <InputFieldText name='code' label='Código' />
            <Button
              mt='32px'
              py='8px'
              px='16px'
              type='submit'
              colorScheme='teal'
              isLoading={isLoading}
            >
              Agregar
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default AddSpongeForm;
