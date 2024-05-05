import { Button, Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { BACKEND_URL } from '../../lib/constants';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  businessName: string;
  businessId: string;
  address: string;
  city: string;
  businessObjName: string;
  businessObjAddress: string;
  businessObjArea: number;
  businessObjCity: string;
  businessObjLatitude: number;
  businessObjLongitude: number;
  businessManagerObjName: string;
  businessManagerObjEmail: string;
  businessManagerObjPhone: string;
}

const initialValues: ValuesProps = {
  businessName: '',
  businessId: '',
  address: '',
  city: '',
  businessObjName: '',
  businessObjAddress: '',
  businessObjArea: 0,
  businessObjCity: '',
  businessObjLatitude: 0,
  businessObjLongitude: 0,
  businessManagerObjName: '',
  businessManagerObjEmail: '',
  businessManagerObjPhone: '',
};

const validationSchema = Yup.object({
  businessName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessId: Yup.string()
    .length(13, 'Must be exactly 13 characters')
    .matches(/^\d+$/, 'Must be a number')
    .required('Required'),
  address: Yup.string()
    .min(13, 'Must be 13 characters or less')
    .required('Required'),
  city: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessObjName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessObjAddress: Yup.string()
    .min(13, 'Must be 13 characters or less')
    .required('Required'),
  businessObjArea: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  businessObjCity: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessObjLatitude: Yup.number()
    .min(-90, 'Must be at least -90')
    .max(90, 'Must be at most 90')
    .required('Required'),
  businessObjLongitude: Yup.number()
    .min(-180, 'Must be at least -180')
    .max(180, 'Must be at most 180')
    .required('Required'),
  businessManagerObjName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessManagerObjEmail: Yup.string()
    .email('Invalid email')
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  businessManagerObjPhone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be 15 digits or less')
    .required('Required'),
});

export default function OnboardingForm() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const sendOnboarding = async (values: ValuesProps) => {
    const onboardingValues = {
      businessName: values.businessName,
      businessId: values.businessId,
      address: values.address,
      city: values.address,
      business: {
        name: values.businessObjName,
        address: values.businessObjAddress,
        area: Number(values.businessObjArea),
        city: values.businessObjCity,
        latitude: Number(values.businessObjLatitude),
        longitude: Number(values.businessObjLongitude),
        businessManager: {
          name: values.businessManagerObjName,
          email: values.businessManagerObjEmail,
          phone: values.businessManagerObjPhone,
        },
      },
    };

    const res = await fetch(BACKEND_URL + '/auth/exporter/onboarding', {
      method: 'POST',
      body: JSON.stringify(onboardingValues),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session?.refreshToken}`,
      },
    });

    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();

    await update({ exporterId: response.id });

    router.push('/dashboard/productor/fincas');
    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={sendOnboarding}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
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
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Finca
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'businessObjName'} label={'Nombre'} />
                <InputFieldText name={'businessObjArea'} label={'Área'} />
                <InputFieldText name={'businessObjCity'} label={'Ciudad'} />
                <InputFieldText
                  name={'businessObjLatitude'}
                  label={'Latitud'}
                />
                <InputFieldText
                  name={'businessObjAddress'}
                  label={'Dirección'}
                />
                <InputFieldText
                  name={'businessObjLongitude'}
                  label={'Longitud'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Responsable
              </Heading>
              <Divider mb={'16px'} />

              <InputFieldText
                name={'businessManagerObjName'}
                label={'Nombre'}
              />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'businessManagerObjEmail'}
                  label={'Email'}
                />
                <InputFieldText
                  name={'businessManagerObjPhone'}
                  label={'Phone'}
                />
              </SimpleGrid>

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                variant={'purple'}
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
}
