import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import SelectProducer from './SelectProducer';
import { useCreateBusiness } from '../../hooks/business/createBusiness';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldDate from '../ui/form/InputFieldDate';
import InputFieldNumber from '../ui/form/InputFieldNumber';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ContactsProps {
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface BusinessCodesProps {
  code: string;
}

interface CertificatesProps {
  name: string;
  certificateCode: string;
  issueDate: Date | '';
  expirationDate: Date | '';
}

interface ValuesProps {
  merchant: number | '';
  name: string;
  city: string;
  address: string;
  fruitType: string;
  area: number;
  latitude: number | 0;
  longitude: number | 0;
  codeMAGAP: string;
  codeAGROCALIDAD: string;
  certificates: CertificatesProps[];
  businessCodes: BusinessCodesProps[];
  contacts: ContactsProps[];
  dataReviewed: boolean;
}

const initialValues: ValuesProps = {
  merchant: '',
  name: '',
  city: '',
  address: '',
  fruitType: '',
  area: 0,
  latitude: 0,
  longitude: 0,
  codeMAGAP: '',
  codeAGROCALIDAD: '',
  certificates: [
    { name: '', certificateCode: '', issueDate: '', expirationDate: '' },
  ],
  businessCodes: [{ code: '' }],
  contacts: [{ name: '', role: '', email: '', phone: '' }],
  dataReviewed: false,
};

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^[a-zA-Z\s]+$/, 'Solo debe contener letras y espacios')
    .transform((value) => value.trim())
    .required('Requerido'),
  role: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .transform((value) => value.trim())
    .required('Requerido'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .max(50, 'Debe tener 50 caracteres o menos')
    .transform((value) => value.trim()),
  phone: Yup.string()
    .matches(/^(\+593|0)9\d{8}$/, 'Debe comenzar con el prefijo +593 o 09')
    .transform((value) => value.trim())
    .required('Requerido'),
});

const businessCodeSchema = Yup.object().shape({
  code: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
});

const certificateSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .transform((value) => value.trim())
    .required('Requerido'),
  certificateCode: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  issueDate: Yup.date().nullable().required('Requerido'),
  expirationDate: Yup.date()
    .nullable()
    .required('Requerido')
    .min(
      Yup.ref('issueDate'),
      'La fecha de expiración debe ser posterior a la fecha de emisión'
    ),
});

const validationSchema = Yup.object({
  merchant: Yup.number().required('Requerido'),
  name: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Solo debe contener letras, números y espacios'
    )
    .transform((value) => value.trim())
    .required('Requerido'),
  city: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(/^[a-zA-Z\s]+$/, 'Solo debe contener letras y espacios')
    .transform((value) => value.trim()),
  address: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9\s.,'-]+$/, 'Dirección no válida')
    .transform((value) => value.trim()),
  fruitType: Yup.string()
    .oneOf(['Organica', 'Convencional'], 'Tipo de fruta no válido')
    .required('Requerido'),
  area: Yup.number()
    .moreThan(0, 'Debe ser mayor que 0')
    .test(
      'is-decimal',
      'Debe tener como máximo 2 decimales',
      (value) => (value + '').match(/^\d+(\.\d{1,2})?$/) !== null
    )
    .required('Requerido'),
  latitude: Yup.number()
    .min(-90, 'Debe ser al menos -90')
    .max(90, 'Debe ser como máximo 90'),
  longitude: Yup.number()
    .min(-180, 'Debe ser al menos -180')
    .max(180, 'Debe ser como máximo 180'),
  codeMAGAP: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  codeAGROCALIDAD: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9]+$/, 'Solo debe contener letras y números')
    .transform((value) => value.trim())
    .required('Requerido'),
  certificates: Yup.array()
    .of(certificateSchema)
    .min(1, 'Debe tener al menos un certificado'),
  businessCodes: Yup.array()
    .of(businessCodeSchema)
    .min(1, 'Debe tener al menos un código'),
  contacts: Yup.array()
    .of(contactSchema)
    .min(1, 'Debe tener al menos un contacto'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

const AddBusinessForm = () => {
  const { createBusiness, isLoading } = useCreateBusiness();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const sendProducerForm = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    const { area, dataReviewed, ...businessData } = values;

    createBusiness(
      {
        ...businessData,
        area: Number(area),
      },
      {
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

          if (!!model && !!prop) {
            if (model === 'Business' && prop === 'codeMAGAP') {
              formikHelpers.setFieldTouched(`${prop}`, true, false);
              formikHelpers.setFieldError(`${prop}`, message);
            }
            if (model === 'Business' && prop === 'codeAGROCALIDAD') {
              formikHelpers.setFieldTouched(`${prop}`, true, false);
              formikHelpers.setFieldError(`${prop}`, message);
            }
          }
        },
        onSuccess: () => {
          toast({
            title: 'Finca creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('businesses');
          formikHelpers.resetForm();
          router.push('/dashboard/producer/fincas');
        },
      }
    );

    return;
  };

  const FruitTypeOpt = [
    {
      name: 'Convencional',
      id: 'Convencional',
    },
    {
      name: 'Orgánica',
      id: 'Orgánica',
    },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={sendProducerForm}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Seleccione el Productor
              </Heading>
              <Divider mb={'16px'} />
              <SelectProducer name={'merchant'} />

              <Heading fontSize={'2xl'} p={'16px'}>
                Finca
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'name'} label={'Nombre'} />
                <InputFieldNumber name={'area'} label={'Área'} />
                <InputFieldText name={'codeMAGAP'} label={'Código MAGAP'} />
                <InputFieldText
                  name={'codeAGROCALIDAD'}
                  label={'Código AGROCALIDAD'}
                />
                <InputFieldSelector
                  name={'fruitType'}
                  label={'Tipo de Fruta'}
                  options={FruitTypeOpt}
                />
                <InputFieldText name={'city'} label={'Ciudad'} />
                <InputFieldText name={'address'} label={'Dirección'} />
                <InputFieldNumber name={'latitude'} label={'Latitud'} />
                <InputFieldNumber name={'longitude'} label={'Longitud'} />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Certificados
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'certificates[0].name'}
                  label={'Nombre'}
                />
                <InputFieldText
                  name={'certificates[0].certificateCode'}
                  label={'Código de certificado'}
                />
                <InputFieldDate
                  name={'certificates[0].issueDate'}
                  label={'Fecha de emisión'}
                />
                <InputFieldDate
                  name={'certificates[0].expirationDate'}
                  label={'Fecha de expiración'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Códigos de Finca
              </Heading>
              <Divider mb={'16px'} />

              <FieldArray name='businessCodes'>
                {({ push, remove }) => (
                  <>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                      {values.businessCodes.map((_businessCode, index) => (
                        <InputFieldText
                          key={index}
                          name={`businessCodes[${index}].code`}
                          label={'Código'}
                          isDisabledRemove={values.businessCodes.length === 1}
                          onClickRemove={() => {
                            remove(index);
                          }}
                        />
                      ))}
                      {values.businessCodes.length % 2 !== 0 && <Box></Box>}
                      <Box></Box>
                      <Button onClick={() => push({ code: '' })} mb='10px'>
                        Agregar Código
                      </Button>
                    </SimpleGrid>
                  </>
                )}
              </FieldArray>

              <Heading fontSize={'2xl'} p={'16px'}>
                Contactos
              </Heading>
              <Divider mb={'16px'} />

              <FieldArray name='contacts'>
                {({ push, remove }) => (
                  <>
                    {values.contacts.map((_contact, index) => (
                      <div key={index}>
                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                          <InputFieldText
                            name={`contacts[${index}].name`}
                            label={'Nombre'}
                          />
                          <InputFieldText
                            name={`contacts[${index}].role`}
                            label={'Role'}
                          />
                          <InputFieldText
                            name={`contacts[${index}].email`}
                            label={'Email'}
                          />
                          <InputFieldText
                            name={`contacts[${index}].phone`}
                            label={'Teléfono'}
                          />
                          <Box></Box>
                          <Button
                            variant='solid'
                            colorScheme='red'
                            isDisabled={values.contacts.length === 1}
                            onClick={() => remove(index)}
                          >
                            Eliminar Contacto
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
                          push({ name: '', role: '', email: '', phone: '' })
                        }
                      >
                        Agregar Contacto
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

export default AddBusinessForm;
