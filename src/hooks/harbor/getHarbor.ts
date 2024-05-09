import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { HarborType } from '@/types/harbor';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getHarbor = ({ harborId }: { harborId: string }) => {
  return axios.get(`/harbor/${harborId}`);
};

type QueryFnType = typeof getHarbor;

type UseExportOptions = {
  harborId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useExport = ({
  harborId,
}: UseExportOptions): UseQueryResult<HarborType> => {
  const result = useQuery(['harbor', harborId], () => getHarbor({ harborId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<HarborType>;
};
