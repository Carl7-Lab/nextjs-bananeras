import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { BACKEND_URL } from '../../lib/constants';

interface ValuesProps {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const initialValues: ValuesProps = {
  name: '',
  email: '',
  password: '',
  terms: false,
};

const validationSchema = Yup.object({
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

  const signUp = async (values: any) => {
    const res = await fetch(BACKEND_URL + '/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
        email: values.email,
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
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signUp}
      validationSchema={validationSchema}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Flex flexDirection='column'>
            <FormControl
              id='name'
              isInvalid={Boolean(errors.name && touched.name)}
            >
              <FormLabel fontSize='sm' mb='8px'>
                Nombre
              </FormLabel>
              <Field as={Input} name='name' placeholder='Nombre' />
              <FormErrorMessage mt='8px' mb='16px'>
                <ErrorMessage name='name' />
              </FormErrorMessage>
            </FormControl>

            <FormControl
              id='email'
              isInvalid={Boolean(errors.email && touched.email)}
              mt='16px'
            >
              <FormLabel fontSize='sm' mb='8px'>
                Correo
              </FormLabel>
              <Field as={Input} name='email' placeholder='Correo' />
              <FormErrorMessage mt='8px' mb='16px'>
                <ErrorMessage name='email' />
              </FormErrorMessage>
            </FormControl>

            <FormControl
              id='password'
              isInvalid={Boolean(errors.password && touched.password)}
              mt='16px'
            >
              <FormLabel fontSize='sm' mb='8px'>
                Contraseña
              </FormLabel>
              <Field
                as={Input}
                name='password'
                type='password'
                placeholder='Contraseña'
              />
              <FormErrorMessage mt='8px'>
                <ErrorMessage name='password' />
              </FormErrorMessage>
            </FormControl>

            <FormControl
              id='terms'
              isInvalid={Boolean(errors.password && touched.password)}
            >
              <Field
                as={Checkbox}
                id='terms'
                name='terms'
                colorScheme='teal'
                mt='20px'
              >
                Acepta nuestros Términos y Condiciones
              </Field>
              <FormErrorMessage mt='8px'>
                <ErrorMessage name='terms' />
              </FormErrorMessage>
            </FormControl>

            <Button
              mt='32px'
              py='8px'
              px='16px'
              type='submit'
              colorScheme='teal'
              variant={'purple'}
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
