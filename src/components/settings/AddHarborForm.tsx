'use client';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateHarbor } from '@/hooks/export/harbor/createHarbor';
import InputFieldShippingCompanyMultiSelect from '../shipping-company/InputFieldShippingCompanyMultiSelect';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldDate from '../ui/form/InputFieldDate';
import InputFieldNumber from '../ui/form/InputFieldNumber';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface AddHarborFormProps {
  onClose?: () => void;
}

interface RequirementProps {
  name: string;
  code: string;
  issueDate: Date | '';
  expirationDate: Date | '';
}

interface ValuesProps {
  type: '' | 'Nacional' | 'Internacional';
  country: string;
  city: string;
  location: string;
  name: string;
  latitude: number | '';
  longitude: number | '';
  requirementsSC: RequirementProps[];
  openTime: string;
  closeTime: string;
  shippingCompanies: number[] | null;
  dataReviewed: boolean;
}

const initialValues: ValuesProps = {
  type: '',
  name: '',
  country: '',
  city: '',
  location: '',
  latitude: '',
  longitude: '',
  requirementsSC: [{ name: '', code: '', issueDate: '', expirationDate: '' }],
  openTime: '',
  closeTime: '',
  shippingCompanies: null,
  dataReviewed: false,
};

const requirementSchema = Yup.object({
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
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  issueDate: Yup.date().required('Requerido'),
  expirationDate: Yup.date()
    .required('Requerido')
    .min(
      Yup.ref('issueDate'),
      'La fecha de expiración debe ser posterior a la fecha de emisión'
    ),
});

const validationSchema = Yup.object({
  type: Yup.string()
    .required('Requerido')
    .oneOf(['Nacional', 'Internacional'], 'Debes seleccionar'),
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
  country: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  city: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  location: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^\S.*\S$/, 'No debe tener espacios al principio ni al final')
    .matches(
      /^(?!.*\s{2,}).*$/,
      'No debe tener múltiples espacios consecutivos'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  latitude: Yup.number()
    .min(-90, 'Debe ser al menos -90')
    .max(90, 'Debe ser como máximo 90'),
  longitude: Yup.number()
    .min(-180, 'Debe ser al menos -180')
    .max(180, 'Debe ser como máximo 180'),
  openTime: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Debe tener el formato HH:mm')
    .required('Requerido'),
  closeTime: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Debe tener el formato HH:mm')
    .required('Requerido'),
  shippingCompanies: Yup.array()
    .min(1, 'Debe seleccionar al menos un naviero')
    .of(Yup.number().required())
    .required('Requerido'),
  requirementsSC: Yup.array()
    .min(1, 'Debes tener al menos un requisito')
    .of(requirementSchema)
    .required('Requerido'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

const AddHarborForm: React.FC<AddHarborFormProps> = ({ onClose }) => {
  const typesOpt = [
    {
      name: 'Nacional',
      id: 'Nacional',
    },
    {
      name: 'Internacional',
      id: 'Internacional',
    },
  ];
  const { createHarbor, isLoading } = useCreateHarbor();
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const addHarbor = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const { dataReviewed, ...harborData } = values;
    createHarbor(
      {
        ...harborData,
      },
      {
        onError: (error) => {
          toast({
            title: 'Error.',
            description: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: 'Puerto Creado con Éxito',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('harbors');
          queryClient.invalidateQueries('harborsByType');
          actions.resetForm();
          router.push('/dashboard/client/harbors');
        },
      }
    );

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addHarbor}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Puerto
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldSelector
                  name={'type'}
                  label={'Tipo'}
                  options={typesOpt}
                />
                <Box></Box>
                <InputFieldText
                  name={'country'}
                  label={'País'}
                  isReadOnly={values.type === 'Nacional'}
                  defaultValue={values.type === 'Nacional' ? 'Ecuador' : ''}
                />
                <InputFieldText name={'name'} label={'Nombre'} />
                <InputFieldText name={'city'} label={'Ciudad'} />
                <InputFieldNumber name={'latitude'} label={'Latitud'} />
                <InputFieldText name={'location'} label={'Ubicación'} />
                <InputFieldNumber name={'longitude'} label={'Longitud'} />
                <InputFieldText name={'openTime'} label={'Hora de apertura'} />
                <InputFieldShippingCompanyMultiSelect
                  name={'shippingCompanies'}
                  label={'Navieros'}
                  placeholder={'Seleccione el/los navieros'}
                />
                <InputFieldText name={'closeTime'} label={'Hora de cierre'} />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Requisitos
              </Heading>
              <Divider mb={'16px'} />

              <FieldArray name='requirementsSC'>
                {({ push, remove }) => (
                  <>
                    {values.requirementsSC.map((_requirement, index) => (
                      <div key={index}>
                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                          <InputFieldText
                            name={`requirementsSC[${index}].name`}
                            label={'Nombre'}
                          />
                          <InputFieldText
                            name={`requirementsSC[${index}].code`}
                            label={'Código'}
                          />
                          <InputFieldDate
                            name={`requirementsSC[${index}].issueDate`}
                            label={'Fecha de Emisión'}
                          />
                          <InputFieldDate
                            name={`requirementsSC[${index}].expirationDate`}
                            label={'Fecha de Expiración'}
                          />
                          <Box></Box>
                          <Button
                            variant='solid'
                            colorScheme='red'
                            isDisabled={values.requirementsSC.length === 1}
                            onClick={() => remove(index)}
                          >
                            Eliminar Requisito
                          </Button>
                        </SimpleGrid>
                        <Divider
                          mt={'16px'}
                          mb={'8px'}
                          borderWidth={'2px'}
                          variant={'dashed'}
                        />
                      </div>
                    ))}
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                      <Box></Box>
                      <Button
                        onClick={() =>
                          push({
                            name: '',
                            code: '',
                            issueDate: '',
                            expirationDate: '',
                          })
                        }
                      >
                        Agregar Requisito
                      </Button>
                    </SimpleGrid>
                  </>
                )}
              </FieldArray>

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

export default AddHarborForm;
