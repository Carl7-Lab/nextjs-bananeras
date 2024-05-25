import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { ClusterBagType } from '@/types/box-brand/materials/clusterBag';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getClusterBag = ({ clusterBagId }: { clusterBagId: string }) => {
  return axios.get(`/box-brand/cluster-bag/${clusterBagId}`);
};

type QueryFnType = typeof getClusterBag;

type UseClusterBagOptions = {
  clusterBagId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useClusterBag = ({
  clusterBagId,
}: UseClusterBagOptions): UseQueryResult<ClusterBagType> => {
  const result = useQuery(
    ['clusterBag', clusterBagId],
    () => getClusterBag({ clusterBagId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<ClusterBagType>;
};
