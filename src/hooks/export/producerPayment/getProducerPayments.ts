import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listProducerPayment(params: Params) {
  return axios.get('/export/producer-payment', { params });
}

export function useShippingCompanies({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['producerPayments', search, page, limit],
    () => listProducerPayment({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
