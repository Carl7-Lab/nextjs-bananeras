import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateClusterBag } from '../../../../hooks/box-brand/materials/cluster-bag/createClusterBag';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddClusterBagFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  art: string;
  dimensions: string;
  quantityPerPack: number | '';
}

const initialValues: ValuesProps = {
  name: '',
  art: '',
  dimensions: '',
  quantityPerPack: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  art: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  dimensions: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  quantityPerPack: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
});

const AddClusterBagForm = ({ onClose }: AddClusterBagFormProps) => {
  const { createClusterBag } = useCreateClusterBag();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addClusterBag = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createClusterBag(
      {
        ...values,
        quantityPerPack: Number(values.quantityPerPack),
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
            title: 'Cluster Bag creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('clusterBags');
          actions.resetForm();
          !!onClose && onClose();
        },
      }
    );

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
              <InputFieldText name={'art'} label={'Arte'} />
              <InputFieldText name={'dimensions'} label={'Dimensiones'} />
              <InputFieldText
                name={'quantityPerPack'}
                label={'Cantidad por funda'}
              />

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                variant={'purple'}
                isLoading={isSubmitting}
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
