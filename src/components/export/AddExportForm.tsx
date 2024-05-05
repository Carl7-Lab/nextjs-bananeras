'use client';
import { Button, Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import SelectBoxBrand from './SelectBoxBrand';
import SelectBoxBrand2 from './SelectBoxBrand2';
import SelectClient from './SelectClient';
import SelectPort from './SelectPort';
import SelectProducer from './SelectProducer';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  boxBrand: number | '';
  boxQuantity: number;
  merchant: string;
  destinationPort: string;
  client: string;
  logisticShipSteam: string;
  logisticShippingLineSeal: string;
  logisticExtraSeal: string;
}

const initialValues: ValuesProps = {
  boxBrand: '',
  boxQuantity: 0,
  merchant: '',
  destinationPort: '',
  client: '',
  logisticShipSteam: '',
  logisticShippingLineSeal: '',
  logisticExtraSeal: '',
};

const validationSchema = Yup.object({
  boxBrand: Yup.string().required('Required'),
  boxQuantity: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  merchant: Yup.string().required('Required'),
  destinationPort: Yup.string().required('Required'),
  client: Yup.string().required('Required'),
  logisticShipSteam: Yup.string().required('Required'),
  logisticShippingLineSeal: Yup.string().required('Required'),
  logisticExtraSeal: Yup.string().required('Required'),
});

const brandBoxOpts = [
  {
    id: 1,
    name: 'Dole amarillo',
    brand: 'Dole',
    code: 'DBL001',
  },
  {
    id: 2,
    name: 'Dole verde',
    brand: 'Dole',
    code: 'DBL002',
  },
  {
    id: 3,
    name: 'Chiquita verde',
    brand: 'Chiquita',
    code: 'CBL001',
  },
];

const producerOpts = [
  {
    id: 1,
    businessName: 'Bananera 1',
    businessId: '0987654321001',
    city: 'Machala',
    address: 'Direccion 1',
  },
  {
    id: 2,
    businessName: 'Bananera 2',
    businessId: '0987654322001',
    city: 'Machala',
    address: 'Direccion 2',
  },
  {
    id: 3,
    businessName: 'Bananera 3',
    businessId: '0987654323001',
    city: 'Machala',
    address: 'Direccion 3',
  },
];

const portOpts = [
  {
    id: 1,
    country: 'Pais 1',
    name: 'Puerto 1',
    city: 'Ciudad 1',
    transportTime: '8 hrs',
    latitude: 1,
    longitude: 1,
  },
  {
    id: 2,
    country: 'Pais 2',
    name: 'Puerto 2',
    city: 'Ciudad 2',
    transportTime: '12 hrs',
    latitude: 2,
    longitude: 2,
  },
  {
    id: 3,
    country: 'Pais 3',
    name: 'Puerto 3',
    city: 'Ciudad 3',
    transportTime: '16 hrs',
    latitude: 3,
    longitude: 3,
  },
];

const clientOpts = [
  {
    id: 1,
    businessName: 'Cliente 1',
    businessId: '0987654321001',
    type: 'Intermediario',
    email: 'cliente1@correo.com',
    phone: '0987654321',
  },
  {
    id: 2,
    businessName: 'Cliente 2',
    businessId: '0987654322001',
    type: 'Supermercado',
    email: 'cliente2@correo.com',
    phone: '0987654322',
  },
  {
    id: 3,
    businessName: 'Cliente 3',
    businessId: '0987654323001',
    type: 'Intermediario',
    email: 'cliente3@correo.com',
    phone: '0987654323',
  },
];

const AddExportForm = () => {
  const addExport = async (values: ValuesProps) => {
    console.log('values: ', values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addExport}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Marca de Caja
              </Heading>
              <Divider mb={'16px'} />

              <SelectBoxBrand2 name={'boxBrand'} name2={'boxQuantity'} />

              {/* <Divider mb={'16px'} />

              <SelectBoxBrand
                name={'boxBrand'}
                name2={'boxQuantity'}
                label={'Marca de caja'}
                options={brandBoxOpts}
              /> */}

              <Heading fontSize={'2xl'} p={'12px'}>
                Productor
              </Heading>
              <Divider mb={'16px'} />
              <SelectProducer
                name={'merchant'}
                label={'Productor'}
                options={producerOpts}
              />

              <Heading fontSize={'2xl'} p={'12px'}>
                Puerto Destino
              </Heading>
              <Divider mb={'16px'} />
              <SelectPort
                name={'destinationPort'}
                label={'Puerto'}
                options={portOpts}
              />

              <Heading fontSize={'2xl'} p={'12px'}>
                Cliente
              </Heading>
              <Divider mb={'16px'} />
              <SelectClient
                name={'client'}
                label={'Cliente'}
                options={clientOpts}
              />

              <Heading fontSize={'2xl'} p={'12px'}>
                Logística
              </Heading>
              <Divider mb={'16px'} />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'logisticShipSteam'}
                  label={'Vapor del buque'}
                />
                <InputFieldText
                  name={'logisticShippingLineSeal'}
                  label={'Sello de Naviera'}
                />
                <InputFieldText
                  name={'logisticExtraSeal'}
                  label={'Sellos extra'}
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
                onClick={() => console.log('values: ', values)}
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

export default AddExportForm;
