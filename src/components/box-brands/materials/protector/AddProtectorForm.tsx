import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateProtector } from '../../../../hooks/box-brand/materials/protector/createProtector';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddProtectorFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  quantityPerPack: number | '';
}

const initialValues: ValuesProps = {
  name: '',
  quantityPerPack: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  quantityPerPack: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
});

const AddProtectorForm = ({ onClose }: AddProtectorFormProps) => {
  const { createProtector } = useCreateProtector();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addProtector = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createProtector(
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
            title: 'Protector creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('protectors');
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
        onSubmit={addProtector}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Protector
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
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

export default AddProtectorForm;
