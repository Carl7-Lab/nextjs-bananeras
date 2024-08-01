import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldPassword from '../ui/form/InputFieldPassword';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const initialValues: ValuesProps = {
  email: '',
  password: '',
  rememberMe: false,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export default function SignInForm(props: Props) {
  const signin = async (values: ValuesProps) => {
    const res = await signIn('credentials', {
      username: values.email,
      password: values.password,
      redirect: true,
      callbackUrl:
        props.callbackUrl ?? 'http://localhost:3000/dashboard/export/search',
    });

    console.log('res: ', res);
    // return;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signin}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <InputFieldText name={'email'} label={'Correo'} />
            <InputFieldPassword name={'password'} label={'Contraseña'} />

            <CheckboxForm name={'rememberMe'} label={'Recuérdame'} />

            <Button
              mt='32px'
              py='8px'
              px='16px'
              type='submit'
              colorScheme='teal'
              isLoading={isSubmitting}
            >
              Iniciar sesión
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
