import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listBankAccount(params: Params) {
  return axios.get('/bank-account', { params });
}

export function useBankAccounts({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['bankAccounts', search, page, limit],
    () => listBankAccount({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
