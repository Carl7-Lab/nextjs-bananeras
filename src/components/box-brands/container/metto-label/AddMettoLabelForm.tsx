import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateMettoLabel } from '../../../../hooks/box-brand/container/metto-label/createMettoLabel';
import InputFieldNumber from '../../../ui/form/InputFieldNumber';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddMettoLabelFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  quantityPerPack: number | '';
  art: string;
  code: string;
}

const initialValues: ValuesProps = {
  name: '',
  quantityPerPack: '',
  art: '',
  code: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(20, 'Debe tener 20 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  quantityPerPack: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 ')
    .required('Requerido'),
  art: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .required('Requerido'),
  code: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .required('Requerido'),
});

const AddMettoLabelForm = ({ onClose }: AddMettoLabelFormProps) => {
  const { createMettoLabel } = useCreateMettoLabel();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const AddMettoLabel = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createMettoLabel(
      {
        ...values,
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
            title: 'Etiqueta metto creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('mettoLabels');
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
        onSubmit={AddMettoLabel}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Etiqueta Metto
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldNumber
                name={'quantityPerPack'}
                label={'Cantidad por funda'}
              />
              <InputFieldText name={'art'} label={'Arte'} />
              <InputFieldText name={'code'} label={'Código'} />

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

export default AddMettoLabelForm;
