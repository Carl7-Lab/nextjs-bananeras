import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';

interface ImportBoxBrandsResponse {
  message: string;
}

export const importBoxBrands = (
  file: File
): Promise<ImportBoxBrandsResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post('/box-brand/upload-csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UseImportBoxBrandsOptions = {
  config?: MutationConfig<typeof importBoxBrands>;
};

export const useImportBoxBrands = ({
  config,
}: UseImportBoxBrandsOptions = {}) => {
  const mutation = useMutation({
    mutationFn: importBoxBrands,
    ...config,
  });

  return { ...mutation, importBoxBrands: mutation.mutate };
};
