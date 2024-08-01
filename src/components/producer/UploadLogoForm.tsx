import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import SelectProducer from './SelectProducer';
import UploadLogoFile from './UploadLogoFile';
import { useUploadMerchantLogo } from '../../hooks/merchants/uploadMerchantLogo';

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/jpg',
];

interface ValuesProps {
  merchantId: number | '';
  logoImg: File | null;
}

const initialValues: ValuesProps = {
  merchantId: '',
  logoImg: null,
};

const validationSchema = Yup.object().shape({
  merchantId: Yup.number().required('Requerido'),
  logoImg: Yup.mixed()
    .required('Se requiere una imagen')
    .test('fileFormat', 'Formato no soportado', (value) => {
      return value && SUPPORTED_FORMATS.includes((value as File).type);
    }),
});

const UploadLogoForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { uploadMerchantLogo, isLoading } = useUploadMerchantLogo();
  const queryClient = useQueryClient();

  const onSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    console.log('Form values: ', values);

    if (values.logoImg) {
      uploadMerchantLogo(
        {
          logoImg: values.logoImg,
          merchantId: String(values.merchantId),
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
              title: 'Imagen subida',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });

            queryClient.invalidateQueries('merchants');
            formikHelpers.resetForm();
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
              Seleccione el Productor
            </Heading>
            <Divider mb={'16px'} />
            <SelectProducer name={'merchantId'} />

            <Heading fontSize={'2xl'} p={'12px'}>
              Subir Logo
            </Heading>
            <Divider mb={'16px'} />

            <UploadLogoFile name={'logoImg'} />
          </Flex>

          <Button
            mt='32px'
            py='8px'
            px='16px'
            type='submit'
            colorScheme='teal'
            isLoading={isLoading}
          >
            Subir
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadLogoForm;
