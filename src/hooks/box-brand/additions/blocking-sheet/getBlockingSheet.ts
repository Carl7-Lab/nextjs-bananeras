import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { BlockingSheetType } from '@/types/box-brand/additions/blockingSheet';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getBlockingSheet = ({
  blockingSheetId,
}: {
  blockingSheetId: string;
}) => {
  return axios.get(`/box-brand/blocking-sheet/${blockingSheetId}`);
};

type QueryFnType = typeof getBlockingSheet;

type UseBlockingSheetOptions = {
  blockingSheetId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useBlockingSheet = ({
  blockingSheetId,
}: UseBlockingSheetOptions): UseQueryResult<BlockingSheetType> => {
  const result = useQuery(
    ['blockingSheet', blockingSheetId],
    () => getBlockingSheet({ blockingSheetId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<BlockingSheetType>;
};
