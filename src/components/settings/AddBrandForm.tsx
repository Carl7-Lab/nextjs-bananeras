import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React from 'react';
import * as Yup from 'yup';
import { BACKEND_URL } from '../../lib/constants';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  name: string;
}

const initialValues: ValuesProps = {
  name: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
});

export default function AddBrandForm() {
  const { data: session } = useSession();
  const toast = useToast();

  const addBrand = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const res = await fetch(BACKEND_URL + '/box-brand/brand', {
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
      }),
      headers: {
        authorization: `Bearer ${session?.refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await res.json();

    if (!res.ok) {
      toast({
        title: `${response.error}`,
        description: `${response.message}`,
        status: 'error',
        duration: 5000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      });
    }

    if (res.ok) {
      // console.log('response ok :', response);
      toast({
        title: `${response.ok}`,
        description: `${response.message}`,
        status: 'success',
        duration: 5000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      });
    }

    actions.resetForm();

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addBrand}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Marca de Cajas
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />

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
}
