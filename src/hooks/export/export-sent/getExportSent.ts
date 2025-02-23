import { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { ExportSentType } from '@/types/exportSent';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getExportSent = ({
  exportSentId,
}: {
  exportSentId: string;
}): Promise<AxiosResponse> => {
  return axios.get(`/export/export-sent/${exportSentId}`);
};

type QueryFnType = typeof getExportSent;

type UseExportSentOptions = {
  exportSentId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useExportSent = ({
  exportSentId,
}: UseExportSentOptions): UseQueryResult<ExportSentType> => {
  const result = useQuery(
    ['exportSent', exportSentId],
    () => getExportSent({ exportSentId }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result) as UseQueryResult<ExportSentType>;
};
