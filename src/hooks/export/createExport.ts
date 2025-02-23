/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ExportType } from '@/types/export';

interface CreateExportResponse {
  exportId: string;
}

export const createExport = (
  data: Partial<ExportType>
): Promise<CreateExportResponse> => {
  return axios.post('/export', data);
};

type UseCreateExportOptions = {
  config?: MutationConfig<typeof createExport>;
};

export const useCreateExport = ({ config }: UseCreateExportOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createExport,
  });

  return { ...mutation, createExport: mutation.mutate };
};
