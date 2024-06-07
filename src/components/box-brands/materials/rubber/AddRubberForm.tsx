import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateRubber } from '../../../../hooks/box-brand/materials/rubber/createRubber';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddRubberFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  quantityPerPack: number | '';
  color: string;
}

const initialValues: ValuesProps = {
  name: '',
  quantityPerPack: '',
  color: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  quantityPerPack: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
  color: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddRubberForm = ({ onClose }: AddRubberFormProps) => {
  const { createRubber } = useCreateRubber();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addRubber = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createRubber(
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
            title: 'Liga creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('rubbers');
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
        onSubmit={addRubber}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Liga
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText
                name={'quantityPerPack'}
                label={'Cantidad por funda'}
              />
              <InputFieldText name={'color'} label={'Color'} />

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

export default AddRubberForm;
