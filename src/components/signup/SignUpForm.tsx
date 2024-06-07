'use client';
import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { BACKEND_URL } from '../../lib/constants';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldPassword from '../ui/form/InputFieldPassword';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  exportName: string;
  exportId: string;
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const initialValues: ValuesProps = {
  exportName: '',
  exportId: '',
  name: '',
  email: '',
  password: '',
  terms: false,
};

const validationSchema = Yup.object({
  exportName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  exportId: Yup.string().required('Required'),
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Must be 4 or more character')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  terms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});

export default function SignUpForm() {
  const router = useRouter();

  const signUp = async (values: ValuesProps) => {
    const res = await fetch(BACKEND_URL + '/auth/exporter/register', {
      method: 'POST',
      body: JSON.stringify({
        businessName: values.exportName,
        businessId: values.exportId,
        email: values.email,
        name: values.name,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      alert(res.statusText);
      return;
    }

    router.push('/auth/signin');
    return;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signUp}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <InputFieldText name={'exportName'} label={'Razón Social'} />
            <InputFieldText name={'exportId'} label={'RUC'} />
            <InputFieldText name={'email'} label={'Correo'} />

            <InputFieldText name={'name'} label={'Nombre de Usuario'} />
            <InputFieldPassword name={'password'} label={'Contraseña'} />

            <CheckboxForm
              name={'terms'}
              label={'Acepta nuestros Términos y Condiciones'}
            />

            <Button
              mt='32px'
              py='8px'
              px='16px'
              type='submit'
              colorScheme='teal'
              isLoading={isSubmitting}
            >
              Registrarse
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
