import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ProducerPaymentType } from '@/types/producerPayment';

type updateProducerPaymentDTO = {
  data: Partial<ProducerPaymentType>;
  producerPaymentId: string;
};

const updateProducerPayment = ({
  data,
  producerPaymentId,
}: updateProducerPaymentDTO) => {
  return axios.post(`/export/producer-payment/${producerPaymentId}`, data);
};

type UseUpdateProducerPaymentOptions = {
  config?: MutationConfig<typeof updateProducerPayment>;
};

export const useUpdateProducerPayment = ({
  config,
}: UseUpdateProducerPaymentOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateProducerPayment,
  });

  return { ...mutation, updateProducerPayment: mutation.mutateAsync };
};
