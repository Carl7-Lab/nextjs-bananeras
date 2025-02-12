import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
  Text,
  Image,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useUploadExporterLogo } from '../../../hooks/settings/uploadExporterLogo';
import { useExporter } from '../../../hooks/useUserProfile';
import UploadLogoFile from '../../producer/UploadLogoFile';
import CheckboxForm from '../../ui/form/CheckboxForm';
import { Logo } from '../../ui/Logo';

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/jpg',
];

interface ValuesProps {
  exporterId: number | '';
  logoImg: File | null;
  dataReviewed: boolean;
}

const initialValues: ValuesProps = {
  exporterId: '',
  logoImg: null,
  dataReviewed: false,
};

const validationSchema = Yup.object().shape({
  logoImg: Yup.mixed()
    .required('Se requiere una imagen')
    .test('fileFormat', 'Formato no soportado', (value) => {
      return value && SUPPORTED_FORMATS.includes((value as File).type);
    }),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar la imagen antes de enviar')
    .required('Requerido'),
});

const UploadLogoForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { user, isLoading: userLoading } = useExporter();
  const { uploadExporterLogo, isLoading } = useUploadExporterLogo();
  const queryClient = useQueryClient();

  const onSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    const { dataReviewed } = values;

    if (values.logoImg) {
      uploadExporterLogo(
        {
          logoImg: values.logoImg,
          exporterId: String(user?.exporterDetails.id) || '',
        },
        {
          onError: (error: any) => {
            const { response } = error;
            const { data } = response;
            const { statusCode, message, error: errorTitle } = data;
            {
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
            }
          },
          onSuccess: async () => {
            toast({
              title: 'Imagen Subida con Éxito',
              description: 'Puede tardar unos segundos',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });

            queryClient.invalidateQueries('exporter');
            formikHelpers.resetForm();
            router.push('/dashboard');
          },
        }
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Cambia tu Logo de Exportadora
            </Heading>
            <Divider mb={'16px'} />
            {user?.exporterDetails.logoUrl ? (
              <Image
                src={user.exporterDetails.logoUrl}
                alt='Logo de la Empresa'
                boxSize='100px'
                objectFit='cover'
                my={2}
                mx={'auto'}
              />
            ) : (
              <Text mt={4} fontStyle='italic'>
                Logo No Disponible
              </Text>
            )}

            <Heading fontSize={'2xl'} p={'12px'}>
              Subir Logo
            </Heading>
            <Divider mb={'16px'} />

            <UploadLogoFile name={'logoImg'} />
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 1 }}>
            <CheckboxForm
              name='dataReviewed'
              label='He previsualizado la imagen'
            />
            <Button
              mt='12px'
              py='8px'
              px='16px'
              type='submit'
              colorScheme='teal'
              isLoading={isLoading}
            >
              Subir Imagen
            </Button>
          </SimpleGrid>
        </Form>
      )}
    </Formik>
  );
};

export default UploadLogoForm;
