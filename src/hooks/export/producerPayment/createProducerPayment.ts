import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ProducerPaymentType } from '@/types/producerPayment';

interface CreateProducerPaymentResponse {
  producerPaymentId: string;
}

export const createProducerPayment = (
  data: Partial<ProducerPaymentType>
): Promise<CreateProducerPaymentResponse> => {
  return axios.post('export/producer-payment', data);
};

type UseCreateProducerPaymentOptions = {
  config?: MutationConfig<typeof createProducerPayment>;
};

export const useCreateProducerPayment = ({
  config,
}: UseCreateProducerPaymentOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createProducerPayment,
  });

  return { ...mutation, createProducerPayment: mutation.mutate };
};
