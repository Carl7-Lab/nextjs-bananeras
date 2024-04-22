import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface ValuesProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: ValuesProps = {
  email: '',
  password: '',
  rememberMe: false,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export default function SignInForm() {
  const signin = (values: any) => {
    console.log('sign up: ', values);
    alert(JSON.stringify(values));
  };

  //   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const res = await signIn('credentials', {
  //       username: userName.current,
  //       password: pass.current,
  //       redirect: true,
  //       callbackUrl: props.callbackUrl ?? 'http://localhost:3000',
  //     });
  //   };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signin}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Flex flexDirection='column'>
            <FormControl
              id='email'
              isInvalid={Boolean(errors.email && touched.email)}
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
              id='rememberMe'
              isInvalid={Boolean(errors.password && touched.password)}
            >
              <Field
                as={Checkbox}
                id='rememberMe'
                name='rememberMe'
                colorScheme='teal'
                mt='20px'
              >
                Recuérdame
              </Field>
              <FormErrorMessage mt='8px'>
                <ErrorMessage name='rememberMe' />
              </FormErrorMessage>
            </FormControl>

            <Button
              mt='32px'
              py='8px'
              px='16px'
              type='submit'
              colorScheme='teal'
              variant={'purple'}
            >
              Iniciar sesión
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
