'use client';
import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { BACKEND_URL } from '../../lib/constants';
import InputFieldBooleanSelector from '../ui/form/InputFieldBooleanSelector';
import InputFieldSelector from '../ui/form/InputFieldSelector';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  brandId: number | '';
  name: string;
  brandCode: string;
  materialBottomType: string;
  materialLidType: string;
  materialLabelType: string;
  materialCoverType: string;
  materialCardboardType: string;
  materialBandType: string;
  materialCornerType: string;
  hasPads: boolean | '';
  hasSponges: boolean | '';
}

const initialValues: ValuesProps = {
  brandId: '',
  name: '',
  brandCode: '',
  materialBottomType: '',
  materialLidType: '',
  materialLabelType: '',
  materialCoverType: '',
  materialCardboardType: '',
  materialBandType: '',
  materialCornerType: '',
  hasPads: '',
  hasSponges: '',
};

const validationSchema = Yup.object({
  brandId: Yup.number().required('Required'),
  name: Yup.string().required('Required'),
  brandCode: Yup.string().required('Required'),
  materialBottomType: Yup.string().required('Required'),
  materialLidType: Yup.string().required('Required'),
  materialLabelType: Yup.string().required('Required'),
  materialCoverType: Yup.string().required('Required'),
  materialCardboardType: Yup.string().required('Required'),
  materialBandType: Yup.string().required('Required'),
  materialCornerType: Yup.string().required('Required'),
  hasPads: Yup.boolean().required('Required'),
  hasSponges: Yup.boolean().required('Required'),
});

export default function AddBoxBrandsForm() {
  const { data: session } = useSession();
  const [brandsOpt, setBrandOpt] = useState([]);
  const toast = useToast();
  const id = 'toast-error';

  const getBrands = async () => {
    const res = await fetch(BACKEND_URL + '/box-brand/brand', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${session?.refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await res.json();

    if (!res.ok) {
      if (!toast.isActive(id)) {
        toast({
          id,
          title: `${response.error}`,
          description: `${response.message}`,
          status: 'error',
          duration: 5000,
          variant: 'left-accent',
          position: 'top',
          isClosable: true,
        });
      }
    }

    if (res.ok) {
      setBrandOpt(response);
    }

    return;
  };

  useEffect(() => {
    getBrands();
  }, []);

  const addBoxBrands = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    const { brandId, ...rest } = values;

    const sendValues = {
      ...rest,
      brand: {
        id: Number(values.brandId),
      },
    };

    const res = await fetch(BACKEND_URL + '/box-brand', {
      method: 'POST',
      body: JSON.stringify(sendValues),
      headers: {
        authorization: `Bearer ${session?.refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('values: ', sendValues);
    const response = await res.json();

    if (!res.ok) {
      console.log('response error :', response);
      toast({
        title: `${response.error}`,
        description: `${response.message}`,
        status: 'error',
        duration: 5000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      });
    }

    if (res.ok) {
      console.log('response ok :', response);
      toast({
        title: `${response.ok}`,
        description: `${response.message}`,
        status: 'success',
        duration: 5000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      });
    }

    actions.resetForm();

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addBoxBrands}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Marca de Cajas
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldSelector
                  name={'brandId'}
                  label={'Marca'}
                  options={brandsOpt}
                />
                <InputFieldText name={'name'} label={'Nombre'} />
                <InputFieldText name={'brandCode'} label={'Código'} />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'12px'}>
                Materiales
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'materialBottomType'}
                  label={'Tipo de fondo'}
                />
                <InputFieldText
                  name={'materialLidType'}
                  label={'Tipo de tapa'}
                />
                <InputFieldText
                  name={'materialLabelType'}
                  label={'Tipo de etiqueta'}
                />
                <InputFieldText
                  name={'materialCoverType'}
                  label={'Tipo de funda'}
                />
                <InputFieldText
                  name={'materialCardboardType'}
                  label={'Tipo de cartulina'}
                />
                <InputFieldText
                  name={'materialBandType'}
                  label={'Tipo de liga'}
                />
                <InputFieldText
                  name={'materialCornerType'}
                  label={'Tipo de esquinero'}
                />
              </SimpleGrid>

              <Divider my={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldBooleanSelector
                  name={'hasPads'}
                  label={'Tiene pads?'}
                />
                <InputFieldBooleanSelector
                  name={'hasSponges'}
                  label={'Tiene esponjas?'}
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
