import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import ImportClientDrawer from './ImportClientDrawer';
import { useCreateClient } from '../../hooks/export/client/createClient';
import InputFieldHarborMultiSelect from '../harbor/InputFieldHarborMultiSelect';
import InputFieldShippingCompanyMultiSelect from '../shipping-company/InputFieldShippingCompanyMultiSelect';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  businessName: string;
  businessId: string;
  type: '' | 'Supermercado' | 'Intermediario';
  email: string;
  phone: string;
  harbors: number[] | null;
  shippingCompanies: number[] | null;
  dataReviewed: boolean;
}

const initialValues: ValuesProps = {
  businessName: '',
  businessId: '',
  type: '',
  email: '',
  phone: '',
  harbors: null,
  shippingCompanies: null,
  dataReviewed: false,
};

const validationSchema = Yup.object({
  businessName: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  businessId: Yup.string()
    .length(13, 'Debe tener exactamente 13 caracteres')
    .matches(
      /^\d{10}001$/,
      'El RUC del negocio debe estar en el formato xxxxxxxxxx001'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  type: Yup.string()
    .required('Requerido')
    .oneOf(['Supermercado', 'Intermediario'], 'Tipo invalido'),
  email: Yup.string()
    .transform((value) => value.trim())
    .email('Correo electrónico inválido')
    .max(50, 'Debe tener 50 caracteres o menos'),
  phone: Yup.string()
    .matches(/^(\+593|0)9\d{8}$/, 'Debe comenzar con el prefijo +593 o 09')
    .transform((value) => value.trim())
    .required('Requerido'),
  harbors: Yup.array()
    .min(1, 'Debe seleccionar al menos un puerto')
    .of(Yup.number().required())
    .nullable()
    .required('Requerido'),
  shippingCompanies: Yup.array()
    .min(1, 'Debe seleccionar al menos un naviero')
    .of(Yup.number().required())
    .nullable()
    .required('Requerido'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

const AddClientForm = (): React.JSX.Element => {
  const typesOpt = [
    {
      name: 'Supermercado',
      id: 'Supermercado',
    },
    {
      name: 'Intermediario',
      id: 'Intermediario',
    },
  ];
  const { createClient, isLoading } = useCreateClient();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addClient = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dataReviewed, ...clientData } = values;
    createClient(
      {
        ...clientData,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

          if (model === 'Client' && prop === 'businessId') {
            formikHelpers.setFieldTouched(`${prop}`, true, false);
            formikHelpers.setFieldError(`${prop}`, message);
          }
        },
        onSuccess: () => {
          toast({
            title: 'Cliente Creado con Éxito',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('clients');
          queryClient.invalidateQueries('clientsByHarbor');
          formikHelpers.resetForm();
          router.push(' /dashboard/client/clients');
        },
      }
    );

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addClient}
        validationSchema={validationSchema}
      >
        {({}) => (
          <Form>
            <Flex flexDirection='column' gap={3} width={'100%'}>
              <Flex justify='space-between'>
                <Heading fontSize={'2xl'} p={'12px'}>
                  Cliente
                </Heading>
                <ImportClientDrawer />
              </Flex>

              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'businessName'}
                  label={'Nombre/Razón Social'}
                />
                <InputFieldText name={'businessId'} label={'RUC'} />

                <InputFieldSelector
                  name={'type'}
                  label={'Tipo'}
                  options={typesOpt}
                />

                <InputFieldText name={'email'} label={'Correo'} />
                <InputFieldText name={'phone'} label={'Teléfono'} />

                <InputFieldHarborMultiSelect
                  name={'harbors'}
                  label={'Puerto/s'}
                  placeholder={'Seleccione el/los puerto/s'}
                  type={'Internacional'}
                />

                <InputFieldShippingCompanyMultiSelect
                  name={'shippingCompanies'}
                  label={'Navieros'}
                  placeholder={'Seleccione el/los navieros'}
                />
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, sm: 1 }}>
                <CheckboxForm
                  name='dataReviewed'
                  label='He revisado los datos agregados'
                />
                <Button
                  mt='12px'
                  py='8px'
                  px='16px'
                  type='submit'
                  colorScheme='teal'
                  isLoading={isLoading}
                >
                  Enviar
                </Button>
              </SimpleGrid>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddClientForm;
