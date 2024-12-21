import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';

interface ImportMerchantsResponse {
  message: string;
}

export const importMerchants = (
  file: File
): Promise<ImportMerchantsResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post('/merchant/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UseImportMerchantsOptions = {
  config?: MutationConfig<typeof importMerchants>;
};

export const useImportMerchants = ({
  config,
}: UseImportMerchantsOptions = {}) => {
  const mutation = useMutation({
    mutationFn: importMerchants,
    ...config,
  });

  return { ...mutation, importMerchants: mutation.mutate };
};
