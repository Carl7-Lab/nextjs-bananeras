import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { ExportType } from '@/types/export';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

export const getExport = ({ exportId }: { exportId: string }) => {
  return axios.get(`/export/${exportId}`);
};

type QueryFnType = typeof getExport;

type UseExportOptions = {
  exportId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useExport = ({
  exportId,
}: UseExportOptions): UseQueryResult<ExportType> => {
  const result = useQuery(['export', exportId], () => getExport({ exportId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<ExportType>;
};
