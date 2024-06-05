import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ExportSentType } from '@/types/exportSent';

type updateExportSentDTO = {
  data: Partial<ExportSentType>;
  exporSentId: string;
};

const updateExportSent = ({ data, exporSentId }: updateExportSentDTO) => {
  return axios.post(`/export/export-sent/${exporSentId}`, data);
};

type UseUpdateExportSentOptions = {
  config?: MutationConfig<typeof updateExportSent>;
};

export const useUpdateExportSent = ({
  config,
}: UseUpdateExportSentOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateExportSent,
  });

  return { ...mutation, updateExportSent: mutation.mutateAsync };
};
