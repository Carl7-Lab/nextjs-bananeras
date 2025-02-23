import { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { ProducerPaymentType } from '@/types/producerPayment';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getProducerPayment = ({
  producerPaymentId,
}: {
  producerPaymentId: string;
}): Promise<AxiosResponse> => {
  return axios.get(`/export/producer-payment/${producerPaymentId}`);
};

type QueryFnType = typeof getProducerPayment;

type UseProducerPaymentOptions = {
  producerPaymentId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProducerPayment = ({
  producerPaymentId,
}: UseProducerPaymentOptions): UseQueryResult<ProducerPaymentType> => {
  const result = useQuery(
    ['producerPayment', producerPaymentId],
    () => getProducerPayment({ producerPaymentId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<ProducerPaymentType>;
};
