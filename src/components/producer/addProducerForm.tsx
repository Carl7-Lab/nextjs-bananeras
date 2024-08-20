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
import { useCreateMerchant } from '../../hooks/merchants/createMerchant';
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

interface BusinessesProps {
  name: string;
  city: string;
  address: string;
  fruitType: string;
  area: number;
  latitude: number | '';
  longitude: number | '';
  codeMAGAP: string;
  codeAGROCALIDAD: string;
  certificates: CertificatesProps[];
  businessCodes: BusinessCodesProps[];
  contacts: ContactsProps[];
}

interface ValuesProps {
  businessName: string;
  businessId: string;
  address: string;
  city: string;
  email: string;
  contractType: '' | 'Contrato' | 'Spot';
  businesses: BusinessesProps[];
}

const initialValues: ValuesProps = {
  businessName: '',
  businessId: '',
  address: '',
  city: '',
  email: '',
  contractType: '',
  businesses: [
    {
      name: '',
      city: '',
      address: '',
      fruitType: '',
      area: 0,
      latitude: '',
      longitude: '',
      codeMAGAP: '',
      codeAGROCALIDAD: '',
      certificates: [
        { name: '', certificateCode: '', issueDate: '', expirationDate: '' },
      ],
      businessCodes: [{ code: '' }],
      contacts: [{ name: '', role: '', email: '', phone: '' }],
    },
  ],
};

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
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
  issueDate: Yup.date().required('Requerido'),
  expirationDate: Yup.date()
    .required('Requerido')
    .min(
      Yup.ref('issueDate'),
      'La fecha de expiración debe ser posterior a la fecha de emisión'
    ),
});

const businessSchema = Yup.object().shape({
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
});

const validationSchema = Yup.object({
  businessName: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Solo debe contener letras, números y espacios'
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
  address: Yup.string()
    .transform((value) => value.trim())
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z0-9\s.,'-]+$/, 'Dirección no válida'),
  city: Yup.string()
    .transform((value) => value.trim())
    .max(50, 'Debe tener 50 caracteres o menos')
    .matches(/^[a-zA-Z\s]+$/, 'Solo debe contener letras y espacios'),
  email: Yup.string()
    .transform((value) => value.trim())
    .email('Correo electrónico inválido')
    .max(50, 'Debe tener 50 caracteres o menos'),
  contractType: Yup.string()
    .oneOf(
      ['Contrato FOB', 'Contrato FAS', 'Spot'],
      'Tipo de contrato invalido'
    )
    .required('Requerido'),
  businesses: Yup.array()
    .of(businessSchema)
    .min(1, 'Debe tener al menos una finca'),
});

const AddProducerForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { createMerchant } = useCreateMerchant();
  const queryClient = useQueryClient();

  const onSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => {
    const { businesses, ...producerData } = values;
    const { area, ...businessData } = businesses[0];

    createMerchant(
      {
        ...producerData,
        businesses: [{ area: Number(area), ...businessData }],
      },
      {
        onError: (error: any) => {
          const { response } = error;
          const { data } = response;
          const { statusCode, message, error: errorTitle, model, prop } = data;
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

            if (!!model && !!prop) {
              if (model === 'Merchant' && prop === 'businessId') {
                formikHelpers.setFieldTouched(`${prop}`, true, false);
                formikHelpers.setFieldError(`${prop}`, message);
              }
              if (model === 'Business' && prop === 'codeMAGAP') {
                formikHelpers.setFieldTouched(
                  `businesses[0].${prop}`,
                  true,
                  false
                );
                formikHelpers.setFieldError(`businesses[0].${prop}`, message);
              }
            }
          }
        },
        onSuccess: async () => {
          toast({
            title: 'Productor creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('merchants');
          formikHelpers.resetForm();
        },
      }
    );
  };

  const ContractOpt = [
    {
      name: 'Contrato FOB',
      id: 'Contrato FOB',
    },
    {
      name: 'Contrato FAS',
      id: 'Contrato FAS',
    },
    {
      name: 'Spot',
      id: 'Spot',
    },
  ];

  const FruitTypeOpt = [
    {
      name: 'Convencional',
      id: 'Convencional',
    },
    {
      name: 'Organica',
      id: 'Organica',
    },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Productor
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'businessName'} label={'Razon Social'} />
                <InputFieldText name={'businessId'} label={'RUC'} />
                <InputFieldText name={'city'} label={'Ciudad'} />
                <InputFieldText name={'address'} label={'Dirección'} />
                <InputFieldText name={'email'} label={'Email'} />
                <InputFieldSelector
                  name={'contractType'}
                  label={'Tipo de Contrato'}
                  options={ContractOpt}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Finca
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'businesses[0].name'} label={'Nombre'} />
                <InputFieldNumber name={'businesses[0].area'} label={'Área'} />
                <InputFieldText
                  name={'businesses[0].codeMAGAP'}
                  label={'Código MAGAP'}
                />
                <InputFieldText
                  name={'businesses[0].codeAGROCALIDAD'}
                  label={'Código AGROCALIDAD'}
                />
                <InputFieldSelector
                  name={'businesses[0].fruitType'}
                  label={'Tipo de Fruta'}
                  options={FruitTypeOpt}
                />
                <InputFieldText name={'businesses[0].city'} label={'Ciudad'} />
                <InputFieldText
                  name={'businesses[0].address'}
                  label={'Dirección'}
                />
                <InputFieldNumber
                  name={'businesses[0].latitude'}
                  label={'Latitud'}
                />
                <InputFieldNumber
                  name={'businesses[0].longitude'}
                  label={'Longitud'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Certificados
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'businesses[0].certificates[0].name'}
                  label={'Nombre'}
                />
                <InputFieldText
                  name={'businesses[0].certificates[0].certificateCode'}
                  label={'Código de certificado'}
                />
                <InputFieldDate
                  name={'businesses[0].certificates[0].issueDate'}
                  label={'Fecha de emisión'}
                />
                <InputFieldDate
                  name={'businesses[0].certificates[0].expirationDate'}
                  label={'Fecha de expiración'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Códigos de Finca
              </Heading>
              <Divider mb={'16px'} />

              <FieldArray name='businesses[0].businessCodes'>
                {({ push, remove }) => (
                  <>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                      {values.businesses[0].businessCodes.map(
                        (_businessCode, index) => (
                          <InputFieldText
                            key={index}
                            name={`businesses[0].businessCodes[${index}].code`}
                            label={'Código'}
                            isDisabledRemove={
                              values.businesses[0].businessCodes.length === 1
                            }
                            onClickRemove={() => {
                              remove(index);
                            }}
                          />
                        )
                      )}
                      {values.businesses[0].businessCodes.length % 2 !== 0 && (
                        <Box></Box>
                      )}
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

              <FieldArray name='businesses[0].contacts'>
                {({ push, remove }) => (
                  <>
                    {values.businesses[0].contacts.map((_contact, index) => (
                      <div key={index}>
                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                          <InputFieldText
                            name={`businesses[0].contacts[${index}].name`}
                            label={'Nombre'}
                          />
                          <InputFieldText
                            name={`businesses[0].contacts[${index}].role`}
                            label={'Role'}
                          />
                          <InputFieldText
                            name={`businesses[0].contacts[${index}].email`}
                            label={'Email'}
                          />
                          <InputFieldText
                            name={`businesses[0].contacts[${index}].phone`}
                            label={'Teléfono'}
                          />
                          <Box></Box>
                          <Button
                            variant='solid'
                            colorScheme='red'
                            isDisabled={
                              values.businesses[0].contacts.length === 1
                            }
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

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                isLoading={isSubmitting}
              >
                Enviar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProducerForm;
