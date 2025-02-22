import {
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateClusterBag } from '../../../../hooks/box-brand/materials/cluster-bag/createClusterBag';
import UploadLogoFile from '../../../producer/UploadLogoFile';
import InputFieldNumber from '../../../ui/form/InputFieldNumber';
import InputFieldText from '../../../ui/form/InputFieldText';

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/jpg',
];

interface AddClusterBagFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  code: string;
  art: File | null;
  dimensions: string;
  quantityPerPack: number | '';
}

const initialValues: ValuesProps = {
  name: '',
  code: '',
  art: null,
  dimensions: '',
  quantityPerPack: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  code: Yup.string()
    .max(10, 'Debe tener 10 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  art: Yup.mixed()
    .required('Se requiere una imagen')
    .test('fileFormat', 'Formato no soportado', (value) => {
      return value && SUPPORTED_FORMATS.includes((value as File).type);
    }),
  dimensions: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .required('Requerido'),
  quantityPerPack: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000')
    .required('Requerido'),
});

const AddClusterBagForm = ({ onClose }: AddClusterBagFormProps) => {
  const { createClusterBag, isLoading } = useCreateClusterBag();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addClusterBag = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const formData = {
      name: values.name,
      code: values.code,
      quantityPerPack: Number(values.quantityPerPack),
      dimensions: values.dimensions,
      art: values.art,
    };

    createClusterBag(formData, {
      onError: (error: any) => {
        const { response } = error;
        const { data } = response;
        const { statusCode, message, error: errorTitle } = data;

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
          title: 'Cluster Bag Creado con Éxito',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        queryClient.invalidateQueries('labels');
        actions.resetForm();
        !!onClose && onClose();
      },
    });

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addClusterBag}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Cluster Bag
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText name={'code'} label={'Código'} />
              <InputFieldText name={'dimensions'} label={'Dimensiones'} />
              <InputFieldNumber
                name={'quantityPerPack'}
                label={'Cantidad por funda'}
              />
              <FormLabel fontSize='sm' mb={0}>
                Arte
              </FormLabel>
              <UploadLogoFile name={'art'} />
              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                isLoading={isLoading}
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

export default AddClusterBagForm;
