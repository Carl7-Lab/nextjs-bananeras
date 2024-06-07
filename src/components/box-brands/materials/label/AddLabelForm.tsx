import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateLabel } from '../../../../hooks/box-brand/materials/label/createLabel';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddLabelFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  quantityPerRoll: number | '';
  art: string;
  description: string;
}

const initialValues: ValuesProps = {
  name: '',
  quantityPerRoll: '',
  art: '',
  description: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  quantityPerRoll: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
  art: Yup.string().required('Required'),
  description: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
});

const AddLabelForm = ({ onClose }: AddLabelFormProps) => {
  const { createLabel } = useCreateLabel();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addLabel = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createLabel(
      {
        ...values,
        quantityPerRoll: Number(values.quantityPerRoll),
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
            title: 'Etiqueta creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('labels');
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
        onSubmit={addLabel}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Etiqueta
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText
                name={'quantityPerRoll'}
                label={'Cantidad por rollo'}
              />
              <InputFieldText name={'art'} label={'Arte'} />
              <InputFieldText name={'description'} label={'Descripción'} />

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

export default AddLabelForm;
