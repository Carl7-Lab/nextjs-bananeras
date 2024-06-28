import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateLabel } from '../../../../hooks/box-brand/materials/label/createLabel';
import InputFieldNumber from '../../../ui/form/InputFieldNumber';
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
    .max(15, 'Debe tener 15 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  quantityPerRoll: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 ')
    .required('Requerido'),
  art: Yup.string().required('Requerido'),
  description: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(10, 'Debe tener 10 caracteres o más')
    .required('Requerido'),
});

const AddLabelForm = ({ onClose }: AddLabelFormProps) => {
  const { createLabel } = useCreateLabel();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addLabel = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const { quantityPerRoll, ...labelData } = values;
    createLabel(
      {
        ...labelData,
        quantityPerRoll: Number(quantityPerRoll),
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
            title: 'Etiqueta creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('labels');
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
              <InputFieldNumber
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
