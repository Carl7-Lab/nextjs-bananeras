import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { ClientType } from '@/types/client';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getClient = ({ clientId }: { clientId: string }) => {
  return axios.get(`/client/${clientId}`);
};

type QueryFnType = typeof getClient;

type UseExportOptions = {
  clientId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useExport = ({
  clientId,
}: UseExportOptions): UseQueryResult<ClientType> => {
  const result = useQuery(['client', clientId], () => getClient({ clientId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<ClientType>;
};
