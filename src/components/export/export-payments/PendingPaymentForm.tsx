import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import SelectBankAccount from './bank-account/SelectBankAccount';
import { ExportSentType } from '../../../types/exportSent';

interface ValuesProps {
  exportSent: number | '';
  bankAccount: number | '';
}

const initialValues: ValuesProps = {
  exportSent: '',
  bankAccount: '',
};

const validationSchema = Yup.object({
  exportSent: Yup.number().required('Required'),
  bankAccount: Yup.number().required('Required'),
});

const PendingPaymentForm = ({
  paymentSelected,
}: {
  paymentSelected: Partial<ExportSentType>;
}) => {
  const [initialValuesPayment, setInitialValuesPayment] =
    useState<ValuesProps>(initialValues);
  //   const { createExportSent } = useCreateExportSent();
  //   const toast = useToast();
  //   const queryClient = useQueryClient();
  //   const router = useRouter();

  useEffect(() => {
    if (paymentSelected) {
      setInitialValuesPayment((prevValues) => ({
        ...prevValues,
        exportSent: Number(paymentSelected.id),
      }));
    }
    console.log('PendingPaymentForm paymentSelected: ', paymentSelected);
  }, [paymentSelected]);

  const sentPayment = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    console.log('sentPayment values: ', values);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValuesPayment}
      enableReinitialize={true}
      onSubmit={sentPayment}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Pago
            </Heading>
            <Divider mb={'16px'} />

            <SelectBankAccount name={'bankAccount'} />

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
  );
};

export default PendingPaymentForm;
