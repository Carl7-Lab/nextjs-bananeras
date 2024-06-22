import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import InputFieldDate from '../../ui/form/InputFieldDate';
import InputFieldText from '../../ui/form/InputFieldText';

interface AddRequirementFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  code: string;
  issueDate: Date | '';
  expirationDate: Date | '';
}

const initialValues: ValuesProps = {
  name: '',
  code: '',
  issueDate: '',
  expirationDate: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  code: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  issueDate: Yup.date().required('Required').typeError('Must be a valid date'),
  expirationDate: Yup.date()
    .required('Required')
    .typeError('Must be a valid date')
    .min(Yup.ref('issueDate'), 'Expiration date must be after issue date'),
});

const AddRequirementForm: React.FC<AddRequirementFormProps> = ({ onClose }) => {
  const AddRequirement = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('AddRequirementForm values: ', values);

    return;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={AddRequirement}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Agregar Requisito
            </Heading>
            <Divider mb={'16px'} />
            <InputFieldText name={'name'} label={'Nombre'} />
            <InputFieldText name={'code'} label={'Código'} />
            <InputFieldDate name={'issueDate'} label={'Fecha de Emisión '} />
            <InputFieldDate
              name={'expirationDate'}
              label={'Fecha de Expiración'}
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
  );
};

export default AddRequirementForm;
