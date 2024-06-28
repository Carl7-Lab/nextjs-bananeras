import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateInsecticide } from '../../../../hooks/box-brand/additions/insecticide/createInsecticide';
import InputFieldNumber from '../../../ui/form/InputFieldNumber';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddInsecticideFormProps {
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
    .max(15, 'Debe tener 15 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  activeIngredient: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  dose: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 ')
    .test(
      'is-decimal',
      'Debe tener como máximo 3 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,3})?$/) !== null
    )
    .required('Requerido'),
});

const AddInsecticideForm = ({ onClose }: AddInsecticideFormProps) => {
  const { createInsecticide } = useCreateInsecticide();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addInsecticide = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const { dose, ...insecticideData } = values;

    createInsecticide(
      {
        ...insecticideData,
        dose: Number(dose),
      },
      {
        onError: (error: any) => {
          const { response } = error;
          const { data } = response;
          const { statusCode, message, error: errorTitle, model, prop } = data;

          toast({
            title: `Error ${statusCode}: ${errorTitle} `,
            description: `${message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

          if (statusCode === 401) {
            router.push('/api/auth/signout');
          }
        },
        onSuccess: () => {
          toast({
            title: 'Insecticide creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('insecticides');
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
        onSubmit={addInsecticide}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Insecticide
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText
                name={'activeIngredient'}
                label={'Ingrediente activo'}
              />
              <InputFieldNumber name={'dose'} label={'Dosis'} />

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

export default AddInsecticideForm;
