/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';

type UpdateExporterDTO = {
  city: string;
  address: string;
  exporterId: string;
};

const updateExporter = async ({
  city,
  address,
  exporterId,
}: UpdateExporterDTO): Promise<AxiosResponse> => {
  try {
    return await axios.post(`/exporter/update/${exporterId}`, {
      city,
      address,
    });
  } catch (error: any) {
    console.error(`Error: :'c =>`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

type UseUpdateExporterOptions = {
  config?: MutationConfig<typeof updateExporter>;
};

export const useUpdateExporter = ({
  config,
}: UseUpdateExporterOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateExporter,
  });

  return { ...mutation, updateExporter: mutation.mutateAsync };
};
