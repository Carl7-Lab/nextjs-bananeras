import { Button, Divider, Flex, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateMettoLabel } from '../../../../hooks/box-brand/container/metto-label/createMettoLabel';
import InputFieldText from '../../../ui/form/InputFieldText';

interface AddMettoLabelFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  quantityPerPack: number | '';
  art: string;
  code: string;
}

const initialValues: ValuesProps = {
  name: '',
  quantityPerPack: '',
  art: '',
  code: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  quantityPerPack: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .lessThan(10000, 'Must be lower than 10000 boxes')
    .required('Required'),
  art: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  code: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddMettoLabelForm = ({ onClose }: AddMettoLabelFormProps) => {
  const { createMettoLabel } = useCreateMettoLabel();
  const toast = useToast();
  const queryClient = useQueryClient();

  const AddMettoLabel = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    createMettoLabel(
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
            title: 'Etiqueta metto creada',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('mettoLabels');
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
        onSubmit={AddMettoLabel}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregar Etiqueta Metto
              </Heading>
              <Divider mb={'16px'} />
              <InputFieldText name={'name'} label={'Nombre'} />
              <InputFieldText
                name={'quantityPerPack'}
                label={'Cantidad por funda'}
              />
              <InputFieldText name={'art'} label={'Arte'} />
              <InputFieldText name={'code'} label={'Código'} />

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

export default AddMettoLabelForm;
