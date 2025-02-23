/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreatePesticide } from '../../../../hooks/box-brand/post-harvest/pesticide/createPesticide';
import InputFieldNumber from '../../../ui/form/InputFieldNumber';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddPesticideFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  code: string;
  brandName: string;
  activeIngredient: string;
  dose: number | '';
  presentation: string;
}

const initialValues: ValuesProps = {
  name: '',
  code: '',
  brandName: '',
  activeIngredient: '',
  dose: '',
  presentation: '',
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
    .transform((value) => value.trim())
    .required('Requerido'),
  code: Yup.string()
    .max(10, 'Debe tener 10 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  brandName: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  activeIngredient: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
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
  presentation: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
});

const AddPesticideForm = ({
  onClose,
}: AddPesticideFormProps): React.JSX.Element => {
  const { createPesticide, isLoading } = useCreatePesticide();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addPesticide = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ): Promise<void> => {
    const { dose, ...pesticideData } = values;

    createPesticide(
      {
        ...pesticideData,
        dose: Number(values.dose),
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
            title: 'Pesticida Creado con Éxito',
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
              <InputFieldText name={'code'} label={'Código'} />
              <InputFieldText name={'brandName'} label={'Nombre comercial'} />
              <InputFieldText
                name={'activeIngredient'}
                label={'Ingrediente activo'}
              />
              <InputFieldNumber name={'dose'} label={'Dosis'} />
              <InputFieldText name={'presentation'} label={'Presentacion'} />

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
    </>
  );
};

export default AddPesticideForm;
