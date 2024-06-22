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
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateHarbor } from '@/hooks/harbor/createHarbor';
import InputFieldRequirementMultiSelect from '../harbor/requirement/InputFieldRequirementMultiSelect';
import InputFieldShippingCompanyMultiSelect from '../shipping-company/InputFieldShippingCompanyMultiSelect';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface AddHarborFormProps {
  onClose?: () => void;
}
interface ValuesProps {
  type: '' | 'Nacional' | 'Internacional';
  name: string;
  country: string;
  city: string;
  location: string;
  latitude: number | '';
  longitude: number | '';
  requirements: number[] | null;
  startTime: string;
  endTime: string;
  shippingCompanies: number[] | null;
}

const initialValues: ValuesProps = {
  type: '',
  name: '',
  country: '',
  city: '',
  location: '',
  latitude: '',
  longitude: '',
  requirements: null,
  startTime: '',
  endTime: '',
  shippingCompanies: null,
};

const validationSchema = Yup.object({
  type: Yup.string()
    .required('Required')
    .oneOf(['Nacional', 'Internacional'], 'You must selected'),
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  country: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  city: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  location: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .required('Required'),
  latitude: Yup.number()
    .min(-90, 'Must be at least -90')
    .max(90, 'Must be at most 90')
    .required('Required'),
  longitude: Yup.number()
    .min(-180, 'Must be at least -180')
    .max(180, 'Must be at most 180')
    .required('Required'),
  requirements: Yup.array()
    .min(1, 'At least one requirement must be selected')
    .required('Required')
    .of(Yup.number().required()),
  startTime: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  endTime: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  shippingCompanies: Yup.array()
    .min(1, 'At least one shipping company must be selected')
    .required('Required')
    .of(Yup.number().required()),
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
  const { createHarbor } = useCreateHarbor();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addHarbor = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('addHarbor values: ', values);

    // createHarbor(
    //   {
    //     ...values,
    //   },
    //   {
    //     onError: (error) => {
    //       toast({
    //         title: 'Error.',
    //         description: `${error.message}`,
    //         status: 'error',
    //         duration: 5000,
    //         isClosable: true,
    //       });
    //     },
    //     onSuccess: () => {
    //       toast({
    //         title: 'Productor creado',
    //         status: 'success',
    //         duration: 5000,
    //         isClosable: true,
    //       });

    //       queryClient.invalidateQueries('harbors');
    //       actions.resetForm();
    //     },
    //   }
    // );

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addHarbor}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregando Puerto
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldSelector
                  name={'type'}
                  label={'Tipo'}
                  options={typesOpt}
                />
                <Box></Box>
                <InputFieldText name={'country'} label={'País'} />
                <InputFieldText name={'name'} label={'Nombre'} />
                <InputFieldText name={'city'} label={'Ciudad'} />
                <InputFieldText name={'latitude'} label={'Latitud'} />
                <InputFieldText name={'location'} label={'Ubicación'} />
                <InputFieldText name={'longitude'} label={'Longitud'} />
                <InputFieldText name={'startTime'} label={'Hora de apertura'} />
                <InputFieldShippingCompanyMultiSelect
                  name={'shippingCompanies'}
                  label={'Navieros'}
                  placeholder={'Seleccione el/los navieros'}
                />
                <InputFieldText name={'endTime'} label={'Hora de cierre'} />
                <InputFieldRequirementMultiSelect
                  name={'requirements'}
                  label={'Requisitos'}
                  placeholder={'Seleccione el/los requisito/s'}
                />
              </SimpleGrid>

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

export default AddHarborForm;
