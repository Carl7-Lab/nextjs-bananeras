import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateShippingCompany } from '../../hooks/export/shippingCompany/createShippingCompany';
import InputFieldText from '../ui/form/InputFieldText';

interface AddShippingCompanyFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  estDuration: string;
}

const initialValues: ValuesProps = {
  name: '',
  estDuration: '',
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
  estDuration: Yup.string()
    .matches(/^([0-9]{2}):([0-5][0-9])$/, 'Debe tener el formato HH:mm')
    .required('Requerido')
    .required('Requerido'),
});

const AddShippingCompanyForm: React.FC<AddShippingCompanyFormProps> = ({
  onClose,
}) => {
  const { createShippingCompany } = useCreateShippingCompany();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addShippingCompany = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createShippingCompany(
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
            title: 'Naviero creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('shipping-companies');
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
        onSubmit={addShippingCompany}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Naviero
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText name={'estDuration'} label={'Tiempo estimado'} />

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

export default AddShippingCompanyForm;
