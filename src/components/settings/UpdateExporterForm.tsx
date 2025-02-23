import {
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
  Text,
  Badge,
  Box,
} from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useUpdateExporter } from '../../hooks/settings/updateExporter';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  address: string;
  city: string;
  dataReviewed: boolean;
}

interface ExporterDetails {
  updatedAt: string;
  email: string;
  businessName: string;
  businessId: string;
  address?: string;
  city?: string;
  onboardingStatus?: string;
  accountStatus: string;
}

interface UpdateExporterFormProps {
  exporterDetails: ExporterDetails;
}

const validationSchema = Yup.object({
  address: Yup.string()
    .transform((value) => value.trim())
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9\s.,'-]+$/, 'Dirección no válida'),
  city: Yup.string()
    .transform((value) => value.trim())
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z\s]+$/, 'Solo debe contener letras y espacios'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

const UpdateExporterForm = ({
  exporterDetails,
}: UpdateExporterFormProps): React.JSX.Element => {
  const router = useRouter();
  const toast = useToast();
  const { idUser: exporterId } = useParams<{ idUser: string }>();
  const { updateExporter, isLoading } = useUpdateExporter();

  const [formValues, setFormValues] = useState<ValuesProps>({
    address: '',
    city: '',
    dataReviewed: false,
  });

  useEffect(() => {
    if (exporterDetails) {
      setFormValues({
        address: exporterDetails.address || '',
        city: exporterDetails.city || '',
        dataReviewed: false,
      });
    }
  }, [exporterDetails]);

  const onSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dataReviewed, ...exporterData } = values;

    try {
      await updateExporter({ ...exporterData, exporterId });
      toast({
        title: 'Exportadora Actualizada con éxito',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      formikHelpers.resetForm();
      router.push(`/dashboard/user/${exporterId}`);
    } catch (error) {
      toast({
        title: 'Error al actualizar',
        description: 'Hubo un problema al actualizar la información.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={formValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({}) => (
        <Form>
          <Flex flexDirection='column' gap={2}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              <Box display='flex' flexDirection='column' gap={4}>
                <Heading fontSize={'2xl'} p={'12px'}>
                  Información General
                </Heading>

                <Text>
                  <strong>Nombre del Negocio:</strong>{' '}
                  {exporterDetails.businessName}
                </Text>
                <Text>
                  <strong>ID del Negocio:</strong> {exporterDetails.businessId}
                </Text>
                <Text>
                  <strong>Email:</strong> {exporterDetails.email}
                </Text>
                <Text>
                  <strong>Estado de Onboarding:</strong>{' '}
                  <Badge
                    ml={2}
                    colorScheme={
                      exporterDetails.onboardingStatus === 'done'
                        ? 'green'
                        : 'red'
                    }
                  >
                    {exporterDetails.onboardingStatus === 'done'
                      ? 'En Línea'
                      : 'Pendiente'}
                  </Badge>
                </Text>
                <Text>
                  <strong>Estado de Cuenta:</strong>{' '}
                  <Badge
                    ml={2}
                    colorScheme={
                      exporterDetails.accountStatus === 'active'
                        ? 'green'
                        : 'red'
                    }
                  >
                    {exporterDetails.accountStatus === 'active'
                      ? 'Activo'
                      : 'Inactivo'}
                  </Badge>
                </Text>

                <Text>
                  <strong>Última actualización:</strong>{' '}
                  {new Date(exporterDetails.updatedAt).toLocaleDateString()}
                </Text>
              </Box>
              <Box display='flex' flexDirection='column' gap={4}>
                <Heading fontSize={'2xl'} p={'12px'}>
                  Ubicación
                </Heading>
                <InputFieldText name={'city'} label={'Ciudad'} />
                <InputFieldText name={'address'} label={'Dirección'} />
              </Box>
            </SimpleGrid>

            <CheckboxForm
              name='dataReviewed'
              label='He revisado los datos agregados'
            />
            <Button
              mt='12px'
              type='submit'
              colorScheme='teal'
              isLoading={isLoading}
            >
              Enviar
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateExporterForm;
